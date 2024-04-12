"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetSwapProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const uniswap_v2_abstract_provider_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider");
const constants_1 = require("./constants");
const net_swap_trade_1 = require("./net-swap-trade");
class NetSwapProvider extends uniswap_v2_abstract_provider_1.UniswapV2AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.METIS;
        this.UniswapV2TradeClass = net_swap_trade_1.NetSwapTrade;
        this.providerSettings = constants_1.NET_SWAP_PROVIDER_CONFIGURATION;
    }
}
exports.NetSwapProvider = NetSwapProvider;
//# sourceMappingURL=net-swap-provider.js.map