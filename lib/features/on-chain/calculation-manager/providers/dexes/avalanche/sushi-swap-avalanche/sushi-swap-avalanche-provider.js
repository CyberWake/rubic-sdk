"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SushiSwapAvalancheProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const constants_1 = require("./constants");
const sushi_swap_avalanche_trade_1 = require("./sushi-swap-avalanche-trade");
const uniswap_v2_abstract_provider_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider");
class SushiSwapAvalancheProvider extends uniswap_v2_abstract_provider_1.UniswapV2AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE;
        this.UniswapV2TradeClass = sushi_swap_avalanche_trade_1.SushiSwapAvalancheTrade;
        this.providerSettings = constants_1.SUSHI_SWAP_AVALANCHE_PROVIDER_CONFIGURATION;
    }
}
exports.SushiSwapAvalancheProvider = SushiSwapAvalancheProvider;
//# sourceMappingURL=sushi-swap-avalanche-provider.js.map