"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XyDexAbstractProvider = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const tokens_1 = require("../../../../../../../common/tokens");
const options_1 = require("../../../../../../../common/utils/options");
const blockchain_id_1 = require("../../../../../../../core/blockchain/utils/blockchains-info/constants/blockchain-id");
const xy_api_params_1 = require("../../../../../../common/providers/xy/constants/xy-api-params");
const xy_utils_1 = require("../../../../../../common/providers/xy/utils/xy-utils");
const rubic_proxy_contract_address_1 = require("../../../../../../cross-chain/calculation-manager/providers/common/constants/rubic-proxy-contract-address");
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const get_gas_fee_info_1 = require("../../../common/utils/get-gas-fee-info");
const evm_provider_default_options_1 = require("../on-chain-provider/evm-on-chain-provider/constants/evm-provider-default-options");
const evm_on_chain_provider_1 = require("../on-chain-provider/evm-on-chain-provider/evm-on-chain-provider");
const xy_dex_trade_1 = require("./xy-dex-trade");
class XyDexAbstractProvider extends evm_on_chain_provider_1.EvmOnChainProvider {
    constructor() {
        super(...arguments);
        this.defaultOptions = evm_provider_default_options_1.evmProviderDefaultOptions;
    }
    get type() {
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.XY_DEX;
    }
    async calculate(from, toToken, options) {
        const fromAddress = options?.useProxy || this.defaultOptions.useProxy
            ? rubic_proxy_contract_address_1.rubicProxyContractAddress[from.blockchain].gateway
            : this.walletAddress;
        const fullOptions = (0, options_1.combineOptions)(options, {
            ...this.defaultOptions,
            fromAddress
        });
        const { fromWithoutFee, proxyFeeInfo } = await this.handleProxyContract(from, fullOptions);
        const { toTokenAmountInWei, estimatedGas, contractAddress, provider } = await this.getTradeInfo(from, toToken, fullOptions);
        const to = new tokens_1.PriceTokenAmount({
            ...toToken.asStruct,
            weiAmount: toTokenAmountInWei
        });
        const tradeStruct = {
            contractAddress,
            from,
            to,
            slippageTolerance: fullOptions.slippageTolerance,
            gasFeeInfo: null,
            useProxy: fullOptions.useProxy,
            proxyFeeInfo,
            fromWithoutFee,
            withDeflation: fullOptions.withDeflation,
            usedForCrossChain: fullOptions.usedForCrossChain,
            path: [from, to],
            provider
        };
        try {
            const gasPriceInfo = await this.getGasPriceInfo();
            const gasLimit = (await xy_dex_trade_1.XyDexTrade.getGasLimit(tradeStruct)) || estimatedGas;
            const gasFeeInfo = (0, get_gas_fee_info_1.getGasFeeInfo)(gasLimit, gasPriceInfo);
            return new xy_dex_trade_1.XyDexTrade({
                ...tradeStruct,
                gasFeeInfo
            }, fullOptions.providerAddress);
        }
        catch {
            return new xy_dex_trade_1.XyDexTrade(tradeStruct, fullOptions.providerAddress);
        }
    }
    async getTradeInfo(from, toToken, options) {
        const chainId = blockchain_id_1.blockchainId[from.blockchain];
        const srcQuoteTokenAddress = from.isNative ? xy_api_params_1.XY_NATIVE_ADDRESS : from.address;
        const dstQuoteTokenAddress = toToken.isNative ? xy_api_params_1.XY_NATIVE_ADDRESS : toToken.address;
        const quoteTradeParams = {
            srcChainId: chainId,
            srcQuoteTokenAddress,
            srcQuoteTokenAmount: from.stringWeiAmount,
            dstChainId: chainId,
            dstQuoteTokenAddress,
            slippage: options.slippageTolerance * 100
        };
        const trade = await this.httpClient.get(`${xy_api_params_1.XY_API_ENDPOINT}/quote`, {
            params: { ...quoteTradeParams }
        });
        if (!trade.success) {
            (0, xy_utils_1.xyAnalyzeStatusCode)(trade.errorCode, trade.errorMsg);
        }
        const bestRoute = trade.routes[0];
        return {
            toTokenAmountInWei: new bignumber_js_1.default(bestRoute.dstQuoteTokenAmount),
            estimatedGas: bestRoute.estimatedGas,
            contractAddress: bestRoute.contractAddress,
            provider: bestRoute.srcSwapDescription.provider
        };
    }
}
exports.XyDexAbstractProvider = XyDexAbstractProvider;
//# sourceMappingURL=xy-dex-abstract-provider.js.map