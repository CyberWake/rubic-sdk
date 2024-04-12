"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArthSwapProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const arth_swap_trade_1 = require("./arth-swap-trade");
const constants_1 = require("./constants");
const uniswap_v2_abstract_provider_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider");
class ArthSwapProvider extends uniswap_v2_abstract_provider_1.UniswapV2AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.ASTAR_EVM;
        this.UniswapV2TradeClass = arth_swap_trade_1.ArthSwapTrade;
        this.providerSettings = constants_1.ARTH_SWAP_PROVIDER_CONFIGURATION;
    }
}
exports.ArthSwapProvider = ArthSwapProvider;
//# sourceMappingURL=arth-swap-provider.js.map