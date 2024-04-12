"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PangolinFujiTrade = void 0;
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const avax_abi_1 = require("../../avalanche/avax-abi");
const swap_methods_1 = require("../../avalanche/swap-methods");
const uniswap_v2_abstract_trade_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-trade");
const constants_1 = require("./constants");
class PangolinFujiTrade extends uniswap_v2_abstract_trade_1.UniswapV2AbstractTrade {
    constructor() {
        super(...arguments);
        this.dexContractAddress = constants_1.PANGOLIN_FUJI_CONTRACT_ADDRESS;
    }
    static get type() {
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.PANGOLIN;
    }
}
exports.PangolinFujiTrade = PangolinFujiTrade;
PangolinFujiTrade.contractAbi = avax_abi_1.AVAX_ABI;
PangolinFujiTrade.swapMethods = swap_methods_1.AVALANCHE_SWAP_METHOD;
//# sourceMappingURL=pangolin-fuji-trade.js.map