"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SushiSwapTelosProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const uniswap_v2_abstract_provider_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider");
const constants_1 = require("./constants");
const sushi_swap_telos_trade_1 = require("./sushi-swap-telos-trade");
class SushiSwapTelosProvider extends uniswap_v2_abstract_provider_1.UniswapV2AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.TELOS;
        this.UniswapV2TradeClass = sushi_swap_telos_trade_1.SushiSwapTelosTrade;
        this.providerSettings = constants_1.SUSHI_SWAP_TELOS_PROVIDER_CONFIGURATION;
    }
}
exports.SushiSwapTelosProvider = SushiSwapTelosProvider;
//# sourceMappingURL=sushi-swap-telos-provider.js.map