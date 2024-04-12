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
exports.UniswapV3QuoterController = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../../../../../common/errors");
const tokens_1 = require("../../../../../../../../../common/tokens");
const blockchain_1 = require("../../../../../../../../../common/utils/blockchain");
const cache_decorator_1 = require("../../../../../../../../../common/utils/decorators/cache-decorator/cache.decorator");
const object_1 = require("../../../../../../../../../common/utils/object");
const evm_web3_pure_1 = require("../../../../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const injector_1 = require("../../../../../../../../../core/injector/injector");
const factory_contract_data_1 = require("./constants/factory-contract-data");
const quoter_contract_data_1 = require("./constants/quoter-contract-data");
const liquidity_pool_1 = require("./models/liquidity-pool");
const uniswap_v3_algebra_quoter_controller_1 = require("../../../uniswap-v3-algebra-abstract/models/uniswap-v3-algebra-quoter-controller");
/**
 * Works with requests, related to Uniswap v3 liquidity pools.
 */
class UniswapV3QuoterController extends uniswap_v3_algebra_quoter_controller_1.UniswapV3AlgebraQuoterController {
    /**
     * Converts uni v3 route to encoded bytes string to pass it to contract.
     * Structure of encoded string: '0x${tokenAddress_0}${toHex(fee_0)}${tokenAddress_1}${toHex(fee_1)}...${tokenAddress_n}.
     * toHex(fee_i) must be of length 6, so leading zeroes are added.
     * @param pools Liquidity pools, included in route.
     * @param initialTokenAddress From token address.
     * @returns string Encoded string.
     */
    static getEncodedPoolsPath(pools, initialTokenAddress) {
        let contractPath = initialTokenAddress.slice(2).toLowerCase();
        let lastTokenAddress = initialTokenAddress;
        pools.forEach(pool => {
            contractPath += pool.fee.toString(16).padStart(6, '0');
            const newToken = (0, blockchain_1.compareAddresses)(pool.token0.address, lastTokenAddress)
                ? pool.token1
                : pool.token0;
            contractPath += newToken.address.slice(2).toLowerCase();
            lastTokenAddress = newToken.address;
        });
        return `0x${contractPath}`;
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
                        poolsPath[0].fee,
                        weiAmount,
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
                    UniswapV3QuoterController.getEncodedPoolsPath(tokensPath, initialTokenAddress),
                    weiAmount
                ]
            }
        };
    }
    get web3Public() {
        return injector_1.Injector.web3PublicService.getWeb3Public(this.blockchain);
    }
    constructor(blockchain, routerConfiguration, quoterContractAddress = quoter_contract_data_1.UNISWAP_V3_QUOTER_CONTRACT_ADDRESS, quoterContractABI = quoter_contract_data_1.UNISWAP_V3_QUOTER_CONTRACT_ABI, factoryAddress = factory_contract_data_1.FACTORY_CONTRACT_ADDRESS) {
        super();
        this.blockchain = blockchain;
        this.routerConfiguration = routerConfiguration;
        this.quoterContractAddress = quoterContractAddress;
        this.quoterContractABI = quoterContractABI;
        this.factoryAddress = factoryAddress;
        this.feeAmounts = [500, 3000, 10000];
    }
    async getOrCreateRouterTokensAndLiquidityPools() {
        if (!this.routerTokens || !this.routerLiquidityPools) {
            const tokens = await tokens_1.Token.createTokens(Object.values(this.routerConfiguration.tokens), this.blockchain);
            const liquidityPools = this.routerConfiguration.liquidityPools.map(liquidityPool => {
                const tokenA = tokens.find(token => token.symbol === liquidityPool.tokenSymbolA);
                const tokenB = tokens.find(token => token.symbol === liquidityPool.tokenSymbolB);
                return new liquidity_pool_1.LiquidityPool(liquidityPool.poolAddress, tokenA, tokenB, liquidityPool.fee);
            });
            this.routerTokens = tokens;
            this.routerLiquidityPools = liquidityPools;
        }
        return {
            routerTokens: this.routerTokens,
            routerLiquidityPools: this.routerLiquidityPools
        };
    }
    /**
     * Returns all liquidity pools, containing passed tokens addresses, and concatenates with most popular pools.
     */
    async getAllLiquidityPools(firstToken, secondToken) {
        const { routerTokens, routerLiquidityPools } = await this.getOrCreateRouterTokensAndLiquidityPools();
        let getPoolsMethodArguments = [];
        getPoolsMethodArguments.push(...Object.values(routerTokens)
            .filter(routerToken => !routerToken.isEqualToTokens([firstToken, secondToken]))
            .map(routerToken => this.feeAmounts
            .map(fee => [
            { tokenA: firstToken, tokenB: routerToken, fee },
            { tokenA: secondToken, tokenB: routerToken, fee }
        ])
            .flat())
            .flat());
        getPoolsMethodArguments.push(...this.feeAmounts.map(fee => ({
            tokenA: firstToken,
            tokenB: secondToken,
            fee
        })));
        getPoolsMethodArguments = getPoolsMethodArguments.filter(methodArguments => !routerLiquidityPools.find(pool => pool.isPoolWithTokens(methodArguments.tokenA.address, methodArguments.tokenB.address) && pool.fee === methodArguments.fee));
        const poolsAddresses = (await this.web3Public.multicallContractMethod(this.factoryAddress, factory_contract_data_1.FACTORY_CONTRACT_ABI, 'getPool', getPoolsMethodArguments.map(methodArguments => [
            methodArguments.tokenA.address,
            methodArguments.tokenB.address,
            methodArguments.fee
        ]))).map(result => result.output);
        return poolsAddresses
            .map((poolAddress, index) => {
            const poolMethodArguments = getPoolsMethodArguments?.[index];
            if (!poolMethodArguments) {
                throw new errors_1.RubicSdkError('Method arguments array for pool has to be defined');
            }
            if (!evm_web3_pure_1.EvmWeb3Pure.isEmptyAddress(poolAddress)) {
                return new liquidity_pool_1.LiquidityPool(poolAddress, poolMethodArguments.tokenA, poolMethodArguments.tokenB, poolMethodArguments.fee);
            }
            return null;
        })
            .filter(object_1.notNull)
            .concat(routerLiquidityPools);
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
        return this.web3Public
            .multicallContractMethods(this.quoterContractAddress, this.quoterContractABI, quoterMethodsData.map(quoterMethodData => quoterMethodData.methodData))
            .then(results => {
            return results
                .map((result, index) => {
                const pool = quoterMethodsData?.[index];
                if (!pool) {
                    throw new errors_1.RubicSdkError('Pool has to be defined');
                }
                if (result.success) {
                    return {
                        outputAbsoluteAmount: new bignumber_js_1.default(result.output),
                        poolsPath: pool.poolsPath,
                        initialTokenAddress: from.address
                    };
                }
                return null;
            })
                .filter(object_1.notNull);
        });
    }
    /**
     * Returns swap methods' names and arguments, built with passed pools' addresses, to use it in Quoter contract.
     */
    getQuoterMethodsData(options, path, lastTokenAddress) {
        const { routesLiquidityPools, from, to, exact, weiAmount, maxTransitTokens } = options;
        if (path.length === maxTransitTokens) {
            const pools = routesLiquidityPools.filter(pool => pool.isPoolWithTokens(lastTokenAddress, to.address));
            return pools.map(pool => UniswapV3QuoterController.getQuoterMethodData(path.concat(pool), from, to, exact, weiAmount));
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
exports.UniswapV3QuoterController = UniswapV3QuoterController;
__decorate([
    (0, cache_decorator_1.Cache)({
        maxAge: 1000 * 60 * 10
    })
], UniswapV3QuoterController.prototype, "getAllLiquidityPools", null);
__decorate([
    cache_decorator_1.Cache
], UniswapV3QuoterController, "getEncodedPoolsPath", null);
__decorate([
    cache_decorator_1.Cache
], UniswapV3QuoterController, "getQuoterMethodData", null);
//# sourceMappingURL=uniswap-v3-quoter-controller.js.map