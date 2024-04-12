"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniswapV3AlgebraAbstractTrade = void 0;
const errors_1 = require("../../../../../../../common/errors");
const options_1 = require("../../../../../../../common/utils/options");
const evm_web3_pure_1 = require("../../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const injector_1 = require("../../../../../../../core/injector/injector");
const evm_on_chain_trade_1 = require("../../../common/on-chain-trade/evm-on-chain-trade/evm-on-chain-trade");
const estimated_gas_1 = require("./constants/estimated-gas");
const get_from_to_tokens_amounts_by_exact_1 = require("../utils/get-from-to-tokens-amounts-by-exact");
class UniswapV3AlgebraAbstractTrade extends evm_on_chain_trade_1.EvmOnChainTrade {
    static get type() {
        throw new errors_1.RubicSdkError(`Static TRADE_TYPE getter is not implemented by ${this.name}`);
    }
    static async estimateGasLimitForRoute(fromToken, toToken, exact, weiAmount, options, route, createTradeInstance) {
        const { from, to } = (0, get_from_to_tokens_amounts_by_exact_1.getFromToTokensAmountsByExact)(fromToken, toToken, exact, weiAmount, weiAmount, route.outputAbsoluteAmount);
        const estimateGasParams = await this.getEstimateGasParams(from, to, exact, options, route, createTradeInstance);
        let gasLimit = estimateGasParams.defaultGasLimit;
        const walletAddress = injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(from.blockchain).address;
        if (walletAddress && estimateGasParams.callData) {
            const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(fromToken.blockchain);
            const estimatedGas = (await web3Public.batchEstimatedGas(walletAddress, [estimateGasParams.callData]))[0];
            if (estimatedGas?.isFinite()) {
                gasLimit = estimatedGas;
            }
        }
        return gasLimit;
    }
    static async estimateGasLimitForRoutes(fromToken, toToken, exact, weiAmount, options, routes, createTradeInstance) {
        const routesEstimateGasParams = await Promise.all(routes.map(route => {
            const { from, to } = (0, get_from_to_tokens_amounts_by_exact_1.getFromToTokensAmountsByExact)(fromToken, toToken, exact, weiAmount, weiAmount, route.outputAbsoluteAmount);
            return this.getEstimateGasParams(from, to, exact, options, route, createTradeInstance);
        }));
        const gasLimits = routesEstimateGasParams.map(estimateGasParams => estimateGasParams.defaultGasLimit);
        const walletAddress = injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(fromToken.blockchain).address;
        if (walletAddress &&
            routesEstimateGasParams.every(estimateGasParams => estimateGasParams.callData)) {
            const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(fromToken.blockchain);
            const estimatedGasLimits = await web3Public.batchEstimatedGas(walletAddress, routesEstimateGasParams.map(estimateGasParams => estimateGasParams.callData));
            estimatedGasLimits.forEach((elem, index) => {
                if (elem?.isFinite()) {
                    gasLimits[index] = elem;
                }
            });
        }
        return gasLimits;
    }
    static getEstimateGasParams(from, to, exact, options, route, createTradeInstance) {
        return createTradeInstance({
            from,
            to,
            exact,
            slippageTolerance: options.slippageTolerance,
            deadlineMinutes: options.deadlineMinutes
        }, route, evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS).getEstimateGasParams();
    }
    get type() {
        return this.constructor.type;
    }
    get deadlineMinutesTimestamp() {
        return (0, options_1.deadlineMinutesTimestamp)(this.deadlineMinutes);
    }
    get defaultEstimatedGas() {
        const estimatedGas = estimated_gas_1.DEFAULT_ESTIMATED_GAS[this.path.length - 2];
        if (!estimatedGas) {
            throw new errors_1.RubicSdkError('Default estimated gas has to be defined');
        }
        return estimatedGas.plus(this.to.isNative ? estimated_gas_1.WETH_TO_ETH_ESTIMATED_GAS : 0);
    }
    constructor(tradeStruct, providerAddress) {
        super(tradeStruct, providerAddress);
        this.exact = tradeStruct.exact;
        this.deadlineMinutes = tradeStruct.deadlineMinutes;
    }
    getAmountParams() {
        if (this.exact === 'input') {
            const amountOutMin = this.to.weiAmountMinusSlippage(this.slippageTolerance).toFixed(0);
            return [this.fromWithoutFee.stringWeiAmount, amountOutMin];
        }
        const amountInMax = this.fromWithoutFee
            .weiAmountPlusSlippage(this.slippageTolerance)
            .toFixed(0);
        return [this.to.stringWeiAmount, amountInMax];
    }
    async encodeDirect(options) {
        await this.checkFromAddress(options.fromAddress, true);
        await this.checkReceiverAddress(options.receiverAddress);
        const { methodName, methodArguments } = this.getSwapRouterMethodData(options.receiverAddress || options.fromAddress);
        const gasParams = this.getGasParams(options);
        return evm_web3_pure_1.EvmWeb3Pure.encodeMethodCall(this.dexContractAddress, this.contractAbi, methodName, methodArguments, this.fromWithoutFee.isNative ? this.fromWithoutFee.stringWeiAmount : '0', gasParams);
    }
    getSwapRouterMethodData(fromAddress) {
        if (!this.to.isNative) {
            const { methodName: exactInputMethodName, methodArguments: exactInputMethodArguments } = this.getSwapRouterExactInputMethodData(fromAddress || this.walletAddress);
            return {
                methodName: exactInputMethodName,
                methodArguments: exactInputMethodArguments
            };
        }
        const { methodName: exactInputMethodName, methodArguments: exactInputMethodArguments } = this.getSwapRouterExactInputMethodData(evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS);
        const exactInputMethodEncoded = evm_web3_pure_1.EvmWeb3Pure.encodeFunctionCall(this.contractAbi, exactInputMethodName, exactInputMethodArguments);
        const amountOutMin = this.to.weiAmountMinusSlippage(this.slippageTolerance).toFixed(0);
        const unwrapWETHMethodEncoded = evm_web3_pure_1.EvmWeb3Pure.encodeFunctionCall(this.contractAbi, this.unwrapWethMethodName, [amountOutMin, fromAddress || this.walletAddress]);
        return {
            methodName: 'multicall',
            methodArguments: [[exactInputMethodEncoded, unwrapWETHMethodEncoded]]
        };
    }
    /**
     * Returns encoded data of estimated gas function and default estimated gas.
     */
    async getEstimateGasParams() {
        try {
            const transactionConfig = await this.encode({ fromAddress: this.walletAddress });
            return {
                callData: transactionConfig,
                defaultGasLimit: this.defaultEstimatedGas
            };
        }
        catch (_err) {
            return {
                callData: null,
                defaultGasLimit: this.defaultEstimatedGas
            };
        }
    }
}
exports.UniswapV3AlgebraAbstractTrade = UniswapV3AlgebraAbstractTrade;
//# sourceMappingURL=uniswap-v3-algebra-abstract-trade.js.map