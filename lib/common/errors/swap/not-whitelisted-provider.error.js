"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotWhitelistedProviderError = void 0;
const rubic_sdk_error_1 = require("../rubic-sdk.error");
/**
 * Thrown, via provider is not whitelisted in .
 */
class NotWhitelistedProviderError extends rubic_sdk_error_1.RubicSdkError {
    constructor(providerRouter, providerGateway, cause) {
        super();
        this.providerRouter = providerRouter;
        this.providerGateway = providerGateway;
        this.cause = cause;
        Object.setPrototypeOf(this, NotWhitelistedProviderError.prototype);
    }
}
exports.NotWhitelistedProviderError = NotWhitelistedProviderError;
//# sourceMappingURL=not-whitelisted-provider.error.js.map