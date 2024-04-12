"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurveKavaProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const curve_abstract_provider_1 = require("../../common/curve-provider/curve-abstract-provider");
const curve_kava_trade_1 = require("./curve-kava-trade");
class CurveKavaProvider extends curve_abstract_provider_1.CurveAbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.KAVA;
        this.Trade = curve_kava_trade_1.CurveKavaTrade;
    }
}
exports.CurveKavaProvider = CurveKavaProvider;
//# sourceMappingURL=curve-kava-provider.js.map