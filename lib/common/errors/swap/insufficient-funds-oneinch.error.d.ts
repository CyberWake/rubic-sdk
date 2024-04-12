import { RubicSdkError } from "../rubic-sdk.error";
import { BlockchainName } from "../../../core/blockchain/models/blockchain-name";
/**
 * Thrown by 1inch, if user doesn't have enough balance.
 */
export declare class InsufficientFundsOneinchError extends RubicSdkError {
    readonly blockchain: BlockchainName;
    constructor(blockchain: BlockchainName);
}
