"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthcheckError = void 0;
const rubic_sdk_error_1 = require("../rubic-sdk.error");
/**
 * @internal
 * Thrown, if rpc provider has not passed healthcheck.
 */
class HealthcheckError extends rubic_sdk_error_1.RubicSdkError {
    constructor() {
        super();
        Object.setPrototypeOf(this, HealthcheckError.prototype);
    }
}
exports.HealthcheckError = HealthcheckError;
//# sourceMappingURL=healthcheck.error.js.map