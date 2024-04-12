import { DlnTokenAmount, DlnTokenMinAmount } from "../../../../../../common/providers/dln/models/dln-estimation";
export interface DlnOnChainEstimateResponse {
    estimation: {
        tokenIn: DlnTokenAmount;
        tokenOut: DlnTokenMinAmount;
    };
}
