"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpiritSwapProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const uniswap_v2_abstract_provider_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider");
const constants_1 = require("./constants");
const spirit_swap_trade_1 = require("./spirit-swap-trade");
class SpiritSwapProvider extends uniswap_v2_abstract_provider_1.UniswapV2AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.FANTOM;
        this.UniswapV2TradeClass = spirit_swap_trade_1.SpiritSwapTrade;
        this.providerSettings = constants_1.SPIRIT_SWAP_PROVIDER_CONFIGURATION;
    }
}
exports.SpiritSwapProvider = SpiritSwapProvider;
//# sourceMappingURL=spirit-swap-provider.js.map