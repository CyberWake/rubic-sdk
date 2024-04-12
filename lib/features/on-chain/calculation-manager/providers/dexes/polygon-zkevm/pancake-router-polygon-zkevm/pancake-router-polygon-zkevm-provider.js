"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PancakeRouterPolygonZkEvmProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const pancake_router_provider_1 = require("../../common/pancake-router/pancake-router-provider");
const chains_1 = require("viem/chains");
class PancakeRouterPolygonZkEvmProvider extends pancake_router_provider_1.PancakeRouterProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.POLYGON_ZKEVM;
        this.chain = chains_1.polygonZkEvm;
        this.dexAddress = '0x678Aa4bF4E210cf2166753e054d5b7c31cc7fa86';
        this.v3subgraphAddress = 'https://api.studio.thegraph.com/query/45376/exchange-v3-polygon-zkevm/v0.0.0';
        this.v2subgraphAddress = 'https://api.studio.thegraph.com/query/45376/exchange-v2-polygon-zkevm/version/latest';
        this.maxHops = 2;
        this.maxSplits = 2;
    }
}
exports.PancakeRouterPolygonZkEvmProvider = PancakeRouterPolygonZkEvmProvider;
//# sourceMappingURL=pancake-router-polygon-zkevm-provider.js.map