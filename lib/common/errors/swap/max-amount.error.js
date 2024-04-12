"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxAmountError = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const rubic_sdk_error_1 = require("../rubic-sdk.error");
class MaxAmountError extends rubic_sdk_error_1.RubicSdkError {
    constructor(maxAmount, tokenSymbol) {
        super(`Max amount is ${new bignumber_js_1.default(maxAmount).toFixed()} ${tokenSymbol}`);
        this.maxAmount = maxAmount;
        this.tokenSymbol = tokenSymbol;
        Object.setPrototypeOf(this, MaxAmountError.prototype);
    }
}
exports.MaxAmountError = MaxAmountError;
//# sourceMappingURL=max-amount.error.js.map