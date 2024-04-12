"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stargatePoolsDecimals = void 0;
const stargate_bridge_token_1 = require("./stargate-bridge-token");
// Stargate close pools for BUSD and MAI
exports.stargatePoolsDecimals = {
    [stargate_bridge_token_1.stargateBridgeToken.USDC]: 6,
    [stargate_bridge_token_1.stargateBridgeToken.USDT]: 6,
    [stargate_bridge_token_1.stargateBridgeToken.DAI]: 6,
    // [stargateBridgeToken.MAI]: 6,
    [stargate_bridge_token_1.stargateBridgeToken.FRAX]: 18,
    [stargate_bridge_token_1.stargateBridgeToken.USDD]: 18,
    [stargate_bridge_token_1.stargateBridgeToken.sUSD]: 6,
    [stargate_bridge_token_1.stargateBridgeToken.LUSD]: 6,
    // [stargateBridgeToken.BUSD]: 6,
    [stargate_bridge_token_1.stargateBridgeToken.mUSD]: 6,
    [stargate_bridge_token_1.stargateBridgeToken.FUSDC]: 6,
    [stargate_bridge_token_1.stargateBridgeToken.METIS]: 18,
    // ETHs
    [stargate_bridge_token_1.stargateBridgeToken.ETH]: 18,
    [stargate_bridge_token_1.stargateBridgeToken.WETH]: 18,
    [stargate_bridge_token_1.stargateBridgeToken.AETH]: 18,
    [stargate_bridge_token_1.stargateBridgeToken.SGETH]: 18
};
//# sourceMappingURL=stargate-pools-decimals.js.map