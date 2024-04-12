"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SushiSwapFantomProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const uniswap_v2_abstract_provider_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider");
const constants_1 = require("./constants");
const sushi_swap_fantom_trade_1 = require("./sushi-swap-fantom-trade");
class SushiSwapFantomProvider extends uniswap_v2_abstract_provider_1.UniswapV2AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.FANTOM;
        this.UniswapV2TradeClass = sushi_swap_fantom_trade_1.SushiSwapFantomTrade;
        this.providerSettings = constants_1.SUSHI_SWAP_FANTOM_PROVIDER_CONFIGURATION;
    }
}
exports.SushiSwapFantomProvider = SushiSwapFantomProvider;
//# sourceMappingURL=sushi-swap-fantom-provider.js.map