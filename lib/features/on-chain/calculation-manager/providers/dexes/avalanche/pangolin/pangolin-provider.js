"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PangolinProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const constants_1 = require("./constants");
const pangolin_trade_1 = require("./pangolin-trade");
const uniswap_v2_abstract_provider_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider");
class PangolinProvider extends uniswap_v2_abstract_provider_1.UniswapV2AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE;
        this.UniswapV2TradeClass = pangolin_trade_1.PangolinTrade;
        this.providerSettings = constants_1.PANGOLIN_PROVIDER_CONFIGURATION;
    }
}
exports.PangolinProvider = PangolinProvider;
//# sourceMappingURL=pangolin-provider.js.map