"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnsupportedReceiverAddressError = void 0;
const rubic_sdk_error_1 = require("../rubic-sdk.error");
class UnsupportedReceiverAddressError extends rubic_sdk_error_1.RubicSdkError {
    constructor() {
        super('This provider doesn’t support the receiver address');
        Object.setPrototypeOf(this, UnsupportedReceiverAddressError.prototype);
    }
}
exports.UnsupportedReceiverAddressError = UnsupportedReceiverAddressError;
//# sourceMappingURL=unsupported-receiver-address.error.js.map