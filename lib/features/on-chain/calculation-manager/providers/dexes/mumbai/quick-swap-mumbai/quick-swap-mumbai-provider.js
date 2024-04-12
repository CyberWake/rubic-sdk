"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickSwapMumbaiProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const uniswap_v2_abstract_provider_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider");
const constants_1 = require("./constants");
const quick_swap_mumbai_trade_1 = require("./quick-swap-mumbai-trade");
class QuickSwapMumbaiProvider extends uniswap_v2_abstract_provider_1.UniswapV2AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.MUMBAI;
        this.UniswapV2TradeClass = quick_swap_mumbai_trade_1.QuickSwapMumbaiTrade;
        this.providerSettings = constants_1.QUICK_SWAP_MUMBAI_PROVIDER_CONFIGURATION;
    }
}
exports.QuickSwapMumbaiProvider = QuickSwapMumbaiProvider;
//# sourceMappingURL=quick-swap-mumbai-provider.js.map