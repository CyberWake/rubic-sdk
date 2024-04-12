"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeoutError = void 0;
const rubic_sdk_error_1 = require("../rubic-sdk.error");
class TimeoutError extends rubic_sdk_error_1.RubicSdkError {
    constructor(message) {
        super(message);
        this.name = 'TimeoutError';
        Object.setPrototypeOf(this, TimeoutError.prototype);
    }
}
exports.TimeoutError = TimeoutError;
//# sourceMappingURL=timeout.error.js.map