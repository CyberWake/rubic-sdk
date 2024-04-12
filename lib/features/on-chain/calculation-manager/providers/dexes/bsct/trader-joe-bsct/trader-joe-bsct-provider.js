"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraderJoeBsctProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const constants_1 = require("./constants");
const trader_joe_bsct_trade_1 = require("./trader-joe-bsct-trade");
const uniswap_v2_abstract_provider_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider");
class TraderJoeBsctProvider extends uniswap_v2_abstract_provider_1.UniswapV2AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN_TESTNET;
        this.UniswapV2TradeClass = trader_joe_bsct_trade_1.TraderJoeBsctTrade;
        this.providerSettings = constants_1.TRADER_JOE_BSCT_PROVIDER_CONFIGURATION;
    }
}
exports.TraderJoeBsctProvider = TraderJoeBsctProvider;
//# sourceMappingURL=trader-joe-bsct-provider.js.map