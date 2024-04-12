import { RubicSdkError } from "../../../../../../common/errors";
import { CrossChainTradeType } from "../../../models/cross-chain-trade-type";
import { CrossChainTrade } from "../cross-chain-trade";
export interface WrappedCrossChainTrade {
    /**
     * Calculated cross-chain trade.
     * Sometimes trade can be calculated even if error was thrown.
     * Equals `null` in case error is critical and trade cannot be calculated.
     */
    trade: CrossChainTrade | null;
    /**
     * Type of calculated trade.
     */
    tradeType: CrossChainTradeType;
    /**
     * Error, thrown during calculation.
     */
    error?: RubicSdkError;
}
