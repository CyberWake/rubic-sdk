import { RubicSdkError } from "../rubic-sdk.error";
/**
 * Thrown, if transaction was reverted because of insufficient native balance.
 */
export declare class TronInsufficientNativeBalance extends RubicSdkError {
    constructor();
}
