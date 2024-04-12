"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XyDexBscProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const xy_dex_abstract_provider_1 = require("../../common/xy-dex-abstract/xy-dex-abstract-provider");
class XyDexBscProvider extends xy_dex_abstract_provider_1.XyDexAbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN;
    }
}
exports.XyDexBscProvider = XyDexBscProvider;
//# sourceMappingURL=xy-dex-bsc-provider.js.map