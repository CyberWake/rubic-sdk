"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnnecessaryApproveError = void 0;
const rubic_sdk_error_1 = require("../rubic-sdk.error");
/**
 * Thrown, when approve method is called, but there is enough allowance.
 */
class UnnecessaryApproveError extends rubic_sdk_error_1.RubicSdkError {
    constructor() {
        super();
        Object.setPrototypeOf(this, UnnecessaryApproveError.prototype);
    }
}
exports.UnnecessaryApproveError = UnnecessaryApproveError;
//# sourceMappingURL=unnecessary-approve.error.js.map