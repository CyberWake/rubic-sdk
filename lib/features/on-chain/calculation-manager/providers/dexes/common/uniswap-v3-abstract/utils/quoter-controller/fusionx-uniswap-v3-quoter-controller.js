"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FusionXUniswapV3QuoterController = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../../../../../common/errors");
const blockchain_1 = require("../../../../../../../../../common/utils/blockchain");
const decorators_1 = require("../../../../../../../../../common/utils/decorators");
const object_1 = require("../../../../../../../../../common/utils/object");
const uniswap_v3_quoter_controller_1 = require("./uniswap-v3-quoter-controller");
const router_configuration_1 = require("../../../../mantle/fusionx/constants/router-configuration");
const quoter_contract_data_1 = require("../../../../mantle/fusionx/utils/quoter-controller/constants/quoter-contract-data");
class FusionXUniswapV3QuoterController extends uniswap_v3_quoter_controller_1.UniswapV3QuoterController {
    constructor(blockchain, routerConfiguration) {
        super(blockchain, routerConfiguration, quoter_contract_data_1.FUSIONX_QUOTER_CONTRACT_ADDRESS, quoter_contract_data_1.FUSIONX_QUOTER_CONTRACT_ABI, router_configuration_1.FUSIONX_UNISWAP_V3_FACTORY_CONTRACT_ADDRESS);
        this.feeAmounts = [100, 500, 10000];
    }
    /**
     * Returns swap method's name and arguments to pass it to Quoter contract.
     * @param poolsPath Pools, included in the route.
     * @param from From token.
     * @param to To token.
     * @param exact Is exact input or output trade.
     * @param weiAmount Amount of tokens to trade.
     */
    static getQuoterMethodData(poolsPath, from, to, exact, weiAmount) {
        if (poolsPath.length === 1 && poolsPath?.[0]) {
            const methodName = exact === 'input' ? 'quoteExactInputSingle' : 'quoteExactOutputSingle';
            const sqrtPriceLimitX96 = 0;
            return {
                poolsPath,
                methodData: {
                    methodName,
                    methodArguments: [
                        from.address,
                        to.address,
                        weiAmount,
                        poolsPath[0].fee,
                        sqrtPriceLimitX96
                    ]
                }
            };
        }
        const methodName = exact === 'input' ? 'quoteExactInput' : 'quoteExactOutput';
        const tokensPath = exact === 'input' ? poolsPath : poolsPath.reverse();
        const initialTokenAddress = exact === 'input' ? from.address : to.address;
        return {
            poolsPath,
            methodData: {
                methodName,
                methodArguments: [
                    uniswap_v3_quoter_controller_1.UniswapV3QuoterController.getEncodedPoolsPath(tokensPath, initialTokenAddress),
                    weiAmount
                ]
            }
        };
    }
    async getAllRoutes(from, to, exact, weiAmount, routeMaxTransitTokens) {
        const routesLiquidityPools = await this.getAllLiquidityPools(from, to);
        const options = {
            routesLiquidityPools,
            from,
            to,
            exact,
            weiAmount
        };
        const quoterMethodsData = [...Array(routeMaxTransitTokens + 1)]
            .map((_, maxTransitTokens) => this.getQuoterMethodsData({
            ...options,
            maxTransitTokens
        }, [], from.address))
            .flat();
        const results = await this.web3Public.multicallContractMethods(this.quoterContractAddress, this.quoterContractABI, quoterMethodsData.map(quoterMethodData => {
            if (quoterMethodData.methodData.methodName.toLowerCase().includes('single')) {
                return {
                    methodName: quoterMethodData.methodData.methodName,
                    methodArguments: [quoterMethodData.methodData.methodArguments]
                };
            }
            return quoterMethodData.methodData;
        }));
        return results
            .map((result, index) => {
            const pool = quoterMethodsData?.[index];
            if (!pool) {
                throw new errors_1.RubicSdkError('Pool has to be defined');
            }
            if (result.success) {
                return {
                    outputAbsoluteAmount: new bignumber_js_1.default(result?.output instanceof Object
                        ? result?.output?.returnedAmount
                        : result.output),
                    poolsPath: pool.poolsPath,
                    initialTokenAddress: from.address
                };
            }
            return null;
        })
            .filter(object_1.notNull);
    }
    /**
     * Returns swap methods' names and arguments, built with passed pools' addresses, to use it in Quoter contract.
     */
    getQuoterMethodsData(options, path, lastTokenAddress) {
        const { routesLiquidityPools, from, to, exact, weiAmount, maxTransitTokens } = options;
        if (path.length === maxTransitTokens) {
            const pools = routesLiquidityPools.filter(pool => pool.isPoolWithTokens(lastTokenAddress, to.address));
            return pools.map(pool => FusionXUniswapV3QuoterController.getQuoterMethodData(path.concat(pool), from, to, exact, weiAmount));
        }
        return routesLiquidityPools
            .filter(pool => !path.includes(pool))
            .map(pool => {
            const methodsData = [];
            if ((0, blockchain_1.compareAddresses)(pool.token0.address, lastTokenAddress)) {
                const extendedPath = path.concat(pool);
                methodsData.push(...this.getQuoterMethodsData(options, extendedPath, pool.token1.address));
            }
            if ((0, blockchain_1.compareAddresses)(pool.token1.address, lastTokenAddress)) {
                const extendedPath = path.concat(pool);
                methodsData.push(...this.getQuoterMethodsData(options, extendedPath, pool.token0.address));
            }
            return methodsData;
        })
            .flat();
    }
}
exports.FusionXUniswapV3QuoterController = FusionXUniswapV3QuoterController;
__decorate([
    decorators_1.Cache
], FusionXUniswapV3QuoterController, "getQuoterMethodData", null);
//# sourceMappingURL=fusionx-uniswap-v3-quoter-controller.js.map