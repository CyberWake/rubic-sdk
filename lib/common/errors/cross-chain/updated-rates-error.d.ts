import { RubicSdkError } from "..";
/**
 * Thrown, when current gas price is higher, than max gas price on cross-chain contract
 * in target network.
 */
export declare class UpdatedRatesError extends RubicSdkError {
    readonly transaction: {
        data: string;
        to: string;
        value: string;
        oldAmount: string;
        newAmount: string;
    };
    constructor(transaction: {
        data: string;
        to: string;
        value: string;
        oldAmount: string;
        newAmount: string;
    });
}
