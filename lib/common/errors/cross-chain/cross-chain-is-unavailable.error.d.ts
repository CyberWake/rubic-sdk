import { RubicSdkError } from "../rubic-sdk.error";
/**
 * Thrown, when cross-chain contracts are on pause or there is not enough crypto balance.
 */
export declare class CrossChainIsUnavailableError extends RubicSdkError {
    constructor();
}
