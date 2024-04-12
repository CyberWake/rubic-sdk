"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stargateBlockchainSupportedPools = void 0;
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const stargate_bridge_token_1 = require("./stargate-bridge-token");
const stargate_pool_id_1 = require("./stargate-pool-id");
// Stargate close pools for BUSD and MAI
exports.stargateBlockchainSupportedPools = {
    [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]: [
        stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.USDC],
        stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.USDT],
        stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.DAI],
        stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.FRAX],
        stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.USDD],
        stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.ETH],
        stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.sUSD],
        stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.LUSD],
        // stargatePoolId[stargateBridgeToken.MAI],
        stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.METIS],
        stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.mUSD]
    ],
    [blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: [
        stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.USDT],
        // stargatePoolId[stargateBridgeToken.BUSD],
        stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.USDD],
        // stargatePoolId[stargateBridgeToken.MAI],
        stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.METIS],
        stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.mUSD]
    ],
    [blockchain_name_1.BLOCKCHAIN_NAME.POLYGON]: [
        stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.USDC],
        stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.USDT],
        stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.DAI]
        // stargatePoolId[stargateBridgeToken.MAI]
    ],
    [blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE]: [
        stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.USDC],
        stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.USDT],
        // stargatePoolId[stargateBridgeToken.MAI],
        stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.FRAX],
        stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.METIS],
        stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.mUSD]
    ],
    [blockchain_name_1.BLOCKCHAIN_NAME.FANTOM]: [stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.FUSDC]],
    [blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM]: [
        stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.USDC],
        stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.USDT],
        // stargatePoolId[stargateBridgeToken.MAI],
        stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.FRAX],
        stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.ETH]
    ],
    [blockchain_name_1.BLOCKCHAIN_NAME.OPTIMISM]: [
        stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.USDC],
        stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.DAI],
        // stargatePoolId[stargateBridgeToken.MAI],
        stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.FRAX],
        stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.ETH],
        stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.sUSD],
        stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.LUSD]
    ],
    [blockchain_name_1.BLOCKCHAIN_NAME.METIS]: [
        stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.mUSD],
        stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.METIS]
    ],
    [blockchain_name_1.BLOCKCHAIN_NAME.BASE]: [
        stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.USDC],
        stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.ETH]
    ]
};
//# sourceMappingURL=stargate-blockchain-supported-pool.js.map