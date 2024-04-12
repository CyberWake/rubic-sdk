"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronaSwapProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const uniswap_v2_abstract_provider_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider");
const constants_1 = require("./constants");
const crona_swap_trade_1 = require("./crona-swap-trade");
class CronaSwapProvider extends uniswap_v2_abstract_provider_1.UniswapV2AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.CRONOS;
        this.UniswapV2TradeClass = crona_swap_trade_1.CronaSwapTrade;
        this.providerSettings = constants_1.CRONA_SWAP_PROVIDER_CONFIGURATION;
    }
}
exports.CronaSwapProvider = CronaSwapProvider;
//# sourceMappingURL=crona-swap-provider.js.map