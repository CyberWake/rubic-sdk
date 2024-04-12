"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnapprovedContractError = void 0;
const errors_1 = require("..");
/**
 * Thrown, when contract is not whitelisted on proxy contract.
 */
class UnapprovedContractError extends errors_1.RubicSdkError {
    constructor(method, contract) {
        super();
        this.method = method;
        this.contract = contract;
        Object.setPrototypeOf(this, UnapprovedContractError.prototype);
    }
}
exports.UnapprovedContractError = UnapprovedContractError;
//# sourceMappingURL=unapproved-contract-error.js.map