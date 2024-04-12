"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniSwapV3EthereumProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const uniswap_v3_abstract_provider_1 = require("../../common/uniswap-v3-abstract/uniswap-v3-abstract-provider");
const uniswap_v3_quoter_controller_1 = require("../../common/uniswap-v3-abstract/utils/quoter-controller/uniswap-v3-quoter-controller");
const provider_configuration_1 = require("./constants/provider-configuration");
const router_configuration_1 = require("./constants/router-configuration");
const uni_swap_v3_ethereum_trade_1 = require("./uni-swap-v3-ethereum-trade");
class UniSwapV3EthereumProvider extends uniswap_v3_abstract_provider_1.UniswapV3AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM;
        this.OnChainTradeClass = uni_swap_v3_ethereum_trade_1.UniSwapV3EthereumTrade;
        this.providerConfiguration = provider_configuration_1.UNI_SWAP_V3_ETHEREUM_PROVIDER_CONFIGURATION;
        this.routerConfiguration = router_configuration_1.UNI_SWAP_V3_ETHEREUM_ROUTER_CONFIGURATION;
        this.quoterController = new uniswap_v3_quoter_controller_1.UniswapV3QuoterController(this.blockchain, this.routerConfiguration);
    }
}
exports.UniSwapV3EthereumProvider = UniSwapV3EthereumProvider;
//# sourceMappingURL=uni-swap-v3-ethereum-provider.js.map