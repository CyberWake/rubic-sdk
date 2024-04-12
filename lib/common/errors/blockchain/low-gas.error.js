"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LowGasError = void 0;
const rubic_sdk_error_1 = require("../rubic-sdk.error");
/**
 * Thrown, when gas price is too low.
 */
class LowGasError extends rubic_sdk_error_1.RubicSdkError {
    constructor() {
        super();
        Object.setPrototypeOf(this, LowGasError.prototype);
    }
}
exports.LowGasError = LowGasError;
//# sourceMappingURL=low-gas.error.js.map