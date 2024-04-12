"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickSwapProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const uniswap_v2_abstract_provider_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider");
const constants_1 = require("./constants");
const quick_swap_trade_1 = require("./quick-swap-trade");
class QuickSwapProvider extends uniswap_v2_abstract_provider_1.UniswapV2AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.POLYGON;
        this.UniswapV2TradeClass = quick_swap_trade_1.QuickSwapTrade;
        this.providerSettings = constants_1.QUICK_SWAP_PROVIDER_CONFIGURATION;
    }
}
exports.QuickSwapProvider = QuickSwapProvider;
//# sourceMappingURL=quick-swap-provider.js.map