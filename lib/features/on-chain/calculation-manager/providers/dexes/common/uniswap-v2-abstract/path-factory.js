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
exports.PathFactory = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../../../common/errors");
const tokens_1 = require("../../../../../../../common/tokens");
const decorators_1 = require("../../../../../../../common/utils/decorators");
const object_1 = require("../../../../../../../common/utils/object");
const evm_web3_pure_1 = require("../../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const web3_pure_1 = require("../../../../../../../core/blockchain/web3-pure/web3-pure");
const injector_1 = require("../../../../../../../core/injector/injector");
const get_from_to_tokens_amounts_by_exact_1 = require("../utils/get-from-to-tokens-amounts-by-exact");
const type_guards_1 = require("../../../../utils/type-guards");
class PathFactory {
    get walletAddress() {
        return injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(this.from.blockchain).address;
    }
    get stringWeiAmount() {
        return this.weiAmount.toFixed(0);
    }
    constructor(uniswapProviderStruct, pathFactoryStruct) {
        this.web3Public = injector_1.Injector.web3PublicService.getWeb3Public(pathFactoryStruct.from.blockchain);
        this.from = pathFactoryStruct.from;
        this.to = pathFactoryStruct.to;
        this.weiAmount = pathFactoryStruct.weiAmount;
        this.exact = pathFactoryStruct.exact;
        this.options = pathFactoryStruct.options;
        this.UniswapV2TradeClass = uniswapProviderStruct.UniswapV2TradeClass;
        this.routingProvidersAddresses =
            uniswapProviderStruct.providerSettings.routingProvidersAddresses;
        this.maxTransitTokens = pathFactoryStruct.options.disableMultihops
            ? 0
            : uniswapProviderStruct.providerSettings.maxTransitTokens;
        this.proxyFeeInfo = pathFactoryStruct.proxyFeeInfo;
    }
    async getAmountAndPath(gasPriceInUsd) {
        const allRoutes = await this.getAllRoutes();
        const sortedRoutes = allRoutes
            .filter(route => route.outputAbsoluteAmount.gt(0))
            .sort((a, b) => b.outputAbsoluteAmount.comparedTo(a.outputAbsoluteAmount) *
            (this.exact === 'input' ? 1 : -1));
        if (sortedRoutes.length === 0) {
            throw new errors_1.InsufficientLiquidityError();
        }
        if (this.options.gasCalculation === 'disabled') {
            if (!(0, type_guards_1.hasLengthAtLeast)(sortedRoutes, 1)) {
                throw new errors_1.RubicSdkError('Routes array length has to be bigger than 0');
            }
            return {
                route: sortedRoutes[0]
            };
        }
        if (this.options.gasCalculation === 'rubicOptimisation' &&
            this.to.price?.isFinite() &&
            gasPriceInUsd) {
            const gasLimits = this.getDefaultGases(sortedRoutes);
            if (this.walletAddress) {
                const gasRequests = await Promise.all(this.getGasRequests(sortedRoutes));
                const estimatedGasLimits = await this.web3Public.batchEstimatedGas(this.walletAddress, gasRequests);
                estimatedGasLimits.forEach((elem, index) => {
                    if (elem?.isFinite()) {
                        gasLimits[index] = elem;
                    }
                });
            }
            const routesWithProfit = sortedRoutes.map((route, index) => {
                const estimatedGas = gasLimits[index];
                if (!estimatedGas) {
                    throw new errors_1.RubicSdkError('Estimated gas has to be defined');
                }
                const gasFeeInUsd = estimatedGas.multipliedBy(gasPriceInUsd);
                let profit;
                if (this.exact === 'input') {
                    profit = web3_pure_1.Web3Pure.fromWei(route.outputAbsoluteAmount, this.to.decimals)
                        .multipliedBy(this.to.price)
                        .minus(gasFeeInUsd);
                }
                else {
                    profit = web3_pure_1.Web3Pure.fromWei(route.outputAbsoluteAmount, this.from.decimals)
                        .multipliedBy(this.from.price)
                        .multipliedBy(-1)
                        .minus(gasFeeInUsd);
                }
                return {
                    route,
                    estimatedGas,
                    profit
                };
            });
            const sortedByProfitRoutes = routesWithProfit.sort((a, b) => b.profit.comparedTo(a.profit));
            if (!sortedByProfitRoutes?.[0]) {
                throw new errors_1.RubicSdkError('Profit routes array length has to be bigger than 0');
            }
            return sortedByProfitRoutes[0];
        }
        let gasLimit = this.getDefaultGases(sortedRoutes.slice(0, 1))[0];
        if (this.walletAddress) {
            const callData = await this.getGasRequests(sortedRoutes.slice(0, 1))[0];
            if (!callData) {
                throw new errors_1.RubicSdkError('Call data has to be defined');
            }
            const estimatedGas = (await this.web3Public.batchEstimatedGas(this.walletAddress, [callData]))[0];
            if (estimatedGas?.isFinite()) {
                gasLimit = estimatedGas;
            }
        }
        if (!sortedRoutes?.[0]) {
            throw new errors_1.RubicSdkError('Routes length has to be bigger than 0');
        }
        return {
            route: sortedRoutes[0],
            estimatedGas: gasLimit
        };
    }
    getGasRequests(routes) {
        return this.getTradesByRoutes(routes).map(trade => trade.getEstimatedGasCallData());
    }
    getDefaultGases(routes) {
        return this.getTradesByRoutes(routes).map(trade => trade.getDefaultEstimatedGas());
    }
    getTradesByRoutes(routes) {
        return routes.map(route => {
            const { from, to, fromWithoutFee } = (0, get_from_to_tokens_amounts_by_exact_1.getFromToTokensAmountsByExact)(this.from, this.to, this.exact, this.weiAmount, this.weiAmount, route.outputAbsoluteAmount);
            return new this.UniswapV2TradeClass({
                from,
                to,
                path: route.path,
                routPoolInfo: route?.routPoolInfo,
                wrappedPath: route.path,
                exact: this.exact,
                deadlineMinutes: this.options.deadlineMinutes,
                slippageTolerance: this.options.slippageTolerance,
                gasFeeInfo: null,
                useProxy: this.options.useProxy,
                proxyFeeInfo: this.proxyFeeInfo,
                fromWithoutFee,
                withDeflation: { from: { isDeflation: false }, to: { isDeflation: false } }
            }, evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS);
        });
    }
    async getAllRoutes() {
        const transitTokens = await tokens_1.Token.createTokens(this.routingProvidersAddresses, this.from.blockchain);
        const vertexes = transitTokens.filter(elem => !elem.isEqualTo(this.from) && !elem.isEqualTo(this.to));
        const initialPath = [this.from];
        const routesPaths = [];
        const routesMethodArguments = [];
        const recGraphVisitor = (path, transitTokensLimit) => {
            if (path.length === transitTokensLimit + 1) {
                const finalPath = path.concat(this.to);
                routesPaths.push(finalPath);
                routesMethodArguments.push([
                    this.stringWeiAmount,
                    tokens_1.Token.tokensToAddresses(finalPath)
                ]);
                return;
            }
            vertexes
                .filter(vertex => path.every(token => !token.isEqualTo(vertex)))
                .forEach(vertex => {
                const extendedPath = path.concat(vertex);
                recGraphVisitor(extendedPath, transitTokensLimit);
            });
        };
        for (let i = 0; i <= this.maxTransitTokens; i++) {
            recGraphVisitor(initialPath, i);
        }
        const responses = await this.UniswapV2TradeClass.callForRoutes(this.from.blockchain, this.exact, routesMethodArguments);
        const tokens = responses.map((response, index) => {
            if (!response.success || !response.output) {
                return null;
            }
            const amounts = response.output;
            const numberAmount = this.exact === 'input' ? amounts[amounts.length - 1] : amounts[0];
            if (!numberAmount) {
                throw new errors_1.RubicSdkError('Amount has to be defined');
            }
            const outputAbsoluteAmount = new bignumber_js_1.default(numberAmount);
            const path = routesPaths?.[index];
            if (!path) {
                throw new errors_1.RubicSdkError('Path has to be defined');
            }
            return { outputAbsoluteAmount, path };
        });
        return tokens.filter(object_1.notNull);
    }
}
exports.PathFactory = PathFactory;
__decorate([
    decorators_1.Cache
], PathFactory.prototype, "stringWeiAmount", null);
//# sourceMappingURL=path-factory.js.map