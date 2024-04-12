"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurvePolygonProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const curve_abstract_provider_1 = require("../../common/curve-provider/curve-abstract-provider");
const curve_polygon_trade_1 = require("./curve-polygon-trade");
class CurvePolygonProvider extends curve_abstract_provider_1.CurveAbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.POLYGON;
        this.Trade = curve_polygon_trade_1.CurvePolygonTrade;
    }
}
exports.CurvePolygonProvider = CurvePolygonProvider;
//# sourceMappingURL=curve-polygon-provider.js.map