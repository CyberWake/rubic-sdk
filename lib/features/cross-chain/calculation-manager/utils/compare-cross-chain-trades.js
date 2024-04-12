"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareCrossChainTrades = void 0;
const errors_1 = require("../../../../common/errors");
/**
 * Compares two cross chain trades for sorting algorithm.
 */
// eslint-disable-next-line complexity
function compareCrossChainTrades(nextWrappedTrade, prevWrappedTrade, nativePriceForNextTrade, nativePriceForPrevTrade, compareWithoutTokenPrice) {
    if (prevWrappedTrade?.error instanceof errors_1.MinAmountError &&
        nextWrappedTrade?.error instanceof errors_1.MinAmountError) {
        return prevWrappedTrade.error.minAmount.lte(nextWrappedTrade.error.minAmount) ? 1 : -1;
    }
    if (prevWrappedTrade?.error instanceof errors_1.MaxAmountError &&
        nextWrappedTrade?.error instanceof errors_1.MaxAmountError) {
        return prevWrappedTrade.error.maxAmount.gte(nextWrappedTrade.error.maxAmount) ? 1 : -1;
    }
    if (!prevWrappedTrade || !prevWrappedTrade?.trade || prevWrappedTrade.error) {
        if (nextWrappedTrade?.trade ||
            nextWrappedTrade?.error instanceof errors_1.MinAmountError ||
            nextWrappedTrade?.error instanceof errors_1.MaxAmountError) {
            return -1;
        }
        return 1;
    }
    if (!nextWrappedTrade ||
        nextWrappedTrade.error ||
        nextWrappedTrade?.trade?.to?.tokenAmount.lte(0)) {
        return 1;
    }
    if (compareWithoutTokenPrice) {
        const prevTradeToTokenAmount = prevWrappedTrade?.trade.to.tokenAmount;
        const nextTradeToTokenAmount = nextWrappedTrade?.trade?.to.tokenAmount;
        if (!nextTradeToTokenAmount) {
            return 1;
        }
        if (!prevTradeToTokenAmount) {
            return -1;
        }
        return prevTradeToTokenAmount.lte(nextTradeToTokenAmount) ? -1 : 1;
    }
    else {
        const fromUsd = prevWrappedTrade?.trade.getUsdPrice(nativePriceForPrevTrade);
        const toUsd = nextWrappedTrade?.trade?.getUsdPrice(nativePriceForNextTrade);
        if (!toUsd || !toUsd.isFinite()) {
            return 1;
        }
        if (!fromUsd || !fromUsd.isFinite()) {
            return -1;
        }
        return fromUsd.lte(toUsd) ? -1 : 1;
    }
}
exports.compareCrossChainTrades = compareCrossChainTrades;
//# sourceMappingURL=compare-cross-chain-trades.js.map