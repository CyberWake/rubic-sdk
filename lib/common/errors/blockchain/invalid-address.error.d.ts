import { RubicSdkError } from "../rubic-sdk.error";
/**
 * Thrown, when passed wallet address is invalid for {@link chainType}.
 */
export declare class InvalidAddressError extends RubicSdkError {
    readonly address: string;
    constructor(address: string);
}
