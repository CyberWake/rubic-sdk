"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MuteSwapProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const uniswap_v2_abstract_provider_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider");
const constants_1 = require("./constants");
const mute_swap_trade_1 = require("./mute-swap-trade");
class MuteSwapProvider extends uniswap_v2_abstract_provider_1.UniswapV2AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.ZK_SYNC;
        this.UniswapV2TradeClass = mute_swap_trade_1.MuteSwapTrade;
        this.providerSettings = constants_1.MUTE_SWAP_PROVIDER_CONFIGURATION;
    }
}
exports.MuteSwapProvider = MuteSwapProvider;
//# sourceMappingURL=mute-swap-provider.js.map