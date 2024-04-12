"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangoOnChainProvider = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../../common/errors");
const tokens_1 = require("../../../../../../common/tokens");
const rango_supported_blockchains_1 = require("../../../../../common/providers/rango/models/rango-supported-blockchains");
const rango_parser_1 = require("../../../../../common/providers/rango/services/rango-parser");
const on_chain_trade_type_1 = require("../../common/models/on-chain-trade-type");
const aggregator_on_chain_provider_abstract_1 = require("../../common/on-chain-aggregator/aggregator-on-chain-provider-abstract");
const get_gas_fee_info_1 = require("../../common/utils/get-gas-fee-info");
const get_gas_price_info_1 = require("../../common/utils/get-gas-price-info");
const rango_on_chain_disabled_providers_1 = require("./models/rango-on-chain-disabled-providers");
const rango_on_chain_trade_1 = require("./rango-on-chain-trade");
const rango_on_chain_api_service_1 = require("./services/rango-on-chain-api-service");
class RangoOnChainProvider extends aggregator_on_chain_provider_abstract_1.AggregatorOnChainProvider {
    constructor() {
        super(...arguments);
        this.tradeType = on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.RANGO;
    }
    isSupportedBlockchain(blockchainName) {
        return rango_supported_blockchains_1.rangoSupportedBlockchains.some(chain => chain === blockchainName);
    }
    async calculate(from, toToken, options) {
        if (!this.isSupportedBlockchain(from.blockchain)) {
            throw new errors_1.RubicSdkError(`Rango doesn't support ${from.blockchain} chain!`);
        }
        try {
            const { fromWithoutFee, proxyFeeInfo } = await this.handleProxyContract(from, options);
            const path = this.getRoutePath(from, toToken);
            const swapParams = await rango_parser_1.RangoCommonParser.getSwapQueryParams(fromWithoutFee, toToken, {
                ...options,
                swapperGroups: rango_on_chain_disabled_providers_1.rangoOnChainDisabledProviders
            });
            const { route, tx } = await rango_on_chain_api_service_1.RangoOnChainApiService.getSwapTransaction(swapParams);
            const { outputAmountMin, outputAmount } = route;
            const { approveTo: providerGateway } = tx;
            const to = new tokens_1.PriceTokenAmount({
                ...toToken.asStruct,
                weiAmount: new bignumber_js_1.default(outputAmount)
            });
            const toTokenWeiAmountMin = new bignumber_js_1.default(outputAmountMin);
            const tradeStruct = {
                from,
                to,
                fromWithoutFee,
                proxyFeeInfo,
                toTokenWeiAmountMin,
                gasFeeInfo: {
                    gasLimit: undefined
                },
                slippageTolerance: options.slippageTolerance,
                useProxy: options.useProxy,
                withDeflation: options.withDeflation,
                path
            };
            const gasFeeInfo = options.gasCalculation === 'calculate'
                ? await this.getGasFeeInfo(tradeStruct, providerGateway)
                : null;
            return new rango_on_chain_trade_1.RangoOnChainTrade({
                ...tradeStruct,
                gasFeeInfo
            }, options.providerAddress, providerGateway);
        }
        catch (err) {
            return {
                type: on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.RANGO,
                error: err
            };
        }
    }
    async getGasFeeInfo(tradeStruct, providerGateway) {
        try {
            const gasPriceInfo = await (0, get_gas_price_info_1.getGasPriceInfo)(tradeStruct.from.blockchain);
            const gasLimit = await rango_on_chain_trade_1.RangoOnChainTrade.getGasLimit(tradeStruct, providerGateway);
            return (0, get_gas_fee_info_1.getGasFeeInfo)(gasLimit, gasPriceInfo);
        }
        catch {
            return null;
        }
    }
}
exports.RangoOnChainProvider = RangoOnChainProvider;
//# sourceMappingURL=rango-on-chain-provider.js.map