"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElkProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const uniswap_v2_abstract_provider_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider");
const constants_1 = require("./constants");
const elk_trade_1 = require("./elk-trade");
class ElkProvider extends uniswap_v2_abstract_provider_1.UniswapV2AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.KAVA;
        this.UniswapV2TradeClass = elk_trade_1.ElkTrade;
        this.providerSettings = constants_1.ELK_PROVIDER_CONFIGURATION;
    }
}
exports.ElkProvider = ElkProvider;
//# sourceMappingURL=elk-provider.js.map