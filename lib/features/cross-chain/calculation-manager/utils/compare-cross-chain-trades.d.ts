import BigNumber from 'bignumber.js';
import { WrappedCrossChainTradeOrNull } from "../models/wrapped-cross-chain-trade-or-null";
/**
 * Compares two cross chain trades for sorting algorithm.
 */
export declare function compareCrossChainTrades(nextWrappedTrade: WrappedCrossChainTradeOrNull, prevWrappedTrade: WrappedCrossChainTradeOrNull, nativePriceForNextTrade?: BigNumber, nativePriceForPrevTrade?: BigNumber, compareWithoutTokenPrice?: boolean): number;
