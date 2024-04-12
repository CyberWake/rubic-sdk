"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrongReceiverAddressError = void 0;
const rubic_sdk_error_1 = require("../rubic-sdk.error");
/**
 * Thrown, when passed wrong receiver address.
 */
class WrongReceiverAddressError extends rubic_sdk_error_1.RubicSdkError {
    constructor() {
        super();
        Object.setPrototypeOf(this, WrongReceiverAddressError.prototype);
    }
}
exports.WrongReceiverAddressError = WrongReceiverAddressError;
//# sourceMappingURL=wrong-receiver-address.error.js.map