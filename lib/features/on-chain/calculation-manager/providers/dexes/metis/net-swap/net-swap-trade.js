"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetSwapTrade = void 0;
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const uniswap_v2_abstract_trade_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-trade");
const metis_abi_1 = require("../metis-abi");
const metis_swap_methods_1 = require("../metis-swap-methods");
const constants_1 = require("./constants");
class NetSwapTrade extends uniswap_v2_abstract_trade_1.UniswapV2AbstractTrade {
    constructor() {
        super(...arguments);
        this.dexContractAddress = constants_1.NET_SWAP_CONTRACT_ADDRESS;
    }
    static get type() {
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.NET_SWAP;
    }
}
exports.NetSwapTrade = NetSwapTrade;
NetSwapTrade.contractAbi = metis_abi_1.METIS_ABI;
NetSwapTrade.swapMethods = metis_swap_methods_1.METIS_SWAP_METHOD;
//# sourceMappingURL=net-swap-trade.js.map