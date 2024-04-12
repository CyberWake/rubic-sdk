"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrisolarisAuroraProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const constants_1 = require("./constants");
const trisolaris_aurora_trade_1 = require("./trisolaris-aurora-trade");
const uniswap_v2_abstract_provider_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider");
class TrisolarisAuroraProvider extends uniswap_v2_abstract_provider_1.UniswapV2AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.AURORA;
        this.UniswapV2TradeClass = trisolaris_aurora_trade_1.TrisolarisAuroraTrade;
        this.providerSettings = constants_1.TRISOLARIS_AURORA_PROVIDER_CONFIGURATION;
    }
}
exports.TrisolarisAuroraProvider = TrisolarisAuroraProvider;
//# sourceMappingURL=trisolaris-aurora-provider.js.map