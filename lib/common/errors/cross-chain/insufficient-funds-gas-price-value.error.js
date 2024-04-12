"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsufficientFundsGasPriceValueError = void 0;
const rubic_sdk_error_1 = require("../rubic-sdk.error");
/**
 * Thrown, when user doesn't have enough native token balance for gas fee plus `value`.
 */
class InsufficientFundsGasPriceValueError extends rubic_sdk_error_1.RubicSdkError {
    constructor() {
        super();
        Object.setPrototypeOf(this, InsufficientFundsGasPriceValueError.prototype);
    }
}
exports.InsufficientFundsGasPriceValueError = InsufficientFundsGasPriceValueError;
//# sourceMappingURL=insufficient-funds-gas-price-value.error.js.map