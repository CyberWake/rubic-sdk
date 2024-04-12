"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PangolinFujiProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const uniswap_v2_abstract_provider_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider");
const constants_1 = require("./constants");
const pangolin_fuji_trade_1 = require("./pangolin-fuji-trade");
class PangolinFujiProvider extends uniswap_v2_abstract_provider_1.UniswapV2AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.FUJI;
        this.UniswapV2TradeClass = pangolin_fuji_trade_1.PangolinFujiTrade;
        this.providerSettings = constants_1.PANGOLIN_FUJI_PROVIDER_CONFIGURATION;
    }
}
exports.PangolinFujiProvider = PangolinFujiProvider;
//# sourceMappingURL=pangolin-fuji-provider.js.map