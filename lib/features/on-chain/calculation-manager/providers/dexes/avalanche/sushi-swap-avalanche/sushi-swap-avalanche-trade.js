"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SushiSwapAvalancheTrade = void 0;
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const constants_1 = require("./constants");
const uniswap_v2_abstract_trade_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-trade");
class SushiSwapAvalancheTrade extends uniswap_v2_abstract_trade_1.UniswapV2AbstractTrade {
    constructor() {
        super(...arguments);
        this.dexContractAddress = constants_1.SUSHI_SWAP_AVALANCHE_CONTRACT_ADDRESS;
    }
    static get type() {
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.SUSHI_SWAP;
    }
}
exports.SushiSwapAvalancheTrade = SushiSwapAvalancheTrade;
//# sourceMappingURL=sushi-swap-avalanche-trade.js.map