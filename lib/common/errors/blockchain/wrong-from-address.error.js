"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrongFromAddressError = void 0;
const rubic_sdk_error_1 = require("../rubic-sdk.error");
/**
 * Thrown, when passed wrong from address in `encode` function.
 */
class WrongFromAddressError extends rubic_sdk_error_1.RubicSdkError {
    constructor() {
        super();
        Object.setPrototypeOf(this, WrongFromAddressError.prototype);
    }
}
exports.WrongFromAddressError = WrongFromAddressError;
//# sourceMappingURL=wrong-from-address.error.js.map