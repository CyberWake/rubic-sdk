"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.web3PrivateSupportedBlockchain = void 0;
const blockchain_name_1 = require("../../models/blockchain-name");
exports.web3PrivateSupportedBlockchain = [
    ...Object.values(blockchain_name_1.EVM_BLOCKCHAIN_NAME),
    blockchain_name_1.BLOCKCHAIN_NAME.TRON,
    blockchain_name_1.BLOCKCHAIN_NAME.SOLANA
];
//# sourceMappingURL=web-private-supported-blockchain.js.map