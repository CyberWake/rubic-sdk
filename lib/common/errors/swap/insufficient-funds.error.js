"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsufficientFundsError = void 0;
const rubic_sdk_error_1 = require("../rubic-sdk.error");
/**
 * Thrown, when user doesn't have enough balance.
 */
class InsufficientFundsError extends rubic_sdk_error_1.RubicSdkError {
    /**
     * @param token Token to swap.
     * @param balance Token's balance on user wallet in Eth units.
     * @param requiredBalance Required token's amount to swap in Eth units.
     */
    constructor(token, balance, requiredBalance) {
        super();
        this.token = token;
        this.balance = balance;
        this.requiredBalance = requiredBalance;
        Object.setPrototypeOf(this, InsufficientFundsError.prototype);
    }
}
exports.InsufficientFundsError = InsufficientFundsError;
//# sourceMappingURL=insufficient-funds.error.js.map