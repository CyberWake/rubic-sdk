"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnChainIsUnavailableError = void 0;
const rubic_sdk_error_1 = require("../rubic-sdk.error");
/**
 * Thrown, when on-chain contracts are on pause.
 */
class OnChainIsUnavailableError extends rubic_sdk_error_1.RubicSdkError {
    constructor() {
        super();
        Object.setPrototypeOf(this, OnChainIsUnavailableError.prototype);
    }
}
exports.OnChainIsUnavailableError = OnChainIsUnavailableError;
//# sourceMappingURL=on-chain-is-unavailable.error.js.map