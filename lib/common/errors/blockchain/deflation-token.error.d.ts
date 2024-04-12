import BigNumber from 'bignumber.js';
import { RubicSdkError } from "../rubic-sdk.error";
import { Token } from "../../tokens";
/**
 * Thrown, if token has deflation.
 */
export declare class DeflationTokenError extends RubicSdkError {
    readonly token: Token;
    readonly deflationPercent: BigNumber;
    constructor(token: Token, deflationPercent: BigNumber);
}
