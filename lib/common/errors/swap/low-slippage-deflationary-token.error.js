"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LowSlippageDeflationaryTokenError = void 0;
const rubic_sdk_error_1 = require("../rubic-sdk.error");
/**
 * Thrown, when user is selling deflationary token with too low slippage.
 */
class LowSlippageDeflationaryTokenError extends rubic_sdk_error_1.RubicSdkError {
    constructor() {
        super();
        Object.setPrototypeOf(this, LowSlippageDeflationaryTokenError.prototype);
    }
}
exports.LowSlippageDeflationaryTokenError = LowSlippageDeflationaryTokenError;
//# sourceMappingURL=low-slippage-deflationary-token.error.js.map