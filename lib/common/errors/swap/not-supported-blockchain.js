"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotSupportedBlockchain = void 0;
const rubic_sdk_error_1 = require("../rubic-sdk.error");
/**
 * @internal
 * Thrown, when provider does not support provided blockchain.
 */
class NotSupportedBlockchain extends rubic_sdk_error_1.RubicSdkError {
    constructor() {
        super();
        Object.setPrototypeOf(this, NotSupportedBlockchain.prototype);
    }
}
exports.NotSupportedBlockchain = NotSupportedBlockchain;
//# sourceMappingURL=not-supported-blockchain.js.map