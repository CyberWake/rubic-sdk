"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pancakeRouterProviders = void 0;
const pancake_router_bsc_provider_1 = require("../../providers/dexes/bsc/pancake-router-bsc/pancake-router-bsc-provider");
const pancake_router_ethereum_provider_1 = require("../../providers/dexes/ethereum/pancake-router-ethereum/pancake-router-ethereum-provider");
exports.pancakeRouterProviders = [
    pancake_router_bsc_provider_1.PancakeRouterBscProvider,
    pancake_router_ethereum_provider_1.PancakeRouterEthereumProvider
    // PancakeRouterPolygonZkEvmProvider
];
//# sourceMappingURL=pancake-router-providers.js.map