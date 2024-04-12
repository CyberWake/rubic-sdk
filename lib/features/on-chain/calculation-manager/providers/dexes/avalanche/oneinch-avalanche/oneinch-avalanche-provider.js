"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneinchAvalancheProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const oneinch_abstract_provider_1 = require("../../common/oneinch-abstract/oneinch-abstract-provider");
class OneinchAvalancheProvider extends oneinch_abstract_provider_1.OneinchAbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE;
    }
}
exports.OneinchAvalancheProvider = OneinchAvalancheProvider;
//# sourceMappingURL=oneinch-avalanche-provider.js.map