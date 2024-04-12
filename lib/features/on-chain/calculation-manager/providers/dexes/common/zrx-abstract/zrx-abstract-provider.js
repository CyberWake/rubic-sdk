"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZrxAbstractProvider = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const tokens_1 = require("../../../../../../../common/tokens");
const decorators_1 = require("../../../../../../../common/utils/decorators");
const options_1 = require("../../../../../../../common/utils/options");
const token_native_address_proxy_1 = require("../../../../../../common/utils/token-native-address-proxy");
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const get_gas_fee_info_1 = require("../../../common/utils/get-gas-fee-info");
const evm_provider_default_options_1 = require("../on-chain-provider/evm-on-chain-provider/constants/evm-provider-default-options");
const evm_on_chain_provider_1 = require("../on-chain-provider/evm-on-chain-provider/evm-on-chain-provider");
const constants_1 = require("./constants");
const utils_1 = require("./utils");
const zrx_trade_1 = require("./zrx-trade");
class ZrxAbstractProvider extends evm_on_chain_provider_1.EvmOnChainProvider {
    constructor() {
        super(...arguments);
        this.defaultOptions = evm_provider_default_options_1.evmProviderDefaultOptions;
        this.supportReceiverAddress = false;
    }
    get type() {
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.ZRX;
    }
    get apiBaseUrl() {
        return (0, utils_1.getZrxApiBaseUrl)(this.blockchain);
    }
    async calculate(from, toToken, options) {
        const fullOptions = (0, options_1.combineOptions)(options, this.defaultOptions);
        const { fromWithoutFee, proxyFeeInfo } = await this.handleProxyContract(from, fullOptions);
        const fromClone = (0, token_native_address_proxy_1.createTokenNativeAddressProxy)(fromWithoutFee, constants_1.zrxApiParams.nativeTokenAddress);
        const toClone = (0, token_native_address_proxy_1.createTokenNativeAddressProxy)(toToken, constants_1.zrxApiParams.nativeTokenAddress);
        const affiliateAddress = fullOptions.zrxAffiliateAddress;
        const quoteParams = {
            params: {
                sellToken: fromClone.address,
                buyToken: toClone.address,
                sellAmount: fromClone.stringWeiAmount,
                slippagePercentage: fullOptions.slippageTolerance.toString(),
                ...(affiliateAddress && { affiliateAddress })
            }
        };
        const apiTradeData = await this.getTradeData(quoteParams);
        const to = new tokens_1.PriceTokenAmount({
            ...toToken.asStruct,
            weiAmount: new bignumber_js_1.default(apiTradeData.buyAmount)
        });
        const tradeStruct = {
            from,
            to,
            slippageTolerance: fullOptions.slippageTolerance,
            gasFeeInfo: null,
            apiTradeData,
            path: [from, to],
            useProxy: fullOptions.useProxy,
            proxyFeeInfo,
            fromWithoutFee,
            withDeflation: fullOptions.withDeflation,
            usedForCrossChain: fullOptions.usedForCrossChain
        };
        if (fullOptions.gasCalculation === 'disabled') {
            return new zrx_trade_1.ZrxTrade(tradeStruct, fullOptions.providerAddress);
        }
        try {
            const gasPriceInfo = await this.getGasPriceInfo();
            const gasLimit = (await zrx_trade_1.ZrxTrade.getGasLimit(tradeStruct)) || apiTradeData.gas;
            const gasFeeInfo = await (0, get_gas_fee_info_1.getGasFeeInfo)(gasLimit, gasPriceInfo);
            return new zrx_trade_1.ZrxTrade({
                ...tradeStruct,
                gasFeeInfo
            }, fullOptions.providerAddress);
        }
        catch {
            return new zrx_trade_1.ZrxTrade(tradeStruct, fullOptions.providerAddress);
        }
    }
    /**
     * Fetches zrx data from api.
     */
    getTradeData(params) {
        return this.httpClient.get(`${this.apiBaseUrl}swap/v1/quote`, params);
    }
}
exports.ZrxAbstractProvider = ZrxAbstractProvider;
__decorate([
    decorators_1.Cache
], ZrxAbstractProvider.prototype, "apiBaseUrl", null);
//# sourceMappingURL=zrx-abstract-provider.js.map