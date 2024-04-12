import { RubicSdkError } from "../../../../common/errors";
import { OnChainTradeType } from "../providers/common/models/on-chain-trade-type";
export interface OnChainTradeError {
    type: OnChainTradeType;
    error: RubicSdkError;
}
