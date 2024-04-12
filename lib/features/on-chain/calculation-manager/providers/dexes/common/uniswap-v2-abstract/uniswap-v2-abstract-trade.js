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
exports.UniswapV2AbstractTrade = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../../../common/errors");
const decorators_1 = require("../../../../../../../common/utils/decorators");
const errors_2 = require("../../../../../../../common/utils/errors");
const functions_1 = require("../../../../../../../common/utils/functions");
const options_1 = require("../../../../../../../common/utils/options");
const evm_web3_pure_1 = require("../../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const injector_1 = require("../../../../../../../core/injector/injector");
const evm_on_chain_trade_1 = require("../../../common/on-chain-trade/evm-on-chain-trade/evm-on-chain-trade");
const default_estimated_gas_1 = require("./constants/default-estimated-gas");
const SWAP_METHOD_1 = require("./constants/SWAP_METHOD");
const uniswap_v2_abi_1 = require("./constants/uniswap-v2-abi");
class UniswapV2AbstractTrade extends evm_on_chain_trade_1.EvmOnChainTrade {
    /** @internal */
    static getDexContractAddress(blockchain) {
        // see https://github.com/microsoft/TypeScript/issues/34516
        // @ts-ignore
        const instance = new this({
            from: { blockchain },
            wrappedPath: [{ isNative: () => false }, { isNative: () => false }]
        }, false);
        if (!instance.dexContractAddress) {
            throw new errors_1.RubicSdkError('Trying to read abstract class field');
        }
        return instance.dexContractAddress;
    }
    static get type() {
        throw new errors_1.RubicSdkError(`Static TRADE_TYPE getter is not implemented by ${this.name}`);
    }
    static callForRoutes(blockchain, exact, routesMethodArguments) {
        const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(blockchain);
        const methodName = exact === 'input' ? 'getAmountsOut' : 'getAmountsIn';
        return web3Public.multicallContractMethod(this.getDexContractAddress(blockchain), this.contractAbi, methodName, routesMethodArguments);
    }
    get type() {
        return this.constructor.type;
    }
    get deadlineMinutesTimestamp() {
        return (0, options_1.deadlineMinutesTimestamp)(this.deadlineMinutes);
    }
    get nativeValueToSend() {
        if (this.from.isNative) {
            return this.getAmountInAndAmountOut().amountIn;
        }
        return '0';
    }
    get regularSwapMethod() {
        return this.constructor.swapMethods[this.exact][this.regularSwapMethodKey];
    }
    get supportedFeeSwapMethod() {
        return this.constructor.swapMethods[this.exact][SWAP_METHOD_1.SUPPORTING_FEE_SWAP_METHODS_MAPPING[this.regularSwapMethodKey]];
    }
    get regularSwapMethodKey() {
        if (this.from.isNative) {
            return 'ETH_TO_TOKENS';
        }
        if (this.to.isNative) {
            return 'TOKENS_TO_ETH';
        }
        return 'TOKENS_TO_TOKENS';
    }
    constructor(tradeStruct, providerAddress) {
        super(tradeStruct, providerAddress);
        this.deadlineMinutes = tradeStruct.deadlineMinutes;
        this.exact = tradeStruct.exact;
        this.wrappedPath = tradeStruct.wrappedPath;
        this.routPoolInfo = tradeStruct.routPoolInfo;
    }
    getAmountInAndAmountOut() {
        let amountIn = this.fromWithoutFee.stringWeiAmount;
        let amountOut = this.toTokenAmountMin.stringWeiAmount;
        if (this.exact === 'output') {
            amountIn = this.fromWithoutFee.weiAmountPlusSlippage(this.slippageTolerance).toFixed(0);
            amountOut = this.to.stringWeiAmount;
        }
        return { amountIn, amountOut };
    }
    async encodeDirect(options) {
        await this.checkFromAddress(options.fromAddress, true);
        await this.checkReceiverAddress(options.receiverAddress);
        if (options.supportFee === undefined) {
            const needApprove = await this.needApprove(options.fromAddress);
            if (needApprove) {
                throw new errors_1.RubicSdkError('To use `encode` function, token must be approved for wallet');
            }
            try {
                await this.checkBalance();
            }
            catch (_err) {
                throw new errors_1.RubicSdkError('To use `encode` function, wallet must have enough balance or you must provider `supportFee` parameter in options.');
            }
        }
        try {
            const methodName = await this.getMethodName(options, options.fromAddress, options.supportFee);
            const gasParams = this.getGasParams(options);
            return evm_web3_pure_1.EvmWeb3Pure.encodeMethodCall(this.dexContractAddress, this.constructor.contractAbi, methodName, this.getCallParameters(options.receiverAddress || options.fromAddress), this.nativeValueToSend, gasParams);
        }
        catch (err) {
            if (this.isDeflationError()) {
                throw new errors_1.LowSlippageDeflationaryTokenError();
            }
            throw (0, errors_2.parseError)(err);
        }
    }
    getCallParameters(receiverAddress) {
        const { amountIn, amountOut } = this.getAmountInAndAmountOut();
        const amountParameters = this.from.isNative ? [amountOut] : [amountIn, amountOut];
        return [
            ...amountParameters,
            this.wrappedPath.map(t => t.address),
            receiverAddress || this.walletAddress,
            this.deadlineMinutesTimestamp
        ];
    }
    async getMethodName(options, fromAddress, supportFee) {
        if (supportFee === false) {
            return this.regularSwapMethod;
        }
        if (supportFee === true) {
            return this.supportedFeeSwapMethod;
        }
        const regularParameters = this.getSwapParametersByMethod(this.regularSwapMethod, options);
        const supportedFeeParameters = this.getSwapParametersByMethod(this.supportedFeeSwapMethod, options);
        const regularMethodResult = await (0, functions_1.tryExecuteAsync)(this.web3Public.callContractMethod, this.convertSwapParametersToCallParameters(regularParameters, fromAddress));
        const feeMethodResult = await (0, functions_1.tryExecuteAsync)(this.web3Public.callContractMethod, this.convertSwapParametersToCallParameters(supportedFeeParameters, fromAddress));
        if (regularMethodResult.success) {
            if (feeMethodResult.success) {
                return this.regularSwapMethod;
            }
            throw new errors_1.LowSlippageDeflationaryTokenError();
        }
        if (feeMethodResult.success) {
            return this.supportedFeeSwapMethod;
        }
        throw (0, errors_2.parseError)(regularMethodResult.error);
    }
    getSwapParametersByMethod(method, options) {
        const value = this.nativeValueToSend;
        return [
            this.dexContractAddress,
            this.constructor.contractAbi,
            method,
            this.getCallParameters(options?.receiverAddress),
            { value }
        ];
    }
    convertSwapParametersToCallParameters(parameters, fromAddress) {
        return parameters.slice(0, 4).concat([
            {
                from: fromAddress || this.walletAddress,
                ...(parameters[4]?.value && { value: parameters[4]?.value })
            }
        ]);
    }
    /** @internal */
    async getEstimatedGasCallData() {
        return this.encode({ fromAddress: this.walletAddress, supportFee: false });
    }
    /** @internal */
    getDefaultEstimatedGas() {
        const transitTokensNumber = this.wrappedPath.length - 2;
        let methodName = 'tokensToTokens';
        if (this.from.isNative) {
            methodName = 'ethToTokens';
        }
        if (this.to.isNative) {
            methodName = 'tokensToEth';
        }
        const constructor = this.constructor;
        const gasLimitAmount = constructor.defaultEstimatedGasInfo[methodName]?.[transitTokensNumber];
        if (!gasLimitAmount) {
            throw new errors_1.RubicSdkError('Gas limit has to be defined');
        }
        const gasLimit = gasLimitAmount.toFixed(0);
        return new bignumber_js_1.default(gasLimit);
    }
}
exports.UniswapV2AbstractTrade = UniswapV2AbstractTrade;
/** @internal */
UniswapV2AbstractTrade.contractAbi = uniswap_v2_abi_1.defaultUniswapV2Abi;
/** @internal */
UniswapV2AbstractTrade.swapMethods = SWAP_METHOD_1.SWAP_METHOD;
/** @internal */
UniswapV2AbstractTrade.defaultEstimatedGasInfo = default_estimated_gas_1.defaultEstimatedGas;
__decorate([
    decorators_1.Cache
], UniswapV2AbstractTrade, "getDexContractAddress", null);
//# sourceMappingURL=uniswap-v2-abstract-trade.js.map