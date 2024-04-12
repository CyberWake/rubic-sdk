"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stargatePoolId = void 0;
const stargate_bridge_token_1 = require("./stargate-bridge-token");
// Stargate close pools for BUSD and MAI
const pools = {
    [stargate_bridge_token_1.stargateBridgeToken.USDC]: 1,
    [stargate_bridge_token_1.stargateBridgeToken.USDT]: 2,
    [stargate_bridge_token_1.stargateBridgeToken.DAI]: 3,
    // [stargateBridgeToken.BUSD]: 5,
    [stargate_bridge_token_1.stargateBridgeToken.FRAX]: 7,
    [stargate_bridge_token_1.stargateBridgeToken.USDD]: 11,
    [stargate_bridge_token_1.stargateBridgeToken.sUSD]: 14,
    [stargate_bridge_token_1.stargateBridgeToken.LUSD]: 15,
    // [stargateBridgeToken.MAI]: 16,
    [stargate_bridge_token_1.stargateBridgeToken.METIS]: 17,
    [stargate_bridge_token_1.stargateBridgeToken.mUSD]: 19,
    // ETHs
    [stargate_bridge_token_1.stargateBridgeToken.ETH]: 13,
    [stargate_bridge_token_1.stargateBridgeToken.WETH]: 13,
    [stargate_bridge_token_1.stargateBridgeToken.AETH]: 13,
    [stargate_bridge_token_1.stargateBridgeToken.SGETH]: 13,
    [stargate_bridge_token_1.stargateBridgeToken.FUSDC]: 21
};
exports.stargatePoolId = pools;
//# sourceMappingURL=stargate-pool-id.js.map