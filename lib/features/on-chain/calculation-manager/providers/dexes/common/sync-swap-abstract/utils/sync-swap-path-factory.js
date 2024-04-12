"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncSwapPathFactory = void 0;
const ethers_1 = require("ethers");
const sync_swap_router_1 = require("./sync-swap-router");
const constants_1 = require("./constants");
class SyncSwapPathFactory {
    static hasLiquidity(routePool, tokenInAddress, amountOut) {
        if (tokenInAddress && amountOut) {
            const reserveOut = routePool.tokenA === tokenInAddress ? routePool.reserveB : routePool.reserveA;
            return reserveOut.gt(amountOut);
        }
        return (routePool.reserveA.gte(SyncSwapPathFactory.liquidityMinReserve) &&
            routePool.reserveB.gte(SyncSwapPathFactory.liquidityMinReserve));
    }
    static createPath(steps) {
        return steps.map(({ routePool, tokenInAddress }) => {
            const step = {
                pool: routePool,
                tokenIn: tokenInAddress,
                swapFee: tokenInAddress === routePool.tokenA ? routePool.swapFeeAB : routePool.swapFeeBA
            };
            return step;
        });
    }
    static getPoolKey(tokenAAddress, tokenBAddress, poolType) {
        return tokenAAddress < tokenBAddress
            ? `${tokenAAddress}:${tokenBAddress}:${poolType}`
            : `${tokenBAddress}:${tokenAAddress}:${poolType}`;
    }
    static getPathsWith1Hop(poolsA, poolsB, tokenIn, baseToken) {
        const paths = [];
        for (const poolA of poolsA) {
            for (const poolB of poolsB) {
                if (poolA && poolB) {
                    paths.push(SyncSwapPathFactory.createPath([
                        { routePool: poolA, tokenInAddress: tokenIn },
                        { routePool: poolB, tokenInAddress: baseToken }
                    ]));
                }
            }
        }
        return paths;
    }
    static getPathsWith2Hops(poolsA, poolsBase, poolsB, tokenIn, baseToken1, baseToken2) {
        const paths = [];
        for (const poolA of poolsA) {
            for (const poolBase of poolsBase) {
                for (const poolB of poolsB) {
                    if (poolA && poolBase && poolB) {
                        paths.push(SyncSwapPathFactory.createPath([
                            { routePool: poolA, tokenInAddress: tokenIn },
                            { routePool: poolBase, tokenInAddress: baseToken1 },
                            { routePool: poolB, tokenInAddress: baseToken2 }
                        ]));
                    }
                }
            }
        }
        return paths;
    }
    static findAllPossiblePaths(tokenIn, tokenOut, routePools, enableHops = true) {
        const { pools: { poolsDirect, poolsA, poolsB, poolsBase }, routeTokens } = routePools;
        const paths = [];
        for (const pool of poolsDirect) {
            if (SyncSwapPathFactory.hasLiquidity(pool, tokenIn)) {
                const path = SyncSwapPathFactory.createPath([
                    {
                        routePool: pool,
                        tokenInAddress: tokenIn
                    }
                ]);
                paths.push(path);
            }
        }
        if (!enableHops)
            return paths;
        const poolsByPoolKey = new Map();
        for (const pool of [...poolsA, ...poolsB, ...poolsBase]) {
            if (SyncSwapPathFactory.hasLiquidity(pool)) {
                poolsByPoolKey.set(SyncSwapPathFactory.getPoolKey(pool.tokenA, pool.tokenB, pool.poolType), pool);
            }
        }
        for (const baseToken of routeTokens) {
            if (baseToken === tokenIn || baseToken === tokenOut) {
                // eslint-disable-next-line no-continue
                continue;
            }
            const poolA1 = poolsByPoolKey.get(SyncSwapPathFactory.getPoolKey(tokenIn, baseToken, '1'));
            const poolA2 = poolsByPoolKey.get(SyncSwapPathFactory.getPoolKey(tokenIn, baseToken, '2'));
            const poolB1 = poolsByPoolKey.get(SyncSwapPathFactory.getPoolKey(baseToken, tokenOut, '1'));
            const poolB2 = poolsByPoolKey.get(SyncSwapPathFactory.getPoolKey(baseToken, tokenOut, '2'));
            paths.push(...SyncSwapPathFactory.getPathsWith1Hop([poolA1, poolA2].filter(Boolean), [poolB1, poolB2].filter(Boolean), tokenIn, baseToken));
        }
        for (const baseToken1 of routeTokens) {
            if (baseToken1 === tokenIn || baseToken1 === tokenOut) {
                // eslint-disable-next-line no-continue
                continue;
            }
            const poolA1 = poolsByPoolKey.get(SyncSwapPathFactory.getPoolKey(tokenIn, baseToken1, '1'));
            const poolA2 = poolsByPoolKey.get(SyncSwapPathFactory.getPoolKey(tokenIn, baseToken1, '2'));
            for (const baseToken2 of routeTokens) {
                if (baseToken2 === tokenIn ||
                    baseToken2 === tokenOut ||
                    baseToken2 === baseToken1) {
                    // eslint-disable-next-line no-continue
                    continue;
                }
                const poolBase1 = poolsByPoolKey.get(SyncSwapPathFactory.getPoolKey(baseToken1, baseToken2, '1'));
                const poolBase2 = poolsByPoolKey.get(SyncSwapPathFactory.getPoolKey(baseToken1, baseToken2, '2'));
                const poolB1 = poolsByPoolKey.get(SyncSwapPathFactory.getPoolKey(baseToken2, tokenOut, '1'));
                const poolB2 = poolsByPoolKey.get(SyncSwapPathFactory.getPoolKey(baseToken2, tokenOut, '2'));
                paths.push(...SyncSwapPathFactory.getPathsWith2Hops([poolA1, poolA2].filter(Boolean), [poolBase1, poolBase2].filter(Boolean), [poolB1, poolB2].filter(Boolean), tokenIn, baseToken1, baseToken2));
            }
        }
        return paths;
    }
    static async getBestPath(paths, amountIn, blockchainName) {
        const pathAmountIn = ethers_1.BigNumber.from(amountIn);
        const pathsWithAmount = await Promise.all(paths.map(async (path, index) => ({
            pathWithAmounts: await sync_swap_router_1.SyncSwapRouter.calculatePathAmountsByInput(path, pathAmountIn, false, blockchainName),
            index
        })));
        const sortedIndexes = pathsWithAmount
            .sort((next, prev) => {
            if (!prev.pathWithAmounts) {
                return next.pathWithAmounts?.amountOut ? -1 : 1;
            }
            if (!next.pathWithAmounts) {
                return 1;
            }
            return prev.pathWithAmounts.amountOut.lte(next.pathWithAmounts.amountOut) ? 1 : -1;
        })
            .map(path => path.index);
        return paths.filter((_el, index) => sortedIndexes.slice(-4).includes(index));
    }
    static getQuoteOutStable(params) {
        const multiplier = 10000;
        const adjustedReserveIn = params.reserveIn
            .mul(params.tokenInPrecisionMultiplier)
            .mul(multiplier);
        const adjustedReserveOut = params.reserveOut
            .mul(params.tokenOutPrecisionMultiplier)
            .mul(multiplier);
        const amountIn = params.amount;
        const feeDeductedAmountIn = amountIn.sub(amountIn.mul(params.swapFee).div(constants_1.MAX_FEE));
        const d = sync_swap_router_1.SyncSwapRouter.computeDFromAdjustedBalances(constants_1.STABLE_POOL_A, adjustedReserveIn, adjustedReserveOut, false);
        const x = adjustedReserveIn.add(feeDeductedAmountIn.mul(params.tokenInPrecisionMultiplier));
        const y = sync_swap_router_1.SyncSwapRouter.getY(constants_1.STABLE_POOL_A, x, d);
        const dy = adjustedReserveOut.sub(y).sub(1);
        return dy.div(params.tokenOutPrecisionMultiplier);
    }
    static getQuoteOutClassic(params) {
        const amountIn = params.amount;
        const multiplier = 100000;
        const amountInWithFee = amountIn.mul(constants_1.MAX_FEE.sub(params.swapFee));
        return amountInWithFee
            .mul(params.reserveOut.mul(multiplier))
            .div(params.reserveIn.mul(multiplier).mul(constants_1.MAX_FEE));
    }
    static calculateQuoteOut(params) {
        if (params.amount.isZero()) {
            return constants_1.ZERO;
        }
        return params.stable
            ? SyncSwapPathFactory.getQuoteOutStable(params)
            : SyncSwapPathFactory.getQuoteOutClassic(params);
    }
}
exports.SyncSwapPathFactory = SyncSwapPathFactory;
SyncSwapPathFactory.liquidityMinReserve = ethers_1.BigNumber.from(1000);
//# sourceMappingURL=sync-swap-path-factory.js.map