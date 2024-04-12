"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurveFantomProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const curve_abstract_provider_1 = require("../../common/curve-provider/curve-abstract-provider");
const curve_fantom_trade_1 = require("./curve-fantom-trade");
class CurveFantomProvider extends curve_abstract_provider_1.CurveAbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.FANTOM;
        this.Trade = curve_fantom_trade_1.CurveFantomTrade;
    }
}
exports.CurveFantomProvider = CurveFantomProvider;
//# sourceMappingURL=curve-fantom-provider.js.map