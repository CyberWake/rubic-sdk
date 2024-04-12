"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoeProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const constants_1 = require("./constants");
const joe_trade_1 = require("./joe-trade");
const uniswap_v2_abstract_provider_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider");
class JoeProvider extends uniswap_v2_abstract_provider_1.UniswapV2AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE;
        this.UniswapV2TradeClass = joe_trade_1.JoeTrade;
        this.providerSettings = constants_1.JOE_PROVIDER_CONFIGURATION;
    }
}
exports.JoeProvider = JoeProvider;
//# sourceMappingURL=joe-provider.js.map