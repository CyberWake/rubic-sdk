"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurveAvalancheProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const curve_avalanche_trade_1 = require("./curve-avalanche-trade");
const curve_abstract_provider_1 = require("../../common/curve-provider/curve-abstract-provider");
class CurveAvalancheProvider extends curve_abstract_provider_1.CurveAbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE;
        this.Trade = curve_avalanche_trade_1.CurveAvalancheTrade;
    }
}
exports.CurveAvalancheProvider = CurveAvalancheProvider;
//# sourceMappingURL=curve-avalanche-provider.js.map