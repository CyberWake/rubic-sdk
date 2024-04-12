"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PulseXV1Trade = void 0;
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const uniswap_v2_abstract_trade_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-trade");
const constants_1 = require("./constants");
class PulseXV1Trade extends uniswap_v2_abstract_trade_1.UniswapV2AbstractTrade {
    constructor() {
        super(...arguments);
        this.dexContractAddress = constants_1.PULSEX_V1_CONTRACT_ADDRESS;
    }
    static get type() {
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.PULSEX_V1;
    }
}
exports.PulseXV1Trade = PulseXV1Trade;
//# sourceMappingURL=pulsex-v1-trade.js.map