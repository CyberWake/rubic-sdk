"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VooiLineaProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const pool_id_mapping_1 = require("./constants/pool-id-mapping");
const vooi_abstract_provider_1 = require("../../common/vooi-abstract/vooi-abstract-provider");
const vooi_trade_1 = require("./vooi-trade");
class VooiLineaProvider extends vooi_abstract_provider_1.VooiAbstractProvider {
    constructor() {
        super(...arguments);
        this.omniPoolAddress = '0x87E4c4517B28844f575Cfbbc4CABBD867863EA6E';
        this.vooiPoolIdMapping = pool_id_mapping_1.vooiLineaPoolIdMapping;
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.LINEA;
    }
    createTradeInstance(tradeStruct, providerAddress) {
        return new vooi_trade_1.VooiLineaTrade(tradeStruct, providerAddress);
    }
}
exports.VooiLineaProvider = VooiLineaProvider;
//# sourceMappingURL=vooi-provider.js.map