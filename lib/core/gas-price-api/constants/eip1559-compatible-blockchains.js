"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EIP1559CompatibleBlockchains = void 0;
const blockchain_name_1 = require("../../blockchain/models/blockchain-name");
exports.EIP1559CompatibleBlockchains = {
    ...Object.values(blockchain_name_1.BLOCKCHAIN_NAME).reduce((acc, blockchain) => ({ ...acc, [blockchain]: false }), {}),
    [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]: true,
    [blockchain_name_1.BLOCKCHAIN_NAME.POLYGON]: true,
    [blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE]: true,
    [blockchain_name_1.BLOCKCHAIN_NAME.FANTOM]: true,
    [blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM]: true,
    [blockchain_name_1.BLOCKCHAIN_NAME.ZK_SYNC]: true
    //   [BLOCKCHAIN_NAME.OPTIMISM]: true, - Will be compatible on 3rd of June
};
//# sourceMappingURL=eip1559-compatible-blockchains.js.map