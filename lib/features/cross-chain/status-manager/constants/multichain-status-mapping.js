"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MULTICHAIN_STATUS_MAPPING = void 0;
const tx_status_1 = require("../../../../core/blockchain/web3-public-service/web3-public/models/tx-status");
exports.MULTICHAIN_STATUS_MAPPING = {
    0: tx_status_1.TX_STATUS.PENDING,
    3: tx_status_1.TX_STATUS.FAIL,
    8: tx_status_1.TX_STATUS.PENDING,
    9: tx_status_1.TX_STATUS.PENDING,
    10: tx_status_1.TX_STATUS.SUCCESS,
    12: tx_status_1.TX_STATUS.PENDING,
    14: tx_status_1.TX_STATUS.FAIL
};
//# sourceMappingURL=multichain-status-mapping.js.map