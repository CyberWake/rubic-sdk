"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickswapV3QuoterController = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../../../common/errors");
const object_1 = require("../../../../../../../common/utils/object");
const algebra_quoter_controller_1 = require("../algebra/algebra-quoter-controller");
/**
 * Works with requests, related to Uniswap v3 liquidity pools.
 */
class QuickswapV3QuoterController extends algebra_quoter_controller_1.AlgebraQuoterController {
    async getAllRoutes(from, to, exact, weiAmount, routeMaxTransitTokens) {
        const routesTokens = (await this.getOrCreateRouterTokens()).filter(token => !token.isEqualToTokens([from, to]));
        const options = {
            routesTokens,
            to,
            exact,
            weiAmount
        };
        const quoterMethodsData = [...Array(routeMaxTransitTokens + 1)]
            .map((_, maxTransitTokens) => this.getQuoterMethodsData({
            ...options,
            maxTransitTokens
        }, [from]))
            .flat();
        try {
            const results = await Promise.allSettled(quoterMethodsData.map(data => this.web3Public.callContractMethod(this.quoterContractAddress, this.quoterContractABI, data.methodData.methodName, data.methodData.methodArguments)));
            return results
                .map((promiseResponce, index) => {
                if (promiseResponce.status === 'fulfilled') {
                    const quoter = quoterMethodsData?.[index];
                    if (!quoter) {
                        throw new errors_1.RubicSdkError('Quoter has to be defined');
                    }
                    return {
                        outputAbsoluteAmount: new bignumber_js_1.default(promiseResponce.value.amountOut),
                        path: quoter.path
                    };
                }
                return null;
            })
                .filter(object_1.notNull);
        }
        catch (error) {
            console.debug(error);
            return [];
        }
    }
}
exports.QuickswapV3QuoterController = QuickswapV3QuoterController;
//# sourceMappingURL=quickswap-v3-quoter-controller.js.map