"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeHarmonySwapTrade = void 0;
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const dex_trader_abi_1 = require("../../common/uniswap-v2-abstract/constants/dex-trader/dex-trader-abi");
const dex_trader_swap_method_1 = require("../../common/uniswap-v2-abstract/constants/dex-trader/dex-trader-swap-method");
const uniswap_v2_abstract_trade_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-trade");
const constants_1 = require("./constants");
class TradeHarmonySwapTrade extends uniswap_v2_abstract_trade_1.UniswapV2AbstractTrade {
    constructor() {
        super(...arguments);
        this.dexContractAddress = constants_1.TRADER_HARMONY_CONTRACT_ADDRESS;
    }
    static get type() {
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.TRADER;
    }
}
exports.TradeHarmonySwapTrade = TradeHarmonySwapTrade;
TradeHarmonySwapTrade.contractAbi = dex_trader_abi_1.DEX_TRADER_ABI;
TradeHarmonySwapTrade.swapMethods = dex_trader_swap_method_1.ETH_SWAP_METHOD;
//# sourceMappingURL=trader-harmony-trade.js.map