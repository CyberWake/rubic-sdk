"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatedRatesError = void 0;
const errors_1 = require("..");
/**
 * Thrown, when current gas price is higher, than max gas price on cross-chain contract
 * in target network.
 */
class UpdatedRatesError extends errors_1.RubicSdkError {
    constructor(transaction) {
        super();
        this.transaction = transaction;
        Object.setPrototypeOf(this, UpdatedRatesError.prototype);
    }
}
exports.UpdatedRatesError = UpdatedRatesError;
//# sourceMappingURL=updated-rates-error.js.map