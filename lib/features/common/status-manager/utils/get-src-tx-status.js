"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSrcTxStatus = void 0;
const waitFor_1 = require("../../../../common/utils/waitFor");
const blockchain_name_1 = require("../../../../core/blockchain/models/blockchain-name");
const tx_status_1 = require("../../../../core/blockchain/web3-public-service/web3-public/models/tx-status");
const injector_1 = require("../../../../core/injector/injector");
/**
 * Get cross-chain trade's source transaction status via receipt.
 * @returns Cross-chain transaction status.
 */
async function getSrcTxStatus(fromBlockchain, srcTxHash) {
    try {
        const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(fromBlockchain);
        const status = await web3Public.getTransactionStatus(srcTxHash);
        if (status === tx_status_1.TX_STATUS.FAIL && fromBlockchain === blockchain_name_1.BLOCKCHAIN_NAME.ZK_SYNC) {
            const zkSyncAwarenessTime = 4000;
            await (0, waitFor_1.waitFor)(zkSyncAwarenessTime);
            return web3Public.getTransactionStatus(srcTxHash);
        }
        return status;
    }
    catch {
        return tx_status_1.TX_STATUS.PENDING;
    }
}
exports.getSrcTxStatus = getSrcTxStatus;
//# sourceMappingURL=get-src-tx-status.js.map