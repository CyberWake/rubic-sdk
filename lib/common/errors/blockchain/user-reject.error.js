"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRejectError = void 0;
const rubic_sdk_error_1 = require("../rubic-sdk.error");
/**
 * Thrown, when user cancels transaction.
 */
class UserRejectError extends rubic_sdk_error_1.RubicSdkError {
    constructor() {
        super();
        Object.setPrototypeOf(this, UserRejectError.prototype);
    }
}
exports.UserRejectError = UserRejectError;
//# sourceMappingURL=user-reject.error.js.map