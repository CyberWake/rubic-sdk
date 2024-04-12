"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FailedToCheckForTransactionReceiptError = void 0;
const rubic_sdk_error_1 = require("../rubic-sdk.error");
/**
 * @internal
 * Thrown, when transaction is passed, but web3 cannot retrieve transaction receipt.
 */
class FailedToCheckForTransactionReceiptError extends rubic_sdk_error_1.RubicSdkError {
    constructor() {
        super();
        Object.setPrototypeOf(this, FailedToCheckForTransactionReceiptError.prototype);
    }
}
exports.FailedToCheckForTransactionReceiptError = FailedToCheckForTransactionReceiptError;
//# sourceMappingURL=failed-to-check-for-transaction-receipt.error.js.map