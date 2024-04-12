"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsufficientLiquidityError = void 0;
const rubic_sdk_error_1 = require("../rubic-sdk.error");
/**
 * Thrown, when tokens' pair doesn't have enough liquidity.
 */
class InsufficientLiquidityError extends rubic_sdk_error_1.RubicSdkError {
    constructor() {
        super();
        Object.setPrototypeOf(this, InsufficientLiquidityError.prototype);
    }
}
exports.InsufficientLiquidityError = InsufficientLiquidityError;
//# sourceMappingURL=insufficient-liquidity.error.js.map