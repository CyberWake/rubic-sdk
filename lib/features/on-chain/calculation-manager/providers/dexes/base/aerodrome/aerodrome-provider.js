"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AerodromeProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const aerodrome_path_factory_1 = require("./aerodrome-path-factory");
const aerodrome_trade_1 = require("./aerodrome-trade");
const constants_1 = require("./constants");
const uniswap_v2_abstract_provider_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider");
class AerodromeProvider extends uniswap_v2_abstract_provider_1.UniswapV2AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.BASE;
        this.UniswapV2TradeClass = aerodrome_trade_1.AerodromeTrade;
        this.providerSettings = constants_1.AERODROME_PROVIDER_CONFIGURATION;
    }
    async getAmountAndPath(from, to, weiAmount, exact, options, proxyFeeInfo, gasPriceInUsd) {
        const pathFactory = new aerodrome_path_factory_1.AerodromePathFactory(this, {
            from,
            to,
            weiAmount,
            exact,
            options,
            proxyFeeInfo
        });
        return pathFactory.getAmountAndPath(gasPriceInUsd);
    }
}
exports.AerodromeProvider = AerodromeProvider;
//# sourceMappingURL=aerodrome-provider.js.map