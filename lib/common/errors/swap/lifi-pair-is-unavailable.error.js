"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LifiPairIsUnavailableError = void 0;
const rubic_sdk_error_1 = require("../rubic-sdk.error");
/**
 * Thrown, when `swap` transaction in lifi is failed.
 */
class LifiPairIsUnavailableError extends rubic_sdk_error_1.RubicSdkError {
    constructor() {
        super('The swap using this pair is currently unavailable. Please try again later.');
        Object.setPrototypeOf(this, LifiPairIsUnavailableError.prototype);
    }
}
exports.LifiPairIsUnavailableError = LifiPairIsUnavailableError;
//# sourceMappingURL=lifi-pair-is-unavailable.error.js.map