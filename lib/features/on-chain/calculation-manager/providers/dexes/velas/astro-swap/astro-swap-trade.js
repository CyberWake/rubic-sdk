"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstroSwapTrade = void 0;
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const uniswap_v2_abstract_trade_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-trade");
const constants_1 = require("./constants");
class AstroSwapTrade extends uniswap_v2_abstract_trade_1.UniswapV2AbstractTrade {
    constructor() {
        super(...arguments);
        this.dexContractAddress = constants_1.ASTRO_SWAP_CONTRACT_ADDRESS;
    }
    static get type() {
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.ASTRO_SWAP;
    }
}
exports.AstroSwapTrade = AstroSwapTrade;
//# sourceMappingURL=astro-swap-trade.js.map