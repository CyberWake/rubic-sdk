import BigNumber from 'bignumber.js';
import { RubicSdkError } from "../rubic-sdk.error";
export declare class MaxAmountError extends RubicSdkError {
    readonly maxAmount: BigNumber;
    readonly tokenSymbol: string;
    constructor(maxAmount: BigNumber, tokenSymbol: string);
}
