"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncSwapFactory = void 0;
const ethers_1 = require("ethers");
const injector_1 = require("../../../../../../../../core/injector/injector");
const router_support_abi_1 = require("../router-support-abi");
class SyncSwapFactory {
    static normalizePool(vault, pool) {
        return {
            ...pool,
            vault,
            tokenA: pool.tokenA.toLowerCase(),
            tokenB: pool.tokenB.toLowerCase()
        };
    }
    static normalizePools(vault, pools) {
        return [...pools].map(pool => SyncSwapFactory.normalizePool(vault, pool));
    }
    static transformResponse(routes) {
        const fn = el => ({
            ...el,
            reserveA: ethers_1.BigNumber.from(el.reserveA),
            reserveB: ethers_1.BigNumber.from(el.reserveB)
        });
        return {
            poolsDirect: routes.poolsDirect.map(fn),
            poolsA: routes.poolsA.map(fn),
            poolsB: routes.poolsB.map(fn),
            poolsBase: routes.poolsBase.map(fn)
        };
    }
    static async fetchRoutePools(tokenA, tokenB, account, vault, factories, routeTokens, masterAddress, routerHelperAddress, blockchain) {
        try {
            const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(blockchain);
            const response = (await web3Public.callContractMethod(routerHelperAddress, router_support_abi_1.routerSupportAbi, 'getRoutePools', [tokenA, tokenB, factories, routeTokens, masterAddress, account]));
            const payload = SyncSwapFactory.transformResponse(response);
            const poolsDirect = SyncSwapFactory.normalizePools(vault, payload.poolsDirect);
            const [directPoolClassic, directPoolStable] = [poolsDirect[0], poolsDirect[1]];
            const directPoolOptimal = directPoolClassic.reserveA > directPoolStable.reserveA.mul(2)
                ? directPoolClassic
                : directPoolStable;
            return {
                directPoolOptimal,
                routeTokens,
                tokenA,
                tokenB,
                timestamp: Date.now(),
                pools: {
                    poolsDirect,
                    poolsA: SyncSwapFactory.normalizePools(vault, payload.poolsA),
                    poolsB: SyncSwapFactory.normalizePools(vault, payload.poolsB),
                    poolsBase: SyncSwapFactory.normalizePools(vault, payload.poolsBase)
                }
            };
        }
        catch (error) {
            return null;
        }
    }
}
exports.SyncSwapFactory = SyncSwapFactory;
//# sourceMappingURL=sync-swap-factory.js.map