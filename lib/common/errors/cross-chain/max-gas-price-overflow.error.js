"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxGasPriceOverflowError = void 0;
const rubic_sdk_error_1 = require("../rubic-sdk.error");
/**
 * Thrown, when current gas price is higher, than max gas price on cross-chain contract
 * in target network.
 */
class MaxGasPriceOverflowError extends rubic_sdk_error_1.RubicSdkError {
    constructor() {
        super();
        Object.setPrototypeOf(this, MaxGasPriceOverflowError.prototype);
    }
}
exports.MaxGasPriceOverflowError = MaxGasPriceOverflowError;
//# sourceMappingURL=max-gas-price-overflow.error.js.map