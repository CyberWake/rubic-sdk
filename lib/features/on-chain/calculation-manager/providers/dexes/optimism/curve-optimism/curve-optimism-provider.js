"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurveOptimismProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const curve_abstract_provider_1 = require("../../common/curve-provider/curve-abstract-provider");
const curve_optimism_trade_1 = require("./curve-optimism-trade");
class CurveOptimismProvider extends curve_abstract_provider_1.CurveAbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.OPTIMISM;
        this.Trade = curve_optimism_trade_1.CurveOptimismTrade;
    }
}
exports.CurveOptimismProvider = CurveOptimismProvider;
//# sourceMappingURL=curve-optimism-provider.js.map