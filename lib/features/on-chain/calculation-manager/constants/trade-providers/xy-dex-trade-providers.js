"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.xyDexTradeProviders = void 0;
const xy_dex_arbitrum_provider_1 = require("../../providers/dexes/arbitrum/xy-dex-arbitrum/xy-dex-arbitrum-provider");
const xy_dex_avalanche_provider_1 = require("../../providers/dexes/avalanche/xy-dex-avalanche/xy-dex-avalanche-provider");
const xy_dex_base_provider_1 = require("../../providers/dexes/base/xy-dex-base/xy-dex-base-provider");
const xy_dex_bsc_provider_1 = require("../../providers/dexes/bsc/xy-dex-bsc/xy-dex-bsc-provider");
const xy_dex_ethereum_provider_1 = require("../../providers/dexes/ethereum/xy-dex-ethereum/xy-dex-ethereum-provider");
const xy_dex_fantom_provider_1 = require("../../providers/dexes/fantom/xy-dex-fantom/xy-dex-fantom-provider");
const xy_dex_linea_provider_1 = require("../../providers/dexes/linea/xy-dex-linea/xy-dex-linea-provider");
const xy_dex_mantle_provider_1 = require("../../providers/dexes/mantle/xy-dex-mantle/xy-dex-mantle-provider");
const xy_dex_moonriver_provider_1 = require("../../providers/dexes/moonriver/xy-dex-moonriver/xy-dex-moonriver-provider");
const xy_dex_optimism_provider_1 = require("../../providers/dexes/optimism/xy-dex-optimism/xy-dex-optimism-provider");
const xy_dex_polygon_provider_1 = require("../../providers/dexes/polygon/xy-dex-polygon/xy-dex-polygon-provider");
const xy_dex_zkevm_provider_1 = require("../../providers/dexes/polygon-zkevm/xy-dex-zkevm/xy-dex-zkevm-provider");
const xy_dex_scroll_provider_1 = require("../../providers/dexes/scroll/xy-dex-scroll/xy-dex-scroll-provider");
const xy_dex_zksync_provider_1 = require("../../providers/dexes/zksync/xy-dex-zksync/xy-dex-zksync-provider");
exports.xyDexTradeProviders = [
    xy_dex_bsc_provider_1.XyDexBscProvider,
    xy_dex_ethereum_provider_1.XyDexEthereumProvider,
    xy_dex_polygon_provider_1.XyDexPolygonProvider,
    xy_dex_fantom_provider_1.XyDexFantomProvider,
    xy_dex_avalanche_provider_1.XyDexAvalancheProvider,
    xy_dex_arbitrum_provider_1.XyDexArbitrumProvider,
    xy_dex_optimism_provider_1.XyDexOptimismProvider,
    xy_dex_moonriver_provider_1.XyDexMoonriverProvider,
    xy_dex_zksync_provider_1.XyDexZksyncProvider,
    xy_dex_zkevm_provider_1.XyDexZkevmProvider,
    xy_dex_linea_provider_1.XyDexLineaProvider,
    xy_dex_base_provider_1.XyDexBaseProvider,
    xy_dex_scroll_provider_1.XyDexScrollProvider,
    xy_dex_mantle_provider_1.XyDexMantleProvider
];
//# sourceMappingURL=xy-dex-trade-providers.js.map