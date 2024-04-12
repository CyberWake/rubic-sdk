"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WannaSwapAuroraTrade = void 0;
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const constants_1 = require("./constants");
const uniswap_v2_abstract_trade_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-trade");
class WannaSwapAuroraTrade extends uniswap_v2_abstract_trade_1.UniswapV2AbstractTrade {
    constructor() {
        super(...arguments);
        this.dexContractAddress = constants_1.WANNA_SWAP_AURORA_CONTRACT_ADDRESS;
    }
    static get type() {
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.WANNA_SWAP;
    }
}
exports.WannaSwapAuroraTrade = WannaSwapAuroraTrade;
//# sourceMappingURL=wanna-swap-aurora-trade.js.map