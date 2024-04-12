"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PegasysTrade = void 0;
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const uniswap_v2_abstract_trade_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-trade");
const constants_1 = require("./constants");
const syscoin_abi_1 = require("../syscoin-abi");
const syscoin_swap_method_1 = require("../syscoin-swap-method");
class PegasysTrade extends uniswap_v2_abstract_trade_1.UniswapV2AbstractTrade {
    constructor() {
        super(...arguments);
        this.dexContractAddress = constants_1.PEGASYS_CONTRACT_ADDRESS;
    }
    static get type() {
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.PEGASYS;
    }
}
exports.PegasysTrade = PegasysTrade;
PegasysTrade.contractAbi = syscoin_abi_1.SYS_ABI;
PegasysTrade.swapMethods = syscoin_swap_method_1.SYS_SWAP_METHOD;
//# sourceMappingURL=pegasys-trade.js.map