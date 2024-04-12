"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseSwapProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const base_swap_trade_1 = require("./base-swap-trade");
const constants_1 = require("./constants");
const uniswap_v2_abstract_provider_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider");
class BaseSwapProvider extends uniswap_v2_abstract_provider_1.UniswapV2AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.BASE;
        this.UniswapV2TradeClass = base_swap_trade_1.BaseSwapTrade;
        this.providerSettings = constants_1.BASE_SWAP_PROVIDER_CONFIGURATION;
    }
}
exports.BaseSwapProvider = BaseSwapProvider;
//# sourceMappingURL=base-swap-provider.js.map