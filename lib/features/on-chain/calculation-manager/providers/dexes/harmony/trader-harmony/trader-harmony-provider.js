"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TradeHarmonySwapProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const uniswap_v2_abstract_provider_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider");
const constants_1 = require("./constants");
const trader_harmony_trade_1 = require("./trader-harmony-trade");
class TradeHarmonySwapProvider extends uniswap_v2_abstract_provider_1.UniswapV2AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.DFK;
        this.UniswapV2TradeClass = trader_harmony_trade_1.TradeHarmonySwapTrade;
        this.providerSettings = constants_1.TRADER_HARMONY_PROVIDER_CONFIGURATION;
    }
}
exports.TradeHarmonySwapProvider = TradeHarmonySwapProvider;
//# sourceMappingURL=trader-harmony-provider.js.map