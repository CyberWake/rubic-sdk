"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PancakeSwapTestnetTrade = void 0;
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const constants_1 = require("./constants");
const uniswap_v2_abstract_trade_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-trade");
class PancakeSwapTestnetTrade extends uniswap_v2_abstract_trade_1.UniswapV2AbstractTrade {
    constructor() {
        super(...arguments);
        this.dexContractAddress = constants_1.PANCAKE_SWAP_TESTNET_CONTRACT_ADDRESS;
    }
    static get type() {
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.PANCAKE_SWAP;
    }
}
exports.PancakeSwapTestnetTrade = PancakeSwapTestnetTrade;
//# sourceMappingURL=pancake-swap-testnet-trade.js.map