"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniswapV2AbstractProvider = void 0;
const tokens_1 = require("../../../../../../../common/tokens");
const options_1 = require("../../../../../../../common/utils/options");
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const evm_web3_pure_1 = require("../../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const token_native_address_proxy_1 = require("../../../../../../common/utils/token-native-address-proxy");
const get_gas_fee_info_1 = require("../../../common/utils/get-gas-fee-info");
const evm_provider_default_options_1 = require("../on-chain-provider/evm-on-chain-provider/constants/evm-provider-default-options");
const evm_on_chain_provider_1 = require("../on-chain-provider/evm-on-chain-provider/evm-on-chain-provider");
const path_factory_1 = require("./path-factory");
const get_from_to_tokens_amounts_by_exact_1 = require("../utils/get-from-to-tokens-amounts-by-exact");
class UniswapV2AbstractProvider extends evm_on_chain_provider_1.EvmOnChainProvider {
    constructor() {
        super(...arguments);
        this.defaultOptions = {
            ...evm_provider_default_options_1.evmProviderDefaultOptions,
            deadlineMinutes: 20,
            disableMultihops: false
        };
    }
    get type() {
        return this.UniswapV2TradeClass.type;
    }
    async calculate(from, to, options) {
        return this.calculateDifficultTrade(from, to, from.weiAmount, 'input', options);
    }
    /**
     * Calculates trade, based on amount, user wants to get.
     * @param from Token to sell.
     * @param to Token to get with output amount.
     * @param options Additional options.
     */
    async calculateExactOutput(from, to, options) {
        return this.calculateDifficultTrade(from, to, to.weiAmount, 'output', options);
    }
    /**
     * Calculates input amount, based on amount, user wants to get.
     * @param from Token to sell.
     * @param to Token to get with output amount.
     * @param options Additional options.
     */
    async calculateExactOutputAmount(from, to, options) {
        return (await this.calculateExactOutput(from, to, options)).from.tokenAmount;
    }
    /**
     * Calculates on-chain trade.
     * @param fromToken Token to sell.
     * @param toToken Token to get.
     * @param weiAmount Amount to sell or to get in wei.
     * @param exact Defines, whether to call 'exactInput' or 'exactOutput' method.
     * @param options Additional options.
     */
    async calculateDifficultTrade(fromToken, toToken, weiAmount, exact, options) {
        const fullOptions = (0, options_1.combineOptions)(options, this.defaultOptions);
        if (fromToken.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.METIS && fromToken.isNative) {
            fromToken = new tokens_1.PriceToken({
                ...fromToken.asStruct,
                address: '0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000'
            });
        }
        if (toToken.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.METIS && toToken.isNative) {
            toToken = new tokens_1.PriceToken({
                ...toToken.asStruct,
                address: '0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000'
            });
        }
        let weiAmountWithoutFee = weiAmount;
        let proxyFeeInfo;
        if (fullOptions.useProxy) {
            const proxyContractInfo = await this.handleProxyContract(new tokens_1.PriceTokenAmount({
                ...fromToken.asStruct,
                weiAmount
            }), fullOptions);
            weiAmountWithoutFee = proxyContractInfo.fromWithoutFee.weiAmount;
            proxyFeeInfo = proxyContractInfo.proxyFeeInfo;
        }
        const fromProxy = (0, token_native_address_proxy_1.createTokenNativeAddressProxy)(fromToken, this.providerSettings.wethAddress);
        const toProxy = (0, token_native_address_proxy_1.createTokenNativeAddressProxy)(toToken, this.providerSettings.wethAddress);
        let gasPriceInfo;
        if (fullOptions.gasCalculation !== 'disabled') {
            try {
                gasPriceInfo = await this.getGasPriceInfo();
            }
            catch { }
        }
        const { route, estimatedGas } = await this.getAmountAndPath(fromProxy, toProxy, weiAmountWithoutFee, exact, fullOptions, proxyFeeInfo, gasPriceInfo?.gasPriceInUsd);
        const { from, to, fromWithoutFee } = (0, get_from_to_tokens_amounts_by_exact_1.getFromToTokensAmountsByExact)(fromToken, toToken, exact, weiAmount, weiAmountWithoutFee, route.outputAbsoluteAmount);
        const wrappedPath = route.path;
        const routPoolInfo = route?.routPoolInfo;
        const path = (0, token_native_address_proxy_1.createTokenNativeAddressProxyInPathStartAndEnd)(wrappedPath, evm_web3_pure_1.EvmWeb3Pure.nativeTokenAddress);
        const tradeStruct = {
            from,
            to,
            exact,
            path,
            routPoolInfo,
            wrappedPath,
            deadlineMinutes: fullOptions.deadlineMinutes,
            slippageTolerance: fullOptions.slippageTolerance,
            gasFeeInfo: null,
            useProxy: fullOptions.useProxy,
            proxyFeeInfo,
            fromWithoutFee,
            withDeflation: fullOptions.withDeflation,
            usedForCrossChain: fullOptions.usedForCrossChain
        };
        if (fullOptions.gasCalculation === 'disabled') {
            return new this.UniswapV2TradeClass(tradeStruct, fullOptions.providerAddress);
        }
        const gasFeeInfo = (0, get_gas_fee_info_1.getGasFeeInfo)(estimatedGas, gasPriceInfo);
        return new this.UniswapV2TradeClass({ ...tradeStruct, gasFeeInfo }, fullOptions.providerAddress);
    }
    async getAmountAndPath(from, to, weiAmount, exact, options, proxyFeeInfo, gasPriceInUsd) {
        const pathFactory = new path_factory_1.PathFactory(this, {
            from,
            to,
            weiAmount,
            exact,
            options,
            proxyFeeInfo
        });
        return pathFactory.getAmountAndPath(gasPriceInUsd);
    }
}
exports.UniswapV2AbstractProvider = UniswapV2AbstractProvider;
//# sourceMappingURL=uniswap-v2-abstract-provider.js.map