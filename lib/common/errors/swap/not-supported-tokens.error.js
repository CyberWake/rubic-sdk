"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotSupportedTokensError = void 0;
const rubic_sdk_error_1 = require("../rubic-sdk.error");
/**
 * Thrown, when provider does not support provided tokens.
 */
class NotSupportedTokensError extends rubic_sdk_error_1.RubicSdkError {
    constructor() {
        super();
        Object.setPrototypeOf(this, NotSupportedTokensError.prototype);
    }
}
exports.NotSupportedTokensError = NotSupportedTokensError;
//# sourceMappingURL=not-supported-tokens.error.js.map