"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyWeb3Private = void 0;
const errors_1 = require("../../../../common/errors");
const web3_private_1 = require("./web3-private");
class EmptyWeb3Private extends web3_private_1.Web3Private {
    constructor() {
        super(undefined);
        this.Web3Pure = undefined;
    }
    getBlockchainName() {
        throw new errors_1.RubicSdkError('Trying to call empty web3 private');
    }
}
exports.EmptyWeb3Private = EmptyWeb3Private;
//# sourceMappingURL=empty-web3-private.js.map