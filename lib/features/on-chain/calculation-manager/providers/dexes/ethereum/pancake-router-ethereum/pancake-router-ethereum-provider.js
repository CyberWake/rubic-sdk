"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PancakeRouterEthereumProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const pancake_router_provider_1 = require("../../common/pancake-router/pancake-router-provider");
const chains_1 = require("viem/chains");
class PancakeRouterEthereumProvider extends pancake_router_provider_1.PancakeRouterProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM;
        this.chain = chains_1.mainnet;
        this.dexAddress = '0x13f4EA83D0bd40E75C8222255bc855a974568Dd4';
        this.v3subgraphAddress = 'https://api.thegraph.com/subgraphs/name/pancakeswap/exchange-v3-bsc';
        this.v2subgraphAddress = 'https://proxy-worker-api.pancakeswap.com/bsc-exchange';
        this.maxHops = 2;
        this.maxSplits = 3;
    }
}
exports.PancakeRouterEthereumProvider = PancakeRouterEthereumProvider;
//# sourceMappingURL=pancake-router-ethereum-provider.js.map