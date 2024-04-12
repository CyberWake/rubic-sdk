import { RubicSdkError } from "..";
/**
 * Thrown, when method is not whitelisted on proxy contract.
 */
export declare class UnapprovedMethodError extends RubicSdkError {
    readonly method: string;
    readonly contract: string;
    constructor(method: string, contract: string);
}
