"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZkSyncSyncSwapProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const sync_swap_abstract_provider_1 = require("../../common/sync-swap-abstract/sync-swap-abstract-provider");
class ZkSyncSyncSwapProvider extends sync_swap_abstract_provider_1.SyncSwapAbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.ZK_SYNC;
        this.dexContractAddress = '0x2da10A1e27bF85cEdD8FFb1AbBe97e53391C0295';
        this.routerHelperContract = '0x5c07e74cb541c3d1875aeee441d691ded6eba204';
        this.vault = '0x621425a1Ef6abE91058E9712575dcc4258F8d091';
        this.factories = [
            '0xf2dad89f2788a8cd54625c60b55cd3d2d0aca7cb',
            '0x5b9f21d407f35b10cbfddca17d5d84b129356ea3'
        ];
        this.routeTokens = [
            '0x5aea5775959fbc2557cc8789bc1bf90a239d9a91',
            '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4' // USDC
        ];
        this.masterAddress = '0xbb05918e9b4ba9fe2c8384d223f0844867909ffb';
        this.maxTransitTokens = 1;
    }
}
exports.ZkSyncSyncSwapProvider = ZkSyncSyncSwapProvider;
//# sourceMappingURL=zksync-sync-swap-provider.js.map