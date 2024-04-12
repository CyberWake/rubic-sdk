"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickSwapMumbaiTrade = void 0;
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const uniswap_v2_abstract_trade_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-trade");
const constants_1 = require("./constants");
class QuickSwapMumbaiTrade extends uniswap_v2_abstract_trade_1.UniswapV2AbstractTrade {
    constructor() {
        super(...arguments);
        this.dexContractAddress = constants_1.QUICK_SWAP_MUMBAI_CONTRACT_ADDRESS;
    }
    static get type() {
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.QUICK_SWAP;
    }
}
exports.QuickSwapMumbaiTrade = QuickSwapMumbaiTrade;
//# sourceMappingURL=quick-swap-mumbai-trade.js.map