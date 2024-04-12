"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneinchZksyncProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const oneinch_abstract_provider_1 = require("../../common/oneinch-abstract/oneinch-abstract-provider");
class OneinchZksyncProvider extends oneinch_abstract_provider_1.OneinchAbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.ZK_SYNC;
    }
    getAvailableProtocols() {
        return 'ZKSYNC_MUTE,ZKSYNC_PMMX,ZKSYNC_SPACEFI,ZKSYNC_SYNCSWAP,ZKSYNC_GEM,ZKSYNC_MAVERICK_V1';
    }
}
exports.OneinchZksyncProvider = OneinchZksyncProvider;
//# sourceMappingURL=oneinch-zksync-provider.js.map