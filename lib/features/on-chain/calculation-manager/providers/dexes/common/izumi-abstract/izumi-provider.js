"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IzumiProvider = void 0;
const base_1 = require("iziswap-sdk/lib/base");
const func_1 = require("iziswap-sdk/lib/search/func");
const types_1 = require("iziswap-sdk/lib/search/types");
const errors_1 = require("../../../../../../../common/errors");
const tokens_1 = require("../../../../../../../common/tokens");
const wrapped_addresses_1 = require("../../../../../../../common/tokens/constants/wrapped-addresses");
const wrapped_native_tokens_1 = require("../../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_1 = require("../../../../../../../common/utils/blockchain");
const options_1 = require("../../../../../../../common/utils/options");
const blockchain_id_1 = require("../../../../../../../core/blockchain/utils/blockchains-info/constants/blockchain-id");
const web3_pure_1 = require("../../../../../../../core/blockchain/web3-pure/web3-pure");
const injector_1 = require("../../../../../../../core/injector/injector");
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const get_gas_fee_info_1 = require("../../../common/utils/get-gas-fee-info");
const izumi_trade_1 = require("./izumi-trade");
const evm_provider_default_options_1 = require("../on-chain-provider/evm-on-chain-provider/constants/evm-provider-default-options");
const evm_on_chain_provider_1 = require("../on-chain-provider/evm-on-chain-provider/evm-on-chain-provider");
class IzumiProvider extends evm_on_chain_provider_1.EvmOnChainProvider {
    constructor() {
        super(...arguments);
        this.defaultOptions = {
            ...evm_provider_default_options_1.evmProviderDefaultOptions,
            deadlineMinutes: 20,
            disableMultihops: false
        };
    }
    get type() {
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.IZUMI;
    }
    async calculate(from, to, options) {
        const fullOptions = (0, options_1.combineOptions)(options, this.defaultOptions);
        let proxyFeeInfo;
        let weiAmountWithoutFee = from.stringWeiAmount;
        if (fullOptions.useProxy) {
            const proxyContractInfo = await this.handleProxyContract(new tokens_1.PriceTokenAmount({
                ...from.asStruct,
                weiAmount: from.weiAmount
            }), fullOptions);
            proxyFeeInfo = proxyContractInfo.proxyFeeInfo;
            weiAmountWithoutFee = proxyContractInfo.fromWithoutFee.stringWeiAmount;
        }
        const chainId = blockchain_id_1.blockchainId[from.blockchain];
        const web3 = injector_1.Injector.web3PublicService.getWeb3Public(from.blockchain).web3Provider;
        const multicallContract = (0, base_1.getMulticallContracts)(this.config.multicallAddress, web3);
        const transitTokens = await tokens_1.Token.createTokens(this.config.routingTokenAddresses, this.blockchain);
        const tokenIn = {
            chainId,
            symbol: from.isNative ? wrapped_native_tokens_1.wrappedNativeTokensList[this.blockchain]?.symbol : from.symbol,
            address: from.isNative ? wrapped_addresses_1.wrappedAddress[this.blockchain] : from.address,
            decimal: from.decimals
        };
        const tokenOut = {
            chainId,
            symbol: to.isNative ? wrapped_native_tokens_1.wrappedNativeTokensList[this.blockchain]?.symbol : to.symbol,
            address: to.isNative ? wrapped_addresses_1.wrappedAddress[this.blockchain] : to.address,
            decimal: to.decimals
        };
        const midTokenList = transitTokens.map(token => ({
            chainId,
            symbol: token.symbol,
            address: token.address,
            decimal: token.decimals
        }));
        const searchParams = {
            chainId,
            web3,
            multicall: multicallContract,
            tokenIn,
            tokenOut,
            liquidityManagerAddress: this.config.liquidityManagerAddress,
            quoterAddress: this.config.quoterAddress,
            poolBlackList: [],
            midTokenList,
            supportFeeContractNumbers: this.config.supportedFees,
            support001Pools: [],
            direction: types_1.SwapDirection.ExactIn,
            amount: weiAmountWithoutFee
        };
        let pathQueryResult = null;
        try {
            const result = await (0, func_1.searchPathQuery)(searchParams);
            pathQueryResult = result.pathQueryResult;
            if (!pathQueryResult) {
                throw new errors_1.RubicSdkError('No result');
            }
        }
        catch (err) {
            console.debug(err);
            throw err;
        }
        const wrapAddress = wrapped_native_tokens_1.wrappedNativeTokensList[from.blockchain]?.address;
        const toToken = new tokens_1.PriceTokenAmount({
            ...to.asStruct,
            tokenAmount: web3_pure_1.Web3Pure.fromWei(pathQueryResult.amount, to.decimals)
        });
        const transitPath = await tokens_1.Token.createTokens(pathQueryResult.path.tokenChain.map(token => token.address).slice(1, -1), from.blockchain);
        const tradeStruct = {
            from,
            to: toToken,
            path: [from, ...transitPath, to],
            slippageTolerance: fullOptions.slippageTolerance,
            gasFeeInfo: null,
            useProxy: fullOptions.useProxy,
            proxyFeeInfo,
            fromWithoutFee: from,
            withDeflation: fullOptions.withDeflation,
            usedForCrossChain: fullOptions.usedForCrossChain,
            dexContractAddress: this.dexAddress,
            swapConfig: {
                tokenChain: pathQueryResult.path.tokenChain.map(el => el.address),
                feeChain: pathQueryResult.path.feeContractNumber
            },
            strictERC20Token: (0, blockchain_1.compareAddresses)(wrapAddress, from.address) ||
                (0, blockchain_1.compareAddresses)(wrapAddress, to.address)
        };
        if (options?.gasCalculation === 'calculate') {
            try {
                const gasPriceInfo = await this.getGasPriceInfo();
                const gasLimit = await izumi_trade_1.IzumiTrade.getGasLimit(tradeStruct, fullOptions.providerAddress);
                tradeStruct.gasFeeInfo = (0, get_gas_fee_info_1.getGasFeeInfo)(gasLimit, gasPriceInfo);
            }
            catch { }
        }
        return new izumi_trade_1.IzumiTrade(tradeStruct, fullOptions.providerAddress);
    }
}
exports.IzumiProvider = IzumiProvider;
//# sourceMappingURL=izumi-provider.js.map