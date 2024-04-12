"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HorizondexProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const uniswap_v3_abstract_provider_1 = require("../../common/uniswap-v3-abstract/uniswap-v3-abstract-provider");
const horizondex_uniswap_v3_quoter_controller_1 = require("../../common/uniswap-v3-abstract/utils/quoter-controller/horizondex-uniswap-v3-quoter-controller");
const provider_configuration_1 = require("./constants/provider-configuration");
const router_configuration_1 = require("./constants/router-configuration");
const horizondex_trade_1 = require("./horizondex-trade");
class HorizondexProvider extends uniswap_v3_abstract_provider_1.UniswapV3AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.LINEA;
        this.OnChainTradeClass = horizondex_trade_1.HorizondexTrade;
        this.providerConfiguration = provider_configuration_1.HORIZONDEX_PROVIDER_CONFIGURATION;
        this.routerConfiguration = router_configuration_1.HORIZONDEX_ROUTER_CONFIGURATION;
        this.quoterController = new horizondex_uniswap_v3_quoter_controller_1.HorizondexUniswapV3QuoterController(this.blockchain, this.routerConfiguration);
    }
}
exports.HorizondexProvider = HorizondexProvider;
//# sourceMappingURL=horizondex-provider.js.map