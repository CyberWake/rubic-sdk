"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XyDexMantleProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const xy_dex_abstract_provider_1 = require("../../common/xy-dex-abstract/xy-dex-abstract-provider");
class XyDexMantleProvider extends xy_dex_abstract_provider_1.XyDexAbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.MANTLE;
    }
}
exports.XyDexMantleProvider = XyDexMantleProvider;
//# sourceMappingURL=xy-dex-mantle-provider.js.map