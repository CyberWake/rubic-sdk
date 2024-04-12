"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FusionXTrade = void 0;
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const uniswap_v3_abstract_trade_1 = require("../../common/uniswap-v3-abstract/uniswap-v3-abstract-trade");
const router_configuration_1 = require("./constants/router-configuration");
class FusionXTrade extends uniswap_v3_abstract_trade_1.UniswapV3AbstractTrade {
    constructor() {
        super(...arguments);
        this.dexContractAddress = router_configuration_1.FUSIONX_UNISWAP_V3_SWAP_ROUTER_CONTRACT_ADDRESS;
        this.contractAbi = router_configuration_1.FUSIONX_UNISWAP_V3_SWAP_ROUTER_CONTRACT_ABI;
    }
    get type() {
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.FUSIONX;
    }
}
exports.FusionXTrade = FusionXTrade;
//# sourceMappingURL=fusionx-trade.js.map