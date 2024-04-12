"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WannaSwapAuroraProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const constants_1 = require("./constants");
const wanna_swap_aurora_trade_1 = require("./wanna-swap-aurora-trade");
const uniswap_v2_abstract_provider_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider");
class WannaSwapAuroraProvider extends uniswap_v2_abstract_provider_1.UniswapV2AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.AURORA;
        this.UniswapV2TradeClass = wanna_swap_aurora_trade_1.WannaSwapAuroraTrade;
        this.providerSettings = constants_1.WANNA_SWAP_AURORA_PROVIDER_CONFIGURATION;
    }
}
exports.WannaSwapAuroraProvider = WannaSwapAuroraProvider;
//# sourceMappingURL=wanna-swap-aurora-provider.js.map