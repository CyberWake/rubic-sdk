"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VooiTaikoProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const vooi_abstract_provider_1 = require("../../common/vooi-abstract/vooi-abstract-provider");
const pool_id_mapping_1 = require("./constants/pool-id-mapping");
const vooi_trade_1 = require("./vooi-trade");
class VooiTaikoProvider extends vooi_abstract_provider_1.VooiAbstractProvider {
    constructor() {
        super(...arguments);
        this.omniPoolAddress = '0xf3BDe7E88Ea5d85c2ee514be416fab4b2Bf9d8E5';
        this.vooiPoolIdMapping = pool_id_mapping_1.vooiTaikoPoolIdMapping;
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.TAIKO;
    }
    createTradeInstance(tradeStruct, providerAddress) {
        return new vooi_trade_1.VooiTaikoTrade(tradeStruct, providerAddress);
    }
}
exports.VooiTaikoProvider = VooiTaikoProvider;
//# sourceMappingURL=vooi-provider.js.map