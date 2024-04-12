"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SushiSwapPolygonProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const uniswap_v2_abstract_provider_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider");
const constants_1 = require("./constants");
const sushi_swap_polygon_trade_1 = require("./sushi-swap-polygon-trade");
class SushiSwapPolygonProvider extends uniswap_v2_abstract_provider_1.UniswapV2AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.POLYGON;
        this.UniswapV2TradeClass = sushi_swap_polygon_trade_1.SushiSwapPolygonTrade;
        this.providerSettings = constants_1.SUSHI_SWAP_POLYGON_PROVIDER_CONFIGURATION;
    }
}
exports.SushiSwapPolygonProvider = SushiSwapPolygonProvider;
//# sourceMappingURL=sushi-swap-polygon-provider.js.map