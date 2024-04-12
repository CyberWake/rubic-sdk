"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OmnidexProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const uniswap_v2_abstract_provider_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider");
const constants_1 = require("./constants");
const omnidex_trade_1 = require("./omnidex-trade");
class OmnidexProvider extends uniswap_v2_abstract_provider_1.UniswapV2AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.TELOS;
        this.UniswapV2TradeClass = omnidex_trade_1.OmnidexTrade;
        this.providerSettings = constants_1.OMNIDEX_PROVIDER_CONFIGURATION;
    }
}
exports.OmnidexProvider = OmnidexProvider;
//# sourceMappingURL=omnidex-provider.js.map