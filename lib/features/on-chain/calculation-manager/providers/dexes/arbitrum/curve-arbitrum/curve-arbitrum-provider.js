"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurveArbitrumProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const curve_arbitrum_trade_1 = require("./curve-arbitrum-trade");
const curve_abstract_provider_1 = require("../../common/curve-provider/curve-abstract-provider");
class CurveArbitrumProvider extends curve_abstract_provider_1.CurveAbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM;
        this.Trade = curve_arbitrum_trade_1.CurveArbitrumTrade;
    }
}
exports.CurveArbitrumProvider = CurveArbitrumProvider;
//# sourceMappingURL=curve-arbitrum-provider.js.map