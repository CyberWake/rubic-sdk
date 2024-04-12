import { LineaSyncSwapProvider } from "../../providers/dexes/linea/sync-swap/linea-sync-swap-provider";
import { ScrollSyncSwapProvider } from "../../providers/dexes/scroll/sync-swap/scroll-sync-swap-provider";
import { ZkSyncSyncSwapProvider } from "../../providers/dexes/zksync/sync-swap/zksync-sync-swap-provider";
export declare const syncSwapTradeProviders: (typeof ZkSyncSyncSwapProvider | typeof LineaSyncSwapProvider | typeof ScrollSyncSwapProvider)[];
