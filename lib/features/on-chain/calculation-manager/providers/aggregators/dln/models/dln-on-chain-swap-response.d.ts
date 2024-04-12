import { DlnTokenAmount, DlnTokenMinAmount } from "../../../../../../common/providers/dln/models/dln-estimation";
export interface DlnOnChainSwapResponse<T> {
    tokenIn: DlnTokenAmount;
    tokenOut: DlnTokenMinAmount;
    tx: {
        data: string;
        to?: string;
    } & T;
}
