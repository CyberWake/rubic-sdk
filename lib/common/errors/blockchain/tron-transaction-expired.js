"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TronTransactionExpired = void 0;
const rubic_sdk_error_1 = require("../rubic-sdk.error");
/**
 * Thrown, if transaction signing in wallet expired.
 */
class TronTransactionExpired extends rubic_sdk_error_1.RubicSdkError {
    constructor() {
        super('Signing timeout expired. Please, try again.');
        Object.setPrototypeOf(this, TronTransactionExpired.prototype);
    }
}
exports.TronTransactionExpired = TronTransactionExpired;
//# sourceMappingURL=tron-transaction-expired.js.map