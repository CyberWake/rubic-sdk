"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnChainStatusManager = void 0;
const blockchain_name_1 = require("../../../core/blockchain/models/blockchain-name");
const tx_status_1 = require("../../../core/blockchain/web3-public-service/web3-public/models/tx-status");
const get_bridgers_trade_status_1 = require("../../common/status-manager/utils/get-bridgers-trade-status");
const get_src_tx_status_1 = require("../../common/status-manager/utils/get-src-tx-status");
class OnChainStatusManager {
    /**
     * Get Bridgers trade transaction status.
     */
    async getBridgersSwapStatus(srcTxHash) {
        const srcTxStatus = await (0, get_src_tx_status_1.getSrcTxStatus)(blockchain_name_1.BLOCKCHAIN_NAME.TRON, srcTxHash);
        if (srcTxStatus === tx_status_1.TX_STATUS.FAIL) {
            return {
                status: tx_status_1.TX_STATUS.FAIL,
                hash: srcTxHash
            };
        }
        return (0, get_bridgers_trade_status_1.getBridgersTradeStatus)(srcTxHash, blockchain_name_1.BLOCKCHAIN_NAME.TRON, 'rubic_widget');
    }
}
exports.OnChainStatusManager = OnChainStatusManager;
//# sourceMappingURL=on-chain-status-manager.js.map