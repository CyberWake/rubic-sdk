"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangoCrossChainParser = void 0;
const rango_cross_chain_trade_1 = require("../rango-cross-chain-trade");
class RangoCrossChainParser {
    static async getTradeConstructorParams({ feeInfo, fromToken, options, routePath, swapQueryParams, toToken, toTokenAmountMin, bridgeSubtype }) {
        const gasData = options.gasCalculation === 'enabled'
            ? await rango_cross_chain_trade_1.RangoCrossChainTrade.getGasData({
                fromToken,
                toToken,
                swapQueryParams,
                feeInfo,
                routePath,
                bridgeSubtype
            })
            : null;
        const priceImpact = fromToken.calculatePriceImpactPercent(toToken);
        const slippage = options.slippageTolerance;
        const crossChainTrade = {
            from: fromToken,
            to: toToken,
            gasData,
            toTokenAmountMin,
            priceImpact,
            slippage,
            feeInfo,
            swapQueryParams,
            bridgeSubtype
        };
        const providerAddress = options.providerAddress;
        return {
            crossChainTrade,
            providerAddress,
            routePath
        };
    }
}
exports.RangoCrossChainParser = RangoCrossChainParser;
//# sourceMappingURL=rango-cross-chain-params-parser.js.map