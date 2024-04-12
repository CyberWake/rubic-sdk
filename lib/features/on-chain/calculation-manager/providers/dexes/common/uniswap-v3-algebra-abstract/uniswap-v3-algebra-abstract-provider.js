"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniswapV3AlgebraAbstractProvider = void 0;
const errors_1 = require("../../../../../../../common/errors");
const tokens_1 = require("../../../../../../../common/tokens");
const options_1 = require("../../../../../../../common/utils/options");
const web3_pure_1 = require("../../../../../../../core/blockchain/web3-pure/web3-pure");
const token_native_address_proxy_1 = require("../../../../../../common/utils/token-native-address-proxy");
const get_gas_fee_info_1 = require("../../../common/utils/get-gas-fee-info");
const evm_provider_default_options_1 = require("../on-chain-provider/evm-on-chain-provider/constants/evm-provider-default-options");
const evm_on_chain_provider_1 = require("../on-chain-provider/evm-on-chain-provider/evm-on-chain-provider");
const get_from_to_tokens_amounts_by_exact_1 = require("../utils/get-from-to-tokens-amounts-by-exact");
class UniswapV3AlgebraAbstractProvider extends evm_on_chain_provider_1.EvmOnChainProvider {
    constructor() {
        super(...arguments);
        this.isRubicOptimisationEnabled = false;
        this.defaultOptions = {
            ...evm_provider_default_options_1.evmProviderDefaultOptions,
            deadlineMinutes: 20,
            disableMultihops: false
        };
    }
    async calculate(from, toToken, options) {
        return this.calculateDifficultTrade(from, toToken, 'input', from.weiAmount, options);
    }
    /**
     * Calculates trade, based on amount, user wants to get.
     * @param fromToken Token to sell.
     * @param to Token to get with output amount.
     * @param options Additional options.
     */
    async calculateExactOutput(fromToken, to, options) {
        return this.calculateDifficultTrade(fromToken, to, 'output', to.weiAmount, options);
    }
    /**
     * Calculates input amount, based on amount, user wants to get.
     * @param fromToken Token to sell.
     * @param to Token to get with output amount.
     * @param options Additional options.
     */
    async calculateExactOutputAmount(fromToken, to, options) {
        return (await this.calculateExactOutput(fromToken, to, options)).from.tokenAmount;
    }
    async calculateDifficultTrade(fromToken, toToken, exact, weiAmount, options) {
        const fullOptions = (0, options_1.combineOptions)(options, this.defaultOptions);
        let weiAmountWithoutFee = weiAmount;
        let proxyFeeInfo;
        if (fullOptions.useProxy) {
            const proxyContractInfo = await this.handleProxyContract(new tokens_1.PriceTokenAmount({
                ...fromToken.asStruct,
                weiAmount
            }), fullOptions);
            weiAmountWithoutFee = proxyContractInfo.fromWithoutFee.weiAmount;
            proxyFeeInfo = proxyContractInfo.proxyFeeInfo;
        }
        const fromClone = (0, token_native_address_proxy_1.createTokenNativeAddressProxy)(fromToken, this.providerConfiguration.wethAddress);
        const toClone = (0, token_native_address_proxy_1.createTokenNativeAddressProxy)(toToken, this.providerConfiguration.wethAddress);
        let gasPriceInfo;
        if (fullOptions.gasCalculation !== 'disabled') {
            try {
                gasPriceInfo = await this.getGasPriceInfo();
            }
            catch { }
        }
        const { route, estimatedGas } = await this.getRoute(fromClone, toClone, exact, weiAmountWithoutFee, fullOptions, gasPriceInfo?.gasPriceInUsd);
        const { from, to, fromWithoutFee } = (0, get_from_to_tokens_amounts_by_exact_1.getFromToTokensAmountsByExact)(fromToken, toToken, exact, weiAmount, weiAmountWithoutFee, route.outputAbsoluteAmount);
        const tradeStruct = {
            from,
            to,
            gasFeeInfo: null,
            exact,
            slippageTolerance: fullOptions.slippageTolerance,
            deadlineMinutes: fullOptions.deadlineMinutes,
            useProxy: fullOptions.useProxy,
            proxyFeeInfo,
            fromWithoutFee,
            withDeflation: fullOptions.withDeflation,
            usedForCrossChain: fullOptions.usedForCrossChain
        };
        if (fullOptions.gasCalculation === 'disabled') {
            return this.createTradeInstance(tradeStruct, route, fullOptions.providerAddress);
        }
        const gasFeeInfo = (0, get_gas_fee_info_1.getGasFeeInfo)(estimatedGas, gasPriceInfo);
        return this.createTradeInstance({
            ...tradeStruct,
            gasFeeInfo
        }, route, fullOptions.providerAddress);
    }
    async getRoute(from, to, exact, weiAmount, options, gasPriceInUsd) {
        const routes = (await this.quoterController.getAllRoutes(from, to, exact, weiAmount.toFixed(0), options.disableMultihops ? 0 : this.providerConfiguration.maxTransitTokens)).sort((a, b) => b.outputAbsoluteAmount.comparedTo(a.outputAbsoluteAmount) *
            (exact === 'input' ? 1 : -1));
        if (routes.length === 0) {
            throw new errors_1.InsufficientLiquidityError();
        }
        if (options.gasCalculation === 'disabled' && routes?.[0]) {
            return {
                route: routes[0]
            };
        }
        if (this.isRubicOptimisationEnabled &&
            options.gasCalculation === 'rubicOptimisation' &&
            to.price?.isFinite() &&
            gasPriceInUsd) {
            const estimatedGasLimits = await this.OnChainTradeClass.estimateGasLimitForRoutes(from, to, exact, weiAmount, options, routes, this.createTradeInstance);
            const calculatedProfits = routes.map((route, index) => {
                const estimatedGas = estimatedGasLimits[index];
                if (!estimatedGas) {
                    throw new errors_1.RubicSdkError('Estimated gas has have to be defined');
                }
                const gasFeeInUsd = gasPriceInUsd.multipliedBy(estimatedGas);
                const profit = web3_pure_1.Web3Pure.fromWei(route.outputAbsoluteAmount, to.decimals)
                    .multipliedBy(to.price)
                    .minus(gasFeeInUsd);
                return {
                    route,
                    estimatedGas,
                    profit
                };
            });
            const sortedRoutes = calculatedProfits.sort((a, b) => b.profit.comparedTo(a.profit))[0];
            if (!sortedRoutes) {
                throw new errors_1.RubicSdkError('Sorted routes have to be defined');
            }
            return sortedRoutes;
        }
        const route = routes[0];
        if (!route) {
            throw new errors_1.RubicSdkError('Route has to be defined');
        }
        const estimatedGas = await this.OnChainTradeClass.estimateGasLimitForRoute(from, to, exact, weiAmount, options, route, this.createTradeInstance.bind(this));
        return {
            route,
            estimatedGas
        };
    }
}
exports.UniswapV3AlgebraAbstractProvider = UniswapV3AlgebraAbstractProvider;
//# sourceMappingURL=uniswap-v3-algebra-abstract-provider.js.map