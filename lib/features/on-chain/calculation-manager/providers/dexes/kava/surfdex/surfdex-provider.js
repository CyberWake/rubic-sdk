"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurfdexProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const uniswap_v2_abstract_provider_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider");
const constants_1 = require("./constants");
const surfdex_trade_1 = require("./surfdex-trade");
class SurfdexProvider extends uniswap_v2_abstract_provider_1.UniswapV2AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.KAVA;
        this.UniswapV2TradeClass = surfdex_trade_1.SurfdexTrade;
        this.providerSettings = constants_1.SURFDEX_PROVIDER_CONFIGURATION;
    }
}
exports.SurfdexProvider = SurfdexProvider;
//# sourceMappingURL=surfdex-provider.js.map