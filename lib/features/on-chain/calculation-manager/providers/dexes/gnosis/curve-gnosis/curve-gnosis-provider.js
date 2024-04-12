"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurveGnosisProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const curve_abstract_provider_1 = require("../../common/curve-provider/curve-abstract-provider");
const curve_gnosis_trade_1 = require("./curve-gnosis-trade");
class CurveGnosisProvider extends curve_abstract_provider_1.CurveAbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.GNOSIS;
        this.Trade = curve_gnosis_trade_1.CurveGnosisTrade;
    }
}
exports.CurveGnosisProvider = CurveGnosisProvider;
//# sourceMappingURL=curve-gnosis-provider.js.map