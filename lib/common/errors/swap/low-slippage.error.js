"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LowSlippageError = void 0;
const rubic_sdk_error_1 = require("../rubic-sdk.error");
/**
 * Thrown, when slippage tolerance is too low for selected token.
 */
class LowSlippageError extends rubic_sdk_error_1.RubicSdkError {
    constructor() {
        super();
        Object.setPrototypeOf(this, LowSlippageError.prototype);
    }
}
exports.LowSlippageError = LowSlippageError;
//# sourceMappingURL=low-slippage.error.js.map