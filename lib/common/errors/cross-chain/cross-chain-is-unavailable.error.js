"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrossChainIsUnavailableError = void 0;
const rubic_sdk_error_1 = require("../rubic-sdk.error");
/**
 * Thrown, when cross-chain contracts are on pause or there is not enough crypto balance.
 */
class CrossChainIsUnavailableError extends rubic_sdk_error_1.RubicSdkError {
    constructor() {
        super();
        Object.setPrototypeOf(this, CrossChainIsUnavailableError.prototype);
    }
}
exports.CrossChainIsUnavailableError = CrossChainIsUnavailableError;
//# sourceMappingURL=cross-chain-is-unavailable.error.js.map