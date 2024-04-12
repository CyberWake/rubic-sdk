"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FusionXProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const uniswap_v3_abstract_provider_1 = require("../../common/uniswap-v3-abstract/uniswap-v3-abstract-provider");
const fusionx_uniswap_v3_quoter_controller_1 = require("../../common/uniswap-v3-abstract/utils/quoter-controller/fusionx-uniswap-v3-quoter-controller");
const provider_configuration_1 = require("./constants/provider-configuration");
const router_configuration_1 = require("./constants/router-configuration");
const fusionx_trade_1 = require("./fusionx-trade");
class FusionXProvider extends uniswap_v3_abstract_provider_1.UniswapV3AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.MANTLE;
        this.OnChainTradeClass = fusionx_trade_1.FusionXTrade;
        this.providerConfiguration = provider_configuration_1.FUSIONX_PROVIDER_CONFIGURATION;
        this.routerConfiguration = router_configuration_1.FUSIONX_ROUTER_CONFIGURATION;
        this.quoterController = new fusionx_uniswap_v3_quoter_controller_1.FusionXUniswapV3QuoterController(this.blockchain, this.routerConfiguration);
    }
}
exports.FusionXProvider = FusionXProvider;
//# sourceMappingURL=fusionx-provider.js.map