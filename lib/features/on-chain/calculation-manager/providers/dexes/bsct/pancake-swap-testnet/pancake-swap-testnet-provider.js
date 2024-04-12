"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PancakeSwapTestnetProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const constants_1 = require("./constants");
const pancake_swap_testnet_trade_1 = require("./pancake-swap-testnet-trade");
const uniswap_v2_abstract_provider_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider");
class PancakeSwapTestnetProvider extends uniswap_v2_abstract_provider_1.UniswapV2AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN_TESTNET;
        this.UniswapV2TradeClass = pancake_swap_testnet_trade_1.PancakeSwapTestnetTrade;
        this.providerSettings = constants_1.PANCAKE_SWAP_TESTNET_PROVIDER_CONFIGURATION;
    }
}
exports.PancakeSwapTestnetProvider = PancakeSwapTestnetProvider;
//# sourceMappingURL=pancake-swap-testnet-provider.js.map