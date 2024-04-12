import { DlnOnChainEstimateRequest } from "./dln-on-chain-estimate-request";
export interface DlnOnChainSwapRequest extends DlnOnChainEstimateRequest {
    tokenOutRecipient: string;
}
