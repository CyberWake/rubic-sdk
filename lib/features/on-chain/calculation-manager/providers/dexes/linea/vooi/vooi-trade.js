"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VooiLineaTrade = void 0;
const vooi_abstract_trade_1 = require("../../common/vooi-abstract/vooi-abstract-trade");
class VooiLineaTrade extends vooi_abstract_trade_1.VooiAbstractTrade {
    constructor() {
        super(...arguments);
        this.dexContractAddress = '0xBc7f67fA9C72f9fcCf917cBCEe2a50dEb031462A';
    }
}
exports.VooiLineaTrade = VooiLineaTrade;
//# sourceMappingURL=vooi-trade.js.map