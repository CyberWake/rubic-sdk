"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncSwapTradeProviders = void 0;
const linea_sync_swap_provider_1 = require("../../providers/dexes/linea/sync-swap/linea-sync-swap-provider");
const scroll_sync_swap_provider_1 = require("../../providers/dexes/scroll/sync-swap/scroll-sync-swap-provider");
const zksync_sync_swap_provider_1 = require("../../providers/dexes/zksync/sync-swap/zksync-sync-swap-provider");
exports.syncSwapTradeProviders = [
    zksync_sync_swap_provider_1.ZkSyncSyncSwapProvider,
    linea_sync_swap_provider_1.LineaSyncSwapProvider,
    scroll_sync_swap_provider_1.ScrollSyncSwapProvider
];
//# sourceMappingURL=sync-swap-trade-providers.js.map