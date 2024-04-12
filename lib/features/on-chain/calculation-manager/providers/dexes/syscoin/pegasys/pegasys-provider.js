"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PegasysProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const uniswap_v2_abstract_provider_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider");
const constants_1 = require("./constants");
const pegasys_trade_1 = require("./pegasys-trade");
class PegasysProvider extends uniswap_v2_abstract_provider_1.UniswapV2AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.SYSCOIN;
        this.UniswapV2TradeClass = pegasys_trade_1.PegasysTrade;
        this.providerSettings = constants_1.PEGASYS_PROVIDER_CONFIGURATION;
    }
}
exports.PegasysProvider = PegasysProvider;
//# sourceMappingURL=pegasys-provider.js.map