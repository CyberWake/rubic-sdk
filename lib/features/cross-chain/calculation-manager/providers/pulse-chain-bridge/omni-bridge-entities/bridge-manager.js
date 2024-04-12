"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BridgeManager = void 0;
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const foreign_bridge_1 = require("./foreign-bridge");
const home_bridge_1 = require("./home-bridge");
class BridgeManager {
    static createBridge(fromToken, toToken) {
        return fromToken.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM
            ? new foreign_bridge_1.ForeignBridge(fromToken, toToken)
            : new home_bridge_1.HomeBridge(fromToken, toToken);
    }
}
exports.BridgeManager = BridgeManager;
//# sourceMappingURL=bridge-manager.js.map