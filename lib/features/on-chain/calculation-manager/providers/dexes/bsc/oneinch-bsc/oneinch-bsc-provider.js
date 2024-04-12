"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneinchBscProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const oneinch_abstract_provider_1 = require("../../common/oneinch-abstract/oneinch-abstract-provider");
class OneinchBscProvider extends oneinch_abstract_provider_1.OneinchAbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN;
    }
}
exports.OneinchBscProvider = OneinchBscProvider;
//# sourceMappingURL=oneinch-bsc-provider.js.map