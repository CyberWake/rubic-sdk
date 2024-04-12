"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurveMoonbeamProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const curve_abstract_provider_1 = require("../../common/curve-provider/curve-abstract-provider");
const curve_moonbeam_trade_1 = require("./curve-moonbeam-trade");
class CurveMoonbeamProvider extends curve_abstract_provider_1.CurveAbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.MOONBEAM;
        this.Trade = curve_moonbeam_trade_1.CurveMoonbeamTrade;
    }
}
exports.CurveMoonbeamProvider = CurveMoonbeamProvider;
//# sourceMappingURL=curve-moonbeam-provider.js.map