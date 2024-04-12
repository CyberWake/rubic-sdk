"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstroSwapProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const uniswap_v2_abstract_provider_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider");
const astro_swap_trade_1 = require("./astro-swap-trade");
const constants_1 = require("./constants");
class AstroSwapProvider extends uniswap_v2_abstract_provider_1.UniswapV2AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.VELAS;
        this.UniswapV2TradeClass = astro_swap_trade_1.AstroSwapTrade;
        this.providerSettings = constants_1.ASTRO_SWAP_PROVIDER_CONFIGURATION;
    }
}
exports.AstroSwapProvider = AstroSwapProvider;
//# sourceMappingURL=astro-swap-provider.js.map