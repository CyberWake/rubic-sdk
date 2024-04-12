"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TronInsufficientNativeBalance = void 0;
const rubic_sdk_error_1 = require("../rubic-sdk.error");
/**
 * Thrown, if transaction was reverted because of insufficient native balance.
 */
class TronInsufficientNativeBalance extends rubic_sdk_error_1.RubicSdkError {
    constructor() {
        super('Insufficient funds of native token. Decrease swap amount or increase native tokens balance.');
        Object.setPrototypeOf(this, TronInsufficientNativeBalance.prototype);
    }
}
exports.TronInsufficientNativeBalance = TronInsufficientNativeBalance;
//# sourceMappingURL=tron-insufficient-native-balance.js.map