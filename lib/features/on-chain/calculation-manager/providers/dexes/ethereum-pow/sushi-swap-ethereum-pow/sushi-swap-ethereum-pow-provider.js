"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SushiSwapEthereumPowProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const uniswap_v2_abstract_provider_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider");
const constants_1 = require("./constants");
const sushi_swap_ethereum_pow_trade_1 = require("./sushi-swap-ethereum-pow-trade");
class SushiSwapEthereumPowProvider extends uniswap_v2_abstract_provider_1.UniswapV2AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM_POW;
        this.UniswapV2TradeClass = sushi_swap_ethereum_pow_trade_1.SushiSwapEthereumPowTrade;
        this.providerSettings = constants_1.SUSHI_SWAP_ETHEREUM_POW_PROVIDER_CONFIGURATION;
    }
}
exports.SushiSwapEthereumPowProvider = SushiSwapEthereumPowProvider;
//# sourceMappingURL=sushi-swap-ethereum-pow-provider.js.map