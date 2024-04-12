"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stargatePoolMapping = void 0;
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const stargate_bridge_token_1 = require("./stargate-bridge-token");
// Stargate close pools for BUSD and MAI
exports.stargatePoolMapping = {
    [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]: {
        [stargate_bridge_token_1.stargateBridgeToken.USDC]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: [
                stargate_bridge_token_1.stargateBridgeToken.USDT
                // stargateBridgeToken.BUSD
            ],
            [blockchain_name_1.BLOCKCHAIN_NAME.POLYGON]: [stargate_bridge_token_1.stargateBridgeToken.USDT, stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE]: [stargate_bridge_token_1.stargateBridgeToken.USDT, stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.FANTOM]: [stargate_bridge_token_1.stargateBridgeToken.FUSDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM]: [stargate_bridge_token_1.stargateBridgeToken.USDT, stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.OPTIMISM]: [stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.BASE]: [stargate_bridge_token_1.stargateBridgeToken.USDC, stargate_bridge_token_1.stargateBridgeToken.ETH]
        },
        [stargate_bridge_token_1.stargateBridgeToken.USDT]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: [
                // stargateBridgeToken.BUSD,
                stargate_bridge_token_1.stargateBridgeToken.USDT
            ],
            [blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE]: [stargate_bridge_token_1.stargateBridgeToken.USDT, stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.POLYGON]: [stargate_bridge_token_1.stargateBridgeToken.USDT, stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM]: [stargate_bridge_token_1.stargateBridgeToken.USDT, stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.OPTIMISM]: [stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.FANTOM]: [stargate_bridge_token_1.stargateBridgeToken.FUSDC]
        },
        [stargate_bridge_token_1.stargateBridgeToken.DAI]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.POLYGON]: [stargate_bridge_token_1.stargateBridgeToken.DAI],
            [blockchain_name_1.BLOCKCHAIN_NAME.OPTIMISM]: [stargate_bridge_token_1.stargateBridgeToken.DAI]
        },
        // [stargateBridgeToken.MAI]: {
        //     [BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: [stargateBridgeToken.MAI],
        //     [BLOCKCHAIN_NAME.AVALANCHE]: [stargateBridgeToken.MAI],
        //     [BLOCKCHAIN_NAME.POLYGON]: [stargateBridgeToken.MAI],
        //     [BLOCKCHAIN_NAME.ARBITRUM]: [stargateBridgeToken.MAI],
        //     [BLOCKCHAIN_NAME.OPTIMISM]: [stargateBridgeToken.MAI]
        // },
        [stargate_bridge_token_1.stargateBridgeToken.FRAX]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE]: [stargate_bridge_token_1.stargateBridgeToken.FRAX],
            [blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM]: [stargate_bridge_token_1.stargateBridgeToken.FRAX],
            [blockchain_name_1.BLOCKCHAIN_NAME.OPTIMISM]: [stargate_bridge_token_1.stargateBridgeToken.FRAX]
        },
        [stargate_bridge_token_1.stargateBridgeToken.USDD]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: [stargate_bridge_token_1.stargateBridgeToken.USDD]
        },
        [stargate_bridge_token_1.stargateBridgeToken.ETH]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM]: [stargate_bridge_token_1.stargateBridgeToken.ETH],
            [blockchain_name_1.BLOCKCHAIN_NAME.OPTIMISM]: [stargate_bridge_token_1.stargateBridgeToken.ETH],
            [blockchain_name_1.BLOCKCHAIN_NAME.BASE]: [stargate_bridge_token_1.stargateBridgeToken.ETH]
        },
        [stargate_bridge_token_1.stargateBridgeToken.sUSD]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.OPTIMISM]: [stargate_bridge_token_1.stargateBridgeToken.sUSD]
        },
        [stargate_bridge_token_1.stargateBridgeToken.LUSD]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM]: [stargate_bridge_token_1.stargateBridgeToken.LUSD],
            [blockchain_name_1.BLOCKCHAIN_NAME.OPTIMISM]: [stargate_bridge_token_1.stargateBridgeToken.LUSD]
        },
        [stargate_bridge_token_1.stargateBridgeToken.METIS]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: [stargate_bridge_token_1.stargateBridgeToken.METIS],
            [blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE]: [stargate_bridge_token_1.stargateBridgeToken.METIS],
            [blockchain_name_1.BLOCKCHAIN_NAME.METIS]: [stargate_bridge_token_1.stargateBridgeToken.METIS]
        },
        [stargate_bridge_token_1.stargateBridgeToken.mUSD]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.METIS]: [stargate_bridge_token_1.stargateBridgeToken.mUSD]
        }
    },
    [blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: {
        [stargate_bridge_token_1.stargateBridgeToken.USDT]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]: [
                // stargateBridgeToken.BUSD,
                stargate_bridge_token_1.stargateBridgeToken.USDT
            ],
            [blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE]: [stargate_bridge_token_1.stargateBridgeToken.USDT, stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.POLYGON]: [stargate_bridge_token_1.stargateBridgeToken.USDT, stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM]: [stargate_bridge_token_1.stargateBridgeToken.USDT, stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.OPTIMISM]: [stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.FANTOM]: [stargate_bridge_token_1.stargateBridgeToken.FUSDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.BASE]: [stargate_bridge_token_1.stargateBridgeToken.USDC]
        },
        // [stargateBridgeToken.BUSD]: {
        //     [BLOCKCHAIN_NAME.ETHEREUM]: [stargateBridgeToken.USDT, stargateBridgeToken.USDC],
        //     [BLOCKCHAIN_NAME.AVALANCHE]: [stargateBridgeToken.USDT, stargateBridgeToken.USDC],
        //     [BLOCKCHAIN_NAME.POLYGON]: [stargateBridgeToken.USDT, stargateBridgeToken.USDC],
        //     [BLOCKCHAIN_NAME.ARBITRUM]: [stargateBridgeToken.USDT, stargateBridgeToken.USDC],
        //     [BLOCKCHAIN_NAME.OPTIMISM]: [stargateBridgeToken.USDC],
        //     [BLOCKCHAIN_NAME.FANTOM]: [stargateBridgeToken.FUSDC]
        // },
        [stargate_bridge_token_1.stargateBridgeToken.USDD]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]: [stargate_bridge_token_1.stargateBridgeToken.USDD]
        },
        // [stargateBridgeToken.MAI]: {
        //     [BLOCKCHAIN_NAME.ETHEREUM]: [stargateBridgeToken.MAI],
        //     [BLOCKCHAIN_NAME.AVALANCHE]: [stargateBridgeToken.MAI],
        //     [BLOCKCHAIN_NAME.POLYGON]: [stargateBridgeToken.MAI],
        //     [BLOCKCHAIN_NAME.ARBITRUM]: [stargateBridgeToken.MAI],
        //     [BLOCKCHAIN_NAME.OPTIMISM]: [stargateBridgeToken.MAI]
        // },
        [stargate_bridge_token_1.stargateBridgeToken.METIS]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]: [stargate_bridge_token_1.stargateBridgeToken.METIS],
            [blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE]: [stargate_bridge_token_1.stargateBridgeToken.METIS],
            [blockchain_name_1.BLOCKCHAIN_NAME.METIS]: [stargate_bridge_token_1.stargateBridgeToken.METIS]
        },
        [stargate_bridge_token_1.stargateBridgeToken.mUSD]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.METIS]: [stargate_bridge_token_1.stargateBridgeToken.mUSD]
        }
    },
    [blockchain_name_1.BLOCKCHAIN_NAME.POLYGON]: {
        [stargate_bridge_token_1.stargateBridgeToken.USDC]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]: [stargate_bridge_token_1.stargateBridgeToken.USDT, stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: [
                // stargateBridgeToken.BUSD,
                stargate_bridge_token_1.stargateBridgeToken.USDT
            ],
            [blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE]: [stargate_bridge_token_1.stargateBridgeToken.USDT, stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.FANTOM]: [stargate_bridge_token_1.stargateBridgeToken.FUSDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM]: [stargate_bridge_token_1.stargateBridgeToken.USDT, stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.OPTIMISM]: [stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.BASE]: [stargate_bridge_token_1.stargateBridgeToken.USDC]
        },
        [stargate_bridge_token_1.stargateBridgeToken.USDT]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: [
                // stargateBridgeToken.BUSD,
                stargate_bridge_token_1.stargateBridgeToken.USDT
            ],
            [blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE]: [stargate_bridge_token_1.stargateBridgeToken.USDT, stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]: [stargate_bridge_token_1.stargateBridgeToken.USDT, stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM]: [stargate_bridge_token_1.stargateBridgeToken.USDT, stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.OPTIMISM]: [stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.FANTOM]: [stargate_bridge_token_1.stargateBridgeToken.FUSDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.METIS]: [stargate_bridge_token_1.stargateBridgeToken.mUSD],
            [blockchain_name_1.BLOCKCHAIN_NAME.BASE]: [stargate_bridge_token_1.stargateBridgeToken.USDC]
        },
        [stargate_bridge_token_1.stargateBridgeToken.DAI]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]: [stargate_bridge_token_1.stargateBridgeToken.DAI],
            [blockchain_name_1.BLOCKCHAIN_NAME.OPTIMISM]: [stargate_bridge_token_1.stargateBridgeToken.DAI]
        }
        // [stargateBridgeToken.MAI]: {
        //     [BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: [stargateBridgeToken.MAI],
        //     [BLOCKCHAIN_NAME.AVALANCHE]: [stargateBridgeToken.MAI],
        //     [BLOCKCHAIN_NAME.ETHEREUM]: [stargateBridgeToken.MAI],
        //     [BLOCKCHAIN_NAME.ARBITRUM]: [stargateBridgeToken.MAI],
        //     [BLOCKCHAIN_NAME.OPTIMISM]: [stargateBridgeToken.MAI]
        // }
    },
    [blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE]: {
        [stargate_bridge_token_1.stargateBridgeToken.USDC]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: [
                // stargateBridgeToken.BUSD,
                stargate_bridge_token_1.stargateBridgeToken.USDT
            ],
            [blockchain_name_1.BLOCKCHAIN_NAME.POLYGON]: [stargate_bridge_token_1.stargateBridgeToken.USDT, stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]: [stargate_bridge_token_1.stargateBridgeToken.USDT, stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.FANTOM]: [stargate_bridge_token_1.stargateBridgeToken.FUSDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM]: [stargate_bridge_token_1.stargateBridgeToken.USDT, stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.OPTIMISM]: [stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.BASE]: [stargate_bridge_token_1.stargateBridgeToken.USDC]
        },
        [stargate_bridge_token_1.stargateBridgeToken.USDT]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: [
                // stargateBridgeToken.BUSD,
                stargate_bridge_token_1.stargateBridgeToken.USDT
            ],
            [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]: [stargate_bridge_token_1.stargateBridgeToken.USDT, stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.POLYGON]: [stargate_bridge_token_1.stargateBridgeToken.USDT, stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM]: [stargate_bridge_token_1.stargateBridgeToken.USDT, stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.OPTIMISM]: [stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.FANTOM]: [stargate_bridge_token_1.stargateBridgeToken.FUSDC]
        },
        // [stargateBridgeToken.MAI]: {
        //     [BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: [stargateBridgeToken.MAI],
        //     [BLOCKCHAIN_NAME.ETHEREUM]: [stargateBridgeToken.MAI],
        //     [BLOCKCHAIN_NAME.POLYGON]: [stargateBridgeToken.MAI],
        //     [BLOCKCHAIN_NAME.ARBITRUM]: [stargateBridgeToken.MAI],
        //     [BLOCKCHAIN_NAME.OPTIMISM]: [stargateBridgeToken.MAI]
        // },
        [stargate_bridge_token_1.stargateBridgeToken.METIS]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]: [stargate_bridge_token_1.stargateBridgeToken.METIS],
            [blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: [stargate_bridge_token_1.stargateBridgeToken.METIS],
            [blockchain_name_1.BLOCKCHAIN_NAME.METIS]: [stargate_bridge_token_1.stargateBridgeToken.METIS]
        },
        [stargate_bridge_token_1.stargateBridgeToken.mUSD]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.METIS]: [stargate_bridge_token_1.stargateBridgeToken.mUSD]
        }
    },
    [blockchain_name_1.BLOCKCHAIN_NAME.FANTOM]: {
        [stargate_bridge_token_1.stargateBridgeToken.FUSDC]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: [
                // stargateBridgeToken.BUSD,
                stargate_bridge_token_1.stargateBridgeToken.USDT
            ],
            [blockchain_name_1.BLOCKCHAIN_NAME.POLYGON]: [stargate_bridge_token_1.stargateBridgeToken.USDT, stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]: [stargate_bridge_token_1.stargateBridgeToken.USDT, stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE]: [stargate_bridge_token_1.stargateBridgeToken.USDC, stargate_bridge_token_1.stargateBridgeToken.USDT],
            [blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM]: [stargate_bridge_token_1.stargateBridgeToken.USDT, stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.OPTIMISM]: [stargate_bridge_token_1.stargateBridgeToken.USDC]
        }
    },
    [blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM]: {
        [stargate_bridge_token_1.stargateBridgeToken.USDC]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]: [stargate_bridge_token_1.stargateBridgeToken.USDT, stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: [
                stargate_bridge_token_1.stargateBridgeToken.USDT
                // stargateBridgeToken.BUSD
            ],
            [blockchain_name_1.BLOCKCHAIN_NAME.POLYGON]: [stargate_bridge_token_1.stargateBridgeToken.USDT, stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE]: [stargate_bridge_token_1.stargateBridgeToken.USDT, stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.OPTIMISM]: [stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.FANTOM]: [stargate_bridge_token_1.stargateBridgeToken.FUSDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.BASE]: [stargate_bridge_token_1.stargateBridgeToken.USDC, stargate_bridge_token_1.stargateBridgeToken.ETH]
        },
        [stargate_bridge_token_1.stargateBridgeToken.USDT]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: [
                // stargateBridgeToken.BUSD,
                stargate_bridge_token_1.stargateBridgeToken.USDT
            ],
            [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]: [stargate_bridge_token_1.stargateBridgeToken.USDT, stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.POLYGON]: [stargate_bridge_token_1.stargateBridgeToken.USDT, stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE]: [stargate_bridge_token_1.stargateBridgeToken.USDT, stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.OPTIMISM]: [stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.FANTOM]: [stargate_bridge_token_1.stargateBridgeToken.FUSDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.METIS]: [stargate_bridge_token_1.stargateBridgeToken.mUSD]
        },
        [stargate_bridge_token_1.stargateBridgeToken.ETH]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]: [stargate_bridge_token_1.stargateBridgeToken.ETH],
            [blockchain_name_1.BLOCKCHAIN_NAME.OPTIMISM]: [stargate_bridge_token_1.stargateBridgeToken.ETH],
            [blockchain_name_1.BLOCKCHAIN_NAME.BASE]: [stargate_bridge_token_1.stargateBridgeToken.ETH]
        },
        [stargate_bridge_token_1.stargateBridgeToken.FRAX]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE]: [stargate_bridge_token_1.stargateBridgeToken.FRAX],
            [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]: [stargate_bridge_token_1.stargateBridgeToken.FRAX],
            [blockchain_name_1.BLOCKCHAIN_NAME.OPTIMISM]: [stargate_bridge_token_1.stargateBridgeToken.FRAX]
        },
        // [stargateBridgeToken.MAI]: {
        //     [BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: [stargateBridgeToken.MAI],
        //     [BLOCKCHAIN_NAME.AVALANCHE]: [stargateBridgeToken.MAI],
        //     [BLOCKCHAIN_NAME.POLYGON]: [stargateBridgeToken.MAI],
        //     [BLOCKCHAIN_NAME.ETHEREUM]: [stargateBridgeToken.MAI],
        //     [BLOCKCHAIN_NAME.OPTIMISM]: [stargateBridgeToken.MAI]
        // },
        [stargate_bridge_token_1.stargateBridgeToken.LUSD]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]: [stargate_bridge_token_1.stargateBridgeToken.LUSD],
            [blockchain_name_1.BLOCKCHAIN_NAME.OPTIMISM]: [stargate_bridge_token_1.stargateBridgeToken.LUSD]
        }
    },
    [blockchain_name_1.BLOCKCHAIN_NAME.OPTIMISM]: {
        [stargate_bridge_token_1.stargateBridgeToken.USDC]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]: [stargate_bridge_token_1.stargateBridgeToken.USDT, stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: [
                stargate_bridge_token_1.stargateBridgeToken.USDT
                // stargateBridgeToken.BUSD
            ],
            [blockchain_name_1.BLOCKCHAIN_NAME.POLYGON]: [stargate_bridge_token_1.stargateBridgeToken.USDT, stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE]: [stargate_bridge_token_1.stargateBridgeToken.USDT, stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM]: [stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.FANTOM]: [stargate_bridge_token_1.stargateBridgeToken.FUSDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.BASE]: [stargate_bridge_token_1.stargateBridgeToken.USDC, stargate_bridge_token_1.stargateBridgeToken.ETH]
        },
        [stargate_bridge_token_1.stargateBridgeToken.USDT]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: [
                // stargateBridgeToken.BUSD,
                stargate_bridge_token_1.stargateBridgeToken.USDT
            ],
            [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]: [stargate_bridge_token_1.stargateBridgeToken.USDT, stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.POLYGON]: [stargate_bridge_token_1.stargateBridgeToken.USDT, stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE]: [stargate_bridge_token_1.stargateBridgeToken.USDT, stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM]: [stargate_bridge_token_1.stargateBridgeToken.USDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.FANTOM]: [stargate_bridge_token_1.stargateBridgeToken.FUSDC],
            [blockchain_name_1.BLOCKCHAIN_NAME.METIS]: [stargate_bridge_token_1.stargateBridgeToken.mUSD]
        },
        [stargate_bridge_token_1.stargateBridgeToken.FRAX]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE]: [stargate_bridge_token_1.stargateBridgeToken.FRAX],
            [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]: [stargate_bridge_token_1.stargateBridgeToken.FRAX],
            [blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM]: [stargate_bridge_token_1.stargateBridgeToken.FRAX]
        },
        // [stargateBridgeToken.MAI]: {
        //     [BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: [stargateBridgeToken.MAI],
        //     [BLOCKCHAIN_NAME.AVALANCHE]: [stargateBridgeToken.MAI],
        //     [BLOCKCHAIN_NAME.POLYGON]: [stargateBridgeToken.MAI],
        //     [BLOCKCHAIN_NAME.ETHEREUM]: [stargateBridgeToken.MAI],
        //     [BLOCKCHAIN_NAME.ARBITRUM]: [stargateBridgeToken.MAI]
        // },
        [stargate_bridge_token_1.stargateBridgeToken.LUSD]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]: [stargate_bridge_token_1.stargateBridgeToken.LUSD],
            [blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM]: [stargate_bridge_token_1.stargateBridgeToken.LUSD]
        },
        [stargate_bridge_token_1.stargateBridgeToken.DAI]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]: [stargate_bridge_token_1.stargateBridgeToken.DAI],
            [blockchain_name_1.BLOCKCHAIN_NAME.POLYGON]: [stargate_bridge_token_1.stargateBridgeToken.DAI]
        },
        [stargate_bridge_token_1.stargateBridgeToken.sUSD]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]: [stargate_bridge_token_1.stargateBridgeToken.sUSD]
        },
        [stargate_bridge_token_1.stargateBridgeToken.ETH]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]: [stargate_bridge_token_1.stargateBridgeToken.ETH],
            [blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM]: [stargate_bridge_token_1.stargateBridgeToken.ETH],
            [blockchain_name_1.BLOCKCHAIN_NAME.BASE]: [stargate_bridge_token_1.stargateBridgeToken.ETH]
        }
    },
    [blockchain_name_1.BLOCKCHAIN_NAME.METIS]: {
        [stargate_bridge_token_1.stargateBridgeToken.METIS]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]: [stargate_bridge_token_1.stargateBridgeToken.METIS],
            [blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: [stargate_bridge_token_1.stargateBridgeToken.METIS],
            [blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE]: [stargate_bridge_token_1.stargateBridgeToken.METIS]
        },
        [stargate_bridge_token_1.stargateBridgeToken.mUSD]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]: [stargate_bridge_token_1.stargateBridgeToken.mUSD],
            [blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: [stargate_bridge_token_1.stargateBridgeToken.mUSD],
            [blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE]: [stargate_bridge_token_1.stargateBridgeToken.mUSD]
        }
    },
    [blockchain_name_1.BLOCKCHAIN_NAME.BASE]: {
        [stargate_bridge_token_1.stargateBridgeToken.USDC]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]: [stargate_bridge_token_1.stargateBridgeToken.USDC, stargate_bridge_token_1.stargateBridgeToken.USDT],
            [blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: [stargate_bridge_token_1.stargateBridgeToken.USDT],
            [blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE]: [stargate_bridge_token_1.stargateBridgeToken.USDC, stargate_bridge_token_1.stargateBridgeToken.USDT],
            [blockchain_name_1.BLOCKCHAIN_NAME.POLYGON]: [stargate_bridge_token_1.stargateBridgeToken.USDC, stargate_bridge_token_1.stargateBridgeToken.USDT],
            [blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM]: [stargate_bridge_token_1.stargateBridgeToken.USDC, stargate_bridge_token_1.stargateBridgeToken.USDT],
            [blockchain_name_1.BLOCKCHAIN_NAME.OPTIMISM]: [stargate_bridge_token_1.stargateBridgeToken.USDC]
        },
        [stargate_bridge_token_1.stargateBridgeToken.ETH]: {
            [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]: [stargate_bridge_token_1.stargateBridgeToken.ETH],
            [blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM]: [stargate_bridge_token_1.stargateBridgeToken.ETH],
            [blockchain_name_1.BLOCKCHAIN_NAME.OPTIMISM]: [stargate_bridge_token_1.stargateBridgeToken.ETH]
        }
    }
};
//# sourceMappingURL=stargate-pool-mapping.js.map