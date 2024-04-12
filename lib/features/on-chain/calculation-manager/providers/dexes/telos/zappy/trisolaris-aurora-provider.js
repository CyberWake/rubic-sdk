"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZappyProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const uniswap_v2_abstract_provider_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider");
const constants_1 = require("./constants");
const trisolaris_aurora_trade_1 = require("./trisolaris-aurora-trade");
class ZappyProvider extends uniswap_v2_abstract_provider_1.UniswapV2AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.TELOS;
        this.UniswapV2TradeClass = trisolaris_aurora_trade_1.ZappyTrade;
        this.providerSettings = constants_1.ZAPPY_PROVIDER_CONFIGURATION;
    }
}
exports.ZappyProvider = ZappyProvider;
//# sourceMappingURL=trisolaris-aurora-provider.js.map