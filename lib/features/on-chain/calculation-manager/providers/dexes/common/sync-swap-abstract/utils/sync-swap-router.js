"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncSwapRouter = void 0;
const ethers_1 = require("ethers");
const blockchain_1 = require("../../../../../../../../common/utils/blockchain");
const decorators_1 = require("../../../../../../../../common/utils/decorators");
const injector_1 = require("../../../../../../../../core/injector/injector");
const sync_swap_stable_pool_1 = require("../sync-swap-stable-pool");
const constants_1 = require("./constants");
const sync_swap_path_factory_1 = require("./sync-swap-path-factory");
const typings_1 = require("./typings");
class SyncSwapRouter {
    static async findBestAmountsForPathsExactIn(paths, amountInString, blockchainName, _ts) {
        const amountIn = ethers_1.BigNumber.from(amountInString);
        const pathAmounts = await SyncSwapRouter.splitAmount(amountIn, paths.length);
        const groups = [];
        const groupPromises = [];
        for (const amounts of pathAmounts) {
            const promise = new Promise((resolve, reject) => {
                SyncSwapRouter.calculateGroupAmounts(paths, amounts, blockchainName).then(group => {
                    if (group === null) {
                        reject(new Error('expired'));
                    }
                    else {
                        groups.push(group);
                        resolve(true);
                    }
                });
            });
            groupPromises.push(promise);
        }
        await Promise.all(groupPromises);
        let bestPathsWithAmounts = [];
        let bestAmountOut = constants_1.ZERO;
        let bestQuoteOut = constants_1.ZERO;
        let bestPriceImpact = null;
        for (const group of groups) {
            const groupAmountOut = group.amountOut;
            if (!groupAmountOut.isZero() && !group.quoteOut.isZero()) {
                const amountLoss = group.quoteOut.sub(groupAmountOut);
                const groupPriceImpact = amountLoss.mul(constants_1.ETHER).div(group.quoteOut);
                if (bestPriceImpact === null || groupPriceImpact.lt(bestPriceImpact)) {
                    bestPriceImpact = groupPriceImpact;
                }
                if (groupAmountOut.gt(bestAmountOut)) {
                    bestPathsWithAmounts = group.pathsWithAmounts;
                    bestAmountOut = groupAmountOut;
                    bestQuoteOut = group.quoteOut;
                }
            }
        }
        return {
            found: bestAmountOut !== null,
            direction: typings_1.routeDirection.EXACT_IN,
            pathsWithAmounts: bestPathsWithAmounts,
            amountIn,
            amountOut: bestAmountOut,
            quote: bestQuoteOut,
            bestPriceImpact,
            gas: constants_1.ZERO
        };
    }
    static copyStep(step) {
        const pool = step.pool;
        return {
            pool: {
                isAlpha: pool.isAlpha,
                vault: pool.vault,
                pool: pool.pool,
                tokenA: pool.tokenA,
                tokenB: pool.tokenB,
                poolType: pool.poolType,
                reserveA: ethers_1.BigNumber.from(pool.reserveA),
                reserveB: ethers_1.BigNumber.from(pool.reserveB),
                swapFeeAB: pool.swapFeeAB,
                swapFeeBA: pool.swapFeeBA
            },
            tokenIn: step.tokenIn,
            swapFee: step.swapFee
        };
    }
    static getAmountOutClassic(params, checkOverflow) {
        const amountIn = params.amount;
        const reserveIn = params.reserveIn;
        if (checkOverflow && reserveIn.add(amountIn).gt(constants_1.UINT128_MAX)) {
            throw Error('overflow');
        }
        const amountInWithFee = amountIn.mul(constants_1.MAX_FEE.sub(params.swapFee));
        if (checkOverflow && amountInWithFee.gt(constants_1.UINT256_MAX)) {
            throw Error('overflow');
        }
        const numerator = amountInWithFee.mul(params.reserveOut);
        if (checkOverflow && numerator.gt(constants_1.UINT256_MAX)) {
            throw Error('overflow');
        }
        const denominator = params.reserveIn.mul(constants_1.MAX_FEE).add(amountInWithFee);
        if (checkOverflow && denominator.gt(constants_1.UINT256_MAX)) {
            throw Error('overflow');
        }
        return numerator.div(denominator);
    }
    static computeDFromAdjustedBalances(A, xp0, xp1, checkOverflow) {
        const s = xp0.add(xp1);
        if (s.isZero()) {
            return constants_1.ZERO;
        }
        let prevD;
        let d = s;
        const nA = A.mul(constants_1.TWO);
        for (let i = 0; i < constants_1.MAX_LOOP_LIMIT; i++) {
            const dSq = d.mul(d);
            if (checkOverflow && dSq.gt(constants_1.UINT256_MAX)) {
                throw Error('overflow');
            }
            const d2 = dSq.div(xp0).mul(d);
            if (checkOverflow && d2.gt(constants_1.UINT256_MAX)) {
                throw Error('overflow');
            }
            const dP = d2.div(xp1).div(constants_1.FOUR);
            prevD = d;
            const d0 = nA.mul(s).add(dP.mul(constants_1.TWO)).mul(d);
            if (checkOverflow && d0.gt(constants_1.UINT256_MAX)) {
                throw Error('overflow');
            }
            d = d0.div(nA.sub(constants_1.ONE).mul(d).add(dP.mul(constants_1.THREE)));
            if (d.sub(prevD).abs().lte(constants_1.ONE)) {
                return d;
            }
        }
        return d;
    }
    static getY(A, x, d) {
        const nA = A.mul(constants_1.TWO);
        const c = d.mul(d).div(x.mul(constants_1.TWO)).mul(d).div(nA.mul(constants_1.TWO));
        const b = d.div(nA).add(x);
        let yPrev;
        let y = d;
        for (let i = 0; i < constants_1.MAX_LOOP_LIMIT; i++) {
            yPrev = y;
            y = y.mul(y).add(c).div(y.mul(constants_1.TWO).add(b).sub(d));
            if (y.sub(yPrev).abs().lte(constants_1.ONE)) {
                break;
            }
        }
        return y;
    }
    static getAmountOutStable(params, checkOverflow) {
        const adjustedReserveIn = params.reserveIn.mul(params.tokenInPrecisionMultiplier);
        if (checkOverflow && adjustedReserveIn.gt(constants_1.MAX_XP)) {
            throw Error('overflow');
        }
        const adjustedReserveOut = params.reserveOut.mul(params.tokenOutPrecisionMultiplier);
        if (checkOverflow && adjustedReserveOut.gt(constants_1.MAX_XP)) {
            throw Error('overflow');
        }
        const amountIn = params.amount;
        const feeDeductedAmountIn = amountIn.sub(amountIn.mul(params.swapFee).div(constants_1.MAX_FEE));
        const d = SyncSwapRouter.computeDFromAdjustedBalances(constants_1.STABLE_POOL_A, adjustedReserveIn, adjustedReserveOut, checkOverflow);
        const x = adjustedReserveIn.add(feeDeductedAmountIn.mul(params.tokenInPrecisionMultiplier));
        const y = SyncSwapRouter.getY(constants_1.STABLE_POOL_A, x, d);
        const dy = adjustedReserveOut.sub(y).sub(1);
        return dy.div(params.tokenOutPrecisionMultiplier);
    }
    static calculateAmountOut(params, checkOverflow) {
        if (params.amount.isZero()) {
            return constants_1.ZERO;
        }
        let amountOut;
        try {
            if (params.stable) {
                amountOut = SyncSwapRouter.getAmountOutStable(params, checkOverflow);
            }
            else {
                amountOut = SyncSwapRouter.getAmountOutClassic(params, checkOverflow);
            }
        }
        catch (error) {
            return constants_1.ZERO;
        }
        return amountOut;
    }
    static splitAmounts2(amount, granularity) {
        const oneSplit = amount.div(granularity);
        if (oneSplit.isZero()) {
            return [];
        }
        const amounts = [];
        for (let i = 0; i <= granularity; i++) {
            const a = oneSplit.mul(i);
            const b = oneSplit.mul(granularity - i);
            amounts.push([a, b]);
        }
        return amounts;
    }
    static splitAmounts3(amount, granularity) {
        const oneSplit = amount.div(granularity);
        if (oneSplit.isZero()) {
            return [];
        }
        const amounts = [];
        for (let i = 0; i <= granularity; i++) {
            const a = oneSplit.mul(i);
            const remaining = granularity - i;
            for (let j = 0; j <= remaining; j++) {
                const b = oneSplit.mul(j);
                const c = oneSplit.mul(remaining - j);
                amounts.push([a, b, c]);
            }
        }
        return amounts;
    }
    static splitAmounts4(amount, granularity) {
        const oneSplit = amount.div(granularity);
        if (oneSplit.isZero()) {
            return [];
        }
        const amounts = [];
        for (let i = 0; i <= granularity; i++) {
            const a = oneSplit.mul(i);
            const remaining = granularity - i;
            for (let j = 0; j <= remaining; j++) {
                const b = oneSplit.mul(j);
                const remaining2 = remaining - j;
                for (let k = 0; k <= remaining2; k++) {
                    const c = oneSplit.mul(k);
                    const d = oneSplit.mul(remaining2 - k);
                    amounts.push([a, b, c, d]);
                }
            }
        }
        return amounts;
    }
    static splitAmounts5(amount, granularity) {
        const oneSplit = amount.div(granularity);
        if (oneSplit.isZero()) {
            return [];
        }
        const amounts = [];
        for (let i = 0; i <= granularity; i++) {
            const a = oneSplit.mul(i);
            const remaining = granularity - i;
            for (let j = 0; j <= remaining; j++) {
                const b = oneSplit.mul(j);
                const remaining2 = remaining - j;
                for (let k = 0; k <= remaining2; k++) {
                    const c = oneSplit.mul(k);
                    const remaining3 = remaining2 - k;
                    for (let l = 0; l <= remaining3; l++) {
                        const d = oneSplit.mul(l);
                        const e = oneSplit.mul(remaining3 - l);
                        amounts.push([a, b, c, d, e]);
                    }
                }
            }
        }
        return amounts;
    }
    static fixSplitAmounts(amount, amounts) {
        for (const group of amounts) {
            let sum = constants_1.ZERO;
            for (const amount of group) {
                sum = sum.add(amount);
            }
            if (!sum.eq(amount)) {
                const diff = amount.sub(sum);
                for (const amount of group) {
                    // only add diff to non-zero amount
                    if (!amount.isZero()) {
                        group[0] = group[0].add(diff);
                        break;
                    }
                }
            }
        }
        return amounts;
    }
    static async splitAmount(amount, parts) {
        if (parts === 0) {
            return [];
        }
        if (parts === 1) {
            return [[amount]];
        }
        if (parts === 2) {
            return SyncSwapRouter.fixSplitAmounts(amount, SyncSwapRouter.splitAmounts2(amount, constants_1.granularity));
        }
        if (parts === 3) {
            return SyncSwapRouter.fixSplitAmounts(amount, SyncSwapRouter.splitAmounts3(amount, constants_1.granularity));
        }
        if (parts === 4) {
            return SyncSwapRouter.fixSplitAmounts(amount, SyncSwapRouter.splitAmounts4(amount, constants_1.granularity));
        }
        if (parts === 5) {
            return SyncSwapRouter.fixSplitAmounts(amount, SyncSwapRouter.splitAmounts5(amount, constants_1.granularity));
        }
        throw Error('Unsupported split parts');
    }
    static async calculateAmountOutForStep(step, amountIn, quoteIn, blockchainName) {
        const isTokenAIn = step.pool.tokenA === step.tokenIn;
        const [reserveIn, reserveOut] = isTokenAIn
            ? [step.pool.reserveA, step.pool.reserveB]
            : [step.pool.reserveB, step.pool.reserveA];
        let tokenInPrecisionMultiplier;
        let tokenOutPrecisionMultiplier;
        // create multiplier for stable pools
        const stable = step.pool.poolType === '2';
        if (stable) {
            const [tokenInAddress] = isTokenAIn
                ? [step.pool.tokenA, step.pool.tokenB]
                : [step.pool.tokenB, step.pool.tokenA];
            const { fromPrecisionMultiplier, toPrecisionMultiplier } = await this.getPoolPrecision(step.pool.pool, tokenInAddress, blockchainName);
            tokenInPrecisionMultiplier = ethers_1.BigNumber.from(fromPrecisionMultiplier);
            tokenOutPrecisionMultiplier = ethers_1.BigNumber.from(toPrecisionMultiplier);
        }
        else {
            tokenInPrecisionMultiplier = constants_1.ZERO;
            tokenOutPrecisionMultiplier = constants_1.ZERO;
        }
        const swapFee = ethers_1.BigNumber.from(step.swapFee);
        const amountOut = SyncSwapRouter.calculateAmountOut({
            stable,
            amount: amountIn,
            reserveIn,
            reserveOut,
            swapFee,
            tokenInPrecisionMultiplier,
            tokenOutPrecisionMultiplier
        }, true);
        let quoteOut = constants_1.ZERO;
        let updatedStep = null;
        if (!amountOut.isZero()) {
            updatedStep = SyncSwapRouter.copyStep(step);
            if (isTokenAIn) {
                updatedStep.pool.reserveA = step.pool.reserveA.add(amountIn);
                updatedStep.pool.reserveB = step.pool.reserveB.sub(amountOut);
            }
            else {
                updatedStep.pool.reserveB = step.pool.reserveB.add(amountIn);
                updatedStep.pool.reserveA = step.pool.reserveA.sub(amountOut);
            }
            quoteOut = sync_swap_path_factory_1.SyncSwapPathFactory.calculateQuoteOut({
                stable,
                amount: quoteIn,
                reserveIn,
                reserveOut,
                swapFee,
                tokenInPrecisionMultiplier,
                tokenOutPrecisionMultiplier
            });
        }
        return [amountOut, quoteOut, updatedStep];
    }
    static async calculatePathAmountsByInput(path, amountIn, _updateReserves, blockchainName) {
        const stepsWithAmount = [];
        let amountInNext = amountIn;
        let quoteInNext = amountIn;
        for (let i = 0; i < path.length; i++) {
            const step = path[i];
            const [stepAmountOut, stepQuoteOut, updatedStep] = 
            // eslint-disable-next-line no-await-in-loop
            await SyncSwapRouter.calculateAmountOutForStep(step, amountInNext, quoteInNext, blockchainName);
            if (stepAmountOut.isZero()) {
                return null;
            }
            stepsWithAmount.push({
                ...step,
                updatedStep,
                amountIn: amountInNext
            });
            amountInNext = stepAmountOut;
            quoteInNext = stepQuoteOut;
        }
        const pathAmountOut = amountInNext;
        const pathQuoteOut = quoteInNext;
        return {
            direction: typings_1.routeDirection.EXACT_IN,
            stepsWithAmount,
            amountOut: pathAmountOut,
            amountIn,
            quote: pathQuoteOut
        };
    }
    static async calculateGroupAmounts(paths, amounts, blockchainName) {
        const pathsWithAmounts = [];
        let amountOut = constants_1.ZERO;
        let quoteOut = constants_1.ZERO;
        const groupPaths = paths;
        const lastSteps = new Map();
        for (let i = 0; i < groupPaths.length; i++) {
            const pathAmountIn = amounts[i];
            if (pathAmountIn.isZero()) {
                // eslint-disable-next-line no-continue
                continue;
            }
            const path = groupPaths[i];
            for (let j = 0; j < path.length; j++) {
                const lastStep = lastSteps.get(path[j].pool.pool);
                if (lastStep !== undefined) {
                    path[j] = SyncSwapRouter.copyStep(lastStep);
                }
            }
            const pathWithAmounts = 
            // eslint-disable-next-line no-await-in-loop
            await SyncSwapRouter.calculatePathAmountsByInput(path, pathAmountIn, true, blockchainName);
            if (pathWithAmounts != null) {
                for (const step of pathWithAmounts.stepsWithAmount) {
                    if (step.updatedStep !== null) {
                        lastSteps.set(step.pool.pool, step.updatedStep);
                    }
                }
                pathsWithAmounts.push(pathWithAmounts);
                amountOut = amountOut.add(pathWithAmounts.amountOut);
                quoteOut = quoteOut.add(pathWithAmounts.quote);
            }
        }
        return {
            pathsWithAmounts,
            amountOut,
            quoteOut
        };
    }
    static async getPoolPrecision(address, fromAddress, blockchainName) {
        const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(blockchainName);
        const token0 = await web3Public.callContractMethod(address, sync_swap_stable_pool_1.syncSwapStablePool, 'token0', []);
        const token0PM = await web3Public.callContractMethod(address, sync_swap_stable_pool_1.syncSwapStablePool, 'token0PrecisionMultiplier', []);
        const token1PM = await web3Public.callContractMethod(address, sync_swap_stable_pool_1.syncSwapStablePool, 'token1PrecisionMultiplier', []);
        return (0, blockchain_1.compareAddresses)(token0, fromAddress)
            ? {
                fromPrecisionMultiplier: token0PM,
                toPrecisionMultiplier: token1PM
            }
            : {
                fromPrecisionMultiplier: token1PM,
                toPrecisionMultiplier: token0PM
            };
    }
}
exports.SyncSwapRouter = SyncSwapRouter;
__decorate([
    decorators_1.Cache
], SyncSwapRouter, "getPoolPrecision", null);
//# sourceMappingURL=sync-swap-router.js.map