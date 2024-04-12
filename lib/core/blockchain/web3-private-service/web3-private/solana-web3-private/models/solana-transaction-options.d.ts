import { BasicTransactionOptions } from "../../models/basic-transaction-options";
export interface SolanaTransactionOptions extends BasicTransactionOptions {
    /**
     * Encoded data, which will be executed in transaction.
     */
    data?: string;
}
