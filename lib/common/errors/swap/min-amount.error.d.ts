import BigNumber from 'bignumber.js';
import { RubicSdkError } from "../rubic-sdk.error";
export declare class MinAmountError extends RubicSdkError {
    readonly minAmount: BigNumber;
    readonly tokenSymbol: string;
    constructor(minAmount: BigNumber, tokenSymbol: string);
}
