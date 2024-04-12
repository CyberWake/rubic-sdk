"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulatorContractAddress = void 0;
const blockchain_name_1 = require("../../../core/blockchain/models/blockchain-name");
exports.simulatorContractAddress = Object.values(blockchain_name_1.EVM_BLOCKCHAIN_NAME).reduce((acc, blockchain) => {
    let contractAddress = '0x32d43423E6f2293729303fB56C52f853f5683333';
    if (blockchain === blockchain_name_1.BLOCKCHAIN_NAME.POLYGON) {
        contractAddress = '0xf746908a3eb1a6a16cab7cb40bbe47b897b2ebcb';
    }
    if (blockchain === blockchain_name_1.BLOCKCHAIN_NAME.CELO) {
        contractAddress = '0xf5454E6Da76E2af9824b8D88F2Af103159A396aA';
    }
    return {
        ...acc,
        [blockchain]: contractAddress
    };
}, {});
//# sourceMappingURL=simulator-contract-address.js.map