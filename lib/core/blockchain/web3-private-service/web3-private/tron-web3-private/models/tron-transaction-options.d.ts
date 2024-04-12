import { BasicTransactionOptions } from "../../models/basic-transaction-options";
export interface TronTransactionOptions extends BasicTransactionOptions {
    feeLimit?: number;
    callValue?: number | string;
}
