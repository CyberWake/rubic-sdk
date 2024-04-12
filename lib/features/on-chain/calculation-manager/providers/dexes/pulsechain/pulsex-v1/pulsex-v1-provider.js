"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PulseXV1Provider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const uniswap_v2_abstract_provider_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider");
const constants_1 = require("./constants");
const pulsex_v1_trade_1 = require("./pulsex-v1-trade");
class PulseXV1Provider extends uniswap_v2_abstract_provider_1.UniswapV2AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.PULSECHAIN;
        this.UniswapV2TradeClass = pulsex_v1_trade_1.PulseXV1Trade;
        this.providerSettings = constants_1.PULSEX_V1_PROVIDER_CONFIGURATION;
    }
}
exports.PulseXV1Provider = PulseXV1Provider;
//# sourceMappingURL=pulsex-v1-provider.js.map