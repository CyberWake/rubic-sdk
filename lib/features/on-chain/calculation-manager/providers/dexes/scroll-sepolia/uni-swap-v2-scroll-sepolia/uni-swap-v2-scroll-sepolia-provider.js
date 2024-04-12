"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniSwapV2ScrollSepoliaProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const uniswap_v2_abstract_provider_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider");
const constants_1 = require("./constants");
const uni_swap_v2_scroll_sepolia_trade_1 = require("./uni-swap-v2-scroll-sepolia-trade");
class UniSwapV2ScrollSepoliaProvider extends uniswap_v2_abstract_provider_1.UniswapV2AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.SCROLL_SEPOLIA;
        this.UniswapV2TradeClass = uni_swap_v2_scroll_sepolia_trade_1.UniSwapV2ScrollSepoliaTrade;
        this.providerSettings = constants_1.UNISWAP_V2_SCROLL_SEPOLIA_CONFIGURATION;
    }
}
exports.UniSwapV2ScrollSepoliaProvider = UniSwapV2ScrollSepoliaProvider;
//# sourceMappingURL=uni-swap-v2-scroll-sepolia-provider.js.map