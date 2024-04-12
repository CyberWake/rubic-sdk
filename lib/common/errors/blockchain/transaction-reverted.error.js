"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRevertedError = void 0;
const rubic_sdk_error_1 = require("../rubic-sdk.error");
/**
 * Thrown, if transaction was reverted without specified error.
 */
class TransactionRevertedError extends rubic_sdk_error_1.RubicSdkError {
    constructor() {
        super();
        Object.setPrototypeOf(this, TransactionRevertedError.prototype);
    }
}
exports.TransactionRevertedError = TransactionRevertedError;
//# sourceMappingURL=transaction-reverted.error.js.map