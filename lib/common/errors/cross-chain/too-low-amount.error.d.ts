import { RubicSdkError } from "../rubic-sdk.error";
/**
 * Thrown, when amount of tokens don't cover provider's fee
 */
export declare class TooLowAmountError extends RubicSdkError {
    constructor();
}
