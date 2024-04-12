"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsufficientFundsOneinchError = void 0;
const rubic_sdk_error_1 = require("../rubic-sdk.error");
/**
 * Thrown by 1inch, if user doesn't have enough balance.
 */
class InsufficientFundsOneinchError extends rubic_sdk_error_1.RubicSdkError {
    constructor(blockchain) {
        super();
        this.blockchain = blockchain;
        Object.setPrototypeOf(this, InsufficientFundsOneinchError.prototype);
    }
}
exports.InsufficientFundsOneinchError = InsufficientFundsOneinchError;
//# sourceMappingURL=insufficient-funds-oneinch.error.js.map