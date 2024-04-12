"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniswapV3TradeProviders = void 0;
const uni_swap_v3_arbitrum_provider_1 = require("../../providers/dexes/arbitrum/uni-swap-v3-arbitrum/uni-swap-v3-arbitrum-provider");
const uni_swap_v3_ethereum_provider_1 = require("../../providers/dexes/ethereum/uni-swap-v3-ethereum/uni-swap-v3-ethereum-provider");
const uni_swap_v3_ethereum_pow_provider_1 = require("../../providers/dexes/ethereum-pow/uni-swap-v3-ethereum-pow/uni-swap-v3-ethereum-pow-provider");
const fusionx_provider_1 = require("../../providers/dexes/mantle/fusionx/fusionx-provider");
const uni_swap_v3_polygon_provider_1 = require("../../providers/dexes/polygon/uni-swap-v3-polygon/uni-swap-v3-polygon-provider");
const uni_swap_v3_scroll_sepolia_provider_1 = require("../../providers/dexes/scroll-sepolia/uni-swap-v3-scroll-sepolia/uni-swap-v3-scroll-sepolia-provider");
exports.UniswapV3TradeProviders = [
    uni_swap_v3_ethereum_provider_1.UniSwapV3EthereumProvider,
    uni_swap_v3_polygon_provider_1.UniSwapV3PolygonProvider,
    uni_swap_v3_arbitrum_provider_1.UniSwapV3ArbitrumProvider,
    uni_swap_v3_ethereum_pow_provider_1.UniSwapV3EthereumPowProvider,
    // HorizondexProvider, // disabled due to risk of hacking
    fusionx_provider_1.FusionXProvider,
    uni_swap_v3_scroll_sepolia_provider_1.UniSwapV3ScrollSepoliaProvider
];
//# sourceMappingURL=uniswap-v3-trade-providers.js.map