"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoeFujiProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const uniswap_v2_abstract_provider_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider");
const constants_1 = require("./constants");
const joe_fuji_trade_1 = require("./joe-fuji-trade");
class JoeFujiProvider extends uniswap_v2_abstract_provider_1.UniswapV2AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.FUJI;
        this.UniswapV2TradeClass = joe_fuji_trade_1.JoeFujiTrade;
        this.providerSettings = constants_1.JOE_FUJI_PROVIDER_CONFIGURATION;
    }
}
exports.JoeFujiProvider = JoeFujiProvider;
//# sourceMappingURL=joe-fuji-provider.js.map