"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeDFKSwapProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const uniswap_v2_abstract_provider_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider");
const constants_1 = require("./constants");
const trader_dfk_trade_1 = require("./trader-dfk-trade");
class TradeDFKSwapProvider extends uniswap_v2_abstract_provider_1.UniswapV2AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.DFK;
        this.UniswapV2TradeClass = trader_dfk_trade_1.TradeDFKSwapTrade;
        this.providerSettings = constants_1.TRADER_DFK_PROVIDER_CONFIGURATION;
    }
}
exports.TradeDFKSwapProvider = TradeDFKSwapProvider;
//# sourceMappingURL=trader-dfk-provider.js.map