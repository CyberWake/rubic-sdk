import BigNumber from 'bignumber.js';
import { RubicSdkError } from "../rubic-sdk.error";
import { Token } from "../../tokens";
/**
 * Thrown, when user doesn't have enough balance.
 */
export declare class InsufficientFundsError extends RubicSdkError {
    readonly token: Token;
    readonly balance: BigNumber;
    readonly requiredBalance: BigNumber;
    /**
     * @param token Token to swap.
     * @param balance Token's balance on user wallet in Eth units.
     * @param requiredBalance Required token's amount to swap in Eth units.
     */
    constructor(token: Token, balance: BigNumber, requiredBalance: BigNumber);
}
