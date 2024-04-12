"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wlContractAddress = void 0;
const blockchain_name_1 = require("../../../core/blockchain/models/blockchain-name");
exports.wlContractAddress = Object.values(blockchain_name_1.EVM_BLOCKCHAIN_NAME).reduce((acc, blockchain) => {
    return {
        ...acc,
        [blockchain]: ''
    };
}, {});
//# sourceMappingURL=wl-contract-address.js.map