"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniSwapV2EthereumPowProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const uniswap_v2_abstract_provider_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider");
const constants_1 = require("./constants");
const uni_swap_v2_ethereum_pow_trade_1 = require("./uni-swap-v2-ethereum-pow-trade");
class UniSwapV2EthereumPowProvider extends uniswap_v2_abstract_provider_1.UniswapV2AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM_POW;
        this.UniswapV2TradeClass = uni_swap_v2_ethereum_pow_trade_1.UniSwapV2EthereumPowTrade;
        this.providerSettings = constants_1.UNISWAP_V2_ETHEREUM_POW_PROVIDER_CONFIGURATION;
    }
}
exports.UniSwapV2EthereumPowProvider = UniSwapV2EthereumPowProvider;
//# sourceMappingURL=uni-swap-v2-ethereum-pow-provider.js.map