"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniSwapV3ScrollSepoliaTrade = void 0;
const uniswap_v3_abstract_trade_1 = require("../../common/uniswap-v3-abstract/uniswap-v3-abstract-trade");
class UniSwapV3ScrollSepoliaTrade extends uniswap_v3_abstract_trade_1.UniswapV3AbstractTrade {
    constructor() {
        super(...arguments);
        this.dexContractAddress = '0x59a662Ed724F19AD019307126CbEBdcF4b57d6B1';
    }
}
exports.UniSwapV3ScrollSepoliaTrade = UniSwapV3ScrollSepoliaTrade;
//# sourceMappingURL=uni-swap-v3-scroll-sepolia-trade.js.map