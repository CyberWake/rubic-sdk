import { RubicSdkError } from "../../../../../../common/errors";
import { CrossChainTradeType } from "../../../models/cross-chain-trade-type";
import { CrossChainTrade } from "../cross-chain-trade";
export type CalculationResult = {
    trade: CrossChainTrade;
    error?: RubicSdkError;
    tradeType: CrossChainTradeType;
} | {
    trade: null;
    error: RubicSdkError;
    tradeType: CrossChainTradeType;
};
