"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BridgersPairIsUnavailableError = void 0;
const rubic_sdk_error_1 = require("../rubic-sdk.error");
/**
 * Thrown, when `quote` request in bridgers is failed.
 */
class BridgersPairIsUnavailableError extends rubic_sdk_error_1.RubicSdkError {
    constructor() {
        super('The swap using this pair is currently unavailable. Please try again later.');
        Object.setPrototypeOf(this, BridgersPairIsUnavailableError.prototype);
    }
}
exports.BridgersPairIsUnavailableError = BridgersPairIsUnavailableError;
//# sourceMappingURL=bridgers-pair-is-unavailable.error.js.map