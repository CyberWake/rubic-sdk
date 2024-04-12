"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpookySwapProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const uniswap_v2_abstract_provider_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider");
const constants_1 = require("./constants");
const spooky_swap_trade_1 = require("./spooky-swap-trade");
class SpookySwapProvider extends uniswap_v2_abstract_provider_1.UniswapV2AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.FANTOM;
        this.UniswapV2TradeClass = spooky_swap_trade_1.SpookySwapTrade;
        this.providerSettings = constants_1.SPOOKY_SWAP_PROVIDER_CONFIGURATION;
    }
}
exports.SpookySwapProvider = SpookySwapProvider;
//# sourceMappingURL=spooky-swap-provider.js.map