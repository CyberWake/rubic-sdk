"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneinchTradeProviders = void 0;
const oneinch_arbitrum_provider_1 = require("../../providers/dexes/arbitrum/oneinch-arbitrum/oneinch-arbitrum-provider");
const oneinch_aurora_provider_1 = require("../../providers/dexes/aurora/oneinch-arbitrum/oneinch-aurora-provider");
const oneinch_avalanche_provider_1 = require("../../providers/dexes/avalanche/oneinch-avalanche/oneinch-avalanche-provider");
const oneinch_base_provider_1 = require("../../providers/dexes/base/oneinch-base/oneinch-base-provider");
const oneinch_bsc_provider_1 = require("../../providers/dexes/bsc/oneinch-bsc/oneinch-bsc-provider");
const oneinch_ethereum_provider_1 = require("../../providers/dexes/ethereum/oneinch-ethereum/oneinch-ethereum-provider");
const oneinch_fantom_provider_1 = require("../../providers/dexes/fantom/oneinch-fantom/oneinch-fantom-provider");
const oneinch_klayth_provider_1 = require("../../providers/dexes/klaytn/oneinch-klayth/oneinch-klayth-provider");
const oneinch_optimism_provider_1 = require("../../providers/dexes/optimism/oneinch-optimism/oneinch-optimism-provider");
const oneinch_polygon_provider_1 = require("../../providers/dexes/polygon/oneinch-polygon/oneinch-polygon-provider");
const oneinch_zksync_provider_1 = require("../../providers/dexes/zksync/oneinch-zksync/oneinch-zksync-provider");
exports.OneinchTradeProviders = [
    oneinch_ethereum_provider_1.OneinchEthereumProvider,
    oneinch_bsc_provider_1.OneinchBscProvider,
    oneinch_polygon_provider_1.OneinchPolygonProvider,
    oneinch_avalanche_provider_1.OneinchAvalancheProvider,
    oneinch_fantom_provider_1.OneinchFantomProvider,
    oneinch_arbitrum_provider_1.OneinchArbitrumProvider,
    oneinch_optimism_provider_1.OneinchOptimismProvider,
    oneinch_zksync_provider_1.OneinchZksyncProvider,
    oneinch_aurora_provider_1.OneinchAuroraProvider,
    oneinch_base_provider_1.OneinchBaseProvider,
    oneinch_klayth_provider_1.OneinchKlaythProvider
];
//# sourceMappingURL=oneinch-trade-providers.js.map