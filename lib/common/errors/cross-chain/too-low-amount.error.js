"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TooLowAmountError = void 0;
const rubic_sdk_error_1 = require("../rubic-sdk.error");
/**
 * Thrown, when amount of tokens don't cover provider's fee
 */
class TooLowAmountError extends rubic_sdk_error_1.RubicSdkError {
    constructor() {
        super("The swap can't be executed with the entered amount of tokens. Please change it to the greater amount.");
        Object.setPrototypeOf(this, TooLowAmountError.prototype);
    }
}
exports.TooLowAmountError = TooLowAmountError;
//# sourceMappingURL=too-low-amount.error.js.map