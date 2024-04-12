"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLifiCrossChainTrade = exports.isSymbiosisCrossChainTrade = void 0;
const lifi_cross_chain_trade_1 = require("../providers/lifi-provider/lifi-cross-chain-trade");
const symbiosis_cross_chain_trade_1 = require("../providers/symbiosis-provider/symbiosis-cross-chain-trade");
function isSymbiosisCrossChainTrade(trade) {
    return trade instanceof symbiosis_cross_chain_trade_1.SymbiosisCrossChainTrade;
}
exports.isSymbiosisCrossChainTrade = isSymbiosisCrossChainTrade;
function isLifiCrossChainTrade(trade) {
    return trade instanceof lifi_cross_chain_trade_1.LifiCrossChainTrade;
}
exports.isLifiCrossChainTrade = isLifiCrossChainTrade;
//# sourceMappingURL=type-guards.js.map