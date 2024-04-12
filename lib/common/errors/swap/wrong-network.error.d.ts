import { RubicSdkError } from "../rubic-sdk.error";
import { BlockchainName } from "../../../core/blockchain/models/blockchain-name";
/**
 * Thrown during swap, if user's selected network does not match source blockchain
 * in swap parameters.
 */
export declare class WrongNetworkError extends RubicSdkError {
    readonly requiredBlockchain: BlockchainName;
    constructor(requiredBlockchain: BlockchainName);
}
