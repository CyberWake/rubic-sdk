import BigNumber from 'bignumber.js';
import { EvmBasicTransactionOptions } from "./evm-basic-transaction-options";
export interface EvmTransactionOptions extends EvmBasicTransactionOptions {
    /**
     * Encoded data, which will be executed in transaction.
     */
    data?: string;
    /**
     * Native token amount in wei.
     */
    value?: BigNumber | string;
}
