"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RubicSdkError = void 0;
/**
 * Base class for all errors that can be thrown in sdk.
 */
class RubicSdkError extends Error {
    constructor(message, errorPotions) {
        super(message, errorPotions);
        Object.setPrototypeOf(this, RubicSdkError.prototype);
    }
}
exports.RubicSdkError = RubicSdkError;
//# sourceMappingURL=rubic-sdk.error.js.map