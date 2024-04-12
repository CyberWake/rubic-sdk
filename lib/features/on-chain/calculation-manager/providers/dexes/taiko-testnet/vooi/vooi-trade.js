"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VooiTaikoTrade = void 0;
const vooi_abstract_trade_1 = require("../../common/vooi-abstract/vooi-abstract-trade");
class VooiTaikoTrade extends vooi_abstract_trade_1.VooiAbstractTrade {
    constructor() {
        super(...arguments);
        this.dexContractAddress = '0xce87DBc5176cF0E37CF54741faf30e3e489e1799';
    }
}
exports.VooiTaikoTrade = VooiTaikoTrade;
//# sourceMappingURL=vooi-trade.js.map