"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LowToSlippageError = void 0;
const rubic_sdk_error_1 = require("../rubic-sdk.error");
/**
 * Thrown, when toSlippage tolerance is too low to calculate Celer trade.
 */
class LowToSlippageError extends rubic_sdk_error_1.RubicSdkError {
}
exports.LowToSlippageError = LowToSlippageError;
//# sourceMappingURL=low-to-slippage.error.js.map