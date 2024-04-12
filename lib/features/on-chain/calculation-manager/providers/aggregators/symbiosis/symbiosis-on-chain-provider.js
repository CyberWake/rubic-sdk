"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymbiosisOnChainProvider = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../../common/errors");
const tokens_1 = require("../../../../../../common/tokens");
const symbiosis_api_service_1 = require("../../../../../common/providers/symbiosis/services/symbiosis-api-service");
const symbiosis_parser_1 = require("../../../../../common/providers/symbiosis/services/symbiosis-parser");
const on_chain_trade_type_1 = require("../../common/models/on-chain-trade-type");
const aggregator_on_chain_provider_abstract_1 = require("../../common/on-chain-aggregator/aggregator-on-chain-provider-abstract");
const get_gas_fee_info_1 = require("../../common/utils/get-gas-fee-info");
const get_gas_price_info_1 = require("../../common/utils/get-gas-price-info");
const symbiosis_on_chain_supported_blockchains_1 = require("./models/symbiosis-on-chain-supported-blockchains");
const symbiosis_on_chain_trade_1 = require("./symbiosis-on-chain-trade");
class SymbiosisOnChainProvider extends aggregator_on_chain_provider_abstract_1.AggregatorOnChainProvider {
    constructor() {
        super(...arguments);
        this.tradeType = on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.SYMBIOSIS_SWAP;
    }
    isSupportedBlockchain(blockchain) {
        return symbiosis_on_chain_supported_blockchains_1.symbiosisOnChainSupportedBlockchains.some(chain => chain === blockchain);
    }
    async calculate(from, toToken, options) {
        if (!this.isSupportedBlockchain(from.blockchain)) {
            throw new errors_1.RubicSdkError(`Symbiosis doesn't support ${from.blockchain} chain!`);
        }
        try {
            const { fromWithoutFee, proxyFeeInfo } = await this.handleProxyContract(from, options);
            const path = this.getRoutePath(from, toToken);
            const swapBody = await symbiosis_parser_1.SymbiosisParser.getSwapRequestBody(fromWithoutFee, toToken, {
                slippage: options.slippageTolerance
            });
            const { approveTo: providerGateway, tokenAmountOut: { amount: toTokenAmount } } = await symbiosis_api_service_1.SymbiosisApiService.getOnChainSwapTx(swapBody);
            const to = new tokens_1.PriceTokenAmount({
                ...toToken.asStruct,
                weiAmount: new bignumber_js_1.default(toTokenAmount)
            });
            const tradeStruct = {
                from: from,
                to: to,
                fromWithoutFee: fromWithoutFee,
                proxyFeeInfo,
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
            return new symbiosis_on_chain_trade_1.SymbiosisOnChainTrade({
                ...tradeStruct,
                gasFeeInfo
            }, options.providerAddress, providerGateway);
        }
        catch (err) {
            return {
                type: on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.SYMBIOSIS_SWAP,
                error: err
            };
        }
    }
    async getGasFeeInfo(tradeStruct, providerGateway) {
        try {
            const gasPriceInfo = await (0, get_gas_price_info_1.getGasPriceInfo)(tradeStruct.from.blockchain);
            const gasLimit = await symbiosis_on_chain_trade_1.SymbiosisOnChainTrade.getGasLimit(tradeStruct, providerGateway);
            return (0, get_gas_fee_info_1.getGasFeeInfo)(gasLimit, gasPriceInfo);
        }
        catch {
            return null;
        }
    }
}
exports.SymbiosisOnChainProvider = SymbiosisOnChainProvider;
//# sourceMappingURL=symbiosis-on-chain-provider.js.map