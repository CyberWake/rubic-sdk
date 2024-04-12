"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PancakeSwapProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const constants_1 = require("./constants");
const pancake_swap_trade_1 = require("./pancake-swap-trade");
const uniswap_v2_abstract_provider_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider");
class PancakeSwapProvider extends uniswap_v2_abstract_provider_1.UniswapV2AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN;
        this.UniswapV2TradeClass = pancake_swap_trade_1.PancakeSwapTrade;
        this.providerSettings = constants_1.PANCAKE_SWAP_PROVIDER_CONFIGURATION;
    }
}
exports.PancakeSwapProvider = PancakeSwapProvider;
//# sourceMappingURL=pancake-swap-provider.js.map