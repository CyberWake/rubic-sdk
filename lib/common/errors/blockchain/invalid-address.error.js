"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidAddressError = void 0;
const rubic_sdk_error_1 = require("../rubic-sdk.error");
/**
 * Thrown, when passed wallet address is invalid for {@link chainType}.
 */
class InvalidAddressError extends rubic_sdk_error_1.RubicSdkError {
    constructor(address) {
        super();
        this.address = address;
        Object.setPrototypeOf(this, InvalidAddressError.prototype);
    }
}
exports.InvalidAddressError = InvalidAddressError;
//# sourceMappingURL=invalid-address.error.js.map