"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneinchTrade = void 0;
const errors_1 = require("../../../../../../../common/errors");
const native_tokens_1 = require("../../../../../../../common/tokens/constants/native-tokens");
const decorators_1 = require("../../../../../../../common/utils/decorators");
const errors_2 = require("../../../../../../../common/utils/errors");
const evm_web3_pure_1 = require("../../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const injector_1 = require("../../../../../../../core/injector/injector");
const token_native_address_proxy_1 = require("../../../../../../common/utils/token-native-address-proxy");
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const evm_on_chain_trade_1 = require("../../../common/on-chain-trade/evm-on-chain-trade/evm-on-chain-trade");
const constants_1 = require("./constants");
const utils_1 = require("./utils");
class OneinchTrade extends evm_on_chain_trade_1.EvmOnChainTrade {
    /** @internal */
    static async getGasLimit(tradeStruct) {
        const fromBlockchain = tradeStruct.from.blockchain;
        const walletAddress = injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(fromBlockchain).address;
        if (!walletAddress) {
            return null;
        }
        try {
            const transactionConfig = await new OneinchTrade(tradeStruct, evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS).encode({ fromAddress: walletAddress });
            const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(fromBlockchain);
            const gasLimit = (await web3Public.batchEstimatedGas(walletAddress, [transactionConfig]))[0];
            if (!gasLimit?.isFinite()) {
                return null;
            }
            return gasLimit;
        }
        catch (_err) {
            return null;
        }
    }
    /** @internal */
    static async checkIfNeedApproveAndThrowError(from, toToken, fromWithoutFee, fromAddress, useProxy) {
        const needApprove = await new OneinchTrade({
            from,
            to: toToken,
            fromWithoutFee,
            useProxy,
            path: [from, toToken]
        }, evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS).needApprove(fromAddress);
        if (needApprove) {
            throw new errors_1.RubicSdkError('Approve is needed');
        }
    }
    get type() {
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.ONE_INCH;
    }
    constructor(tradeStruct, providerAddress) {
        super(tradeStruct, providerAddress);
        this.dexContractAddress = tradeStruct.dexContractAddress;
        this.disableMultihops = tradeStruct.disableMultihops;
        this.transactionData = tradeStruct.data;
        this.availableProtocols = tradeStruct.availableProtocols;
        this.wrappedPath = (0, token_native_address_proxy_1.createTokenNativeAddressProxyInPathStartAndEnd)(this.path, constants_1.oneinchApiParams.nativeAddress);
        this.nativeSupportedFromWithoutFee = (0, token_native_address_proxy_1.createTokenNativeAddressProxy)(tradeStruct.fromWithoutFee, constants_1.oneinchApiParams.nativeAddress);
        this.nativeSupportedTo = (0, token_native_address_proxy_1.createTokenNativeAddressProxy)(tradeStruct.to, constants_1.oneinchApiParams.nativeAddress);
    }
    async encodeDirect(options) {
        await this.checkFromAddress(options.fromAddress, true);
        await this.checkReceiverAddress(options.receiverAddress);
        try {
            const txData = await this.getTradeData(true, options.fromAddress, options.receiverAddress, options?.directTransaction);
            const { gas, gasPrice } = this.getGasParams(options, {
                gasLimit: txData.gas,
                gasPrice: txData.gasPrice
            });
            return {
                ...txData,
                gas,
                gasPrice
            };
        }
        catch (err) {
            const inchSpecificError = this.specifyError(err);
            if (inchSpecificError) {
                throw inchSpecificError;
            }
            if ([400, 500, 503].includes(err.code)) {
                throw new errors_1.SwapRequestError();
            }
            if (this.isDeflationError()) {
                throw new errors_1.LowSlippageDeflationaryTokenError();
            }
            throw (0, errors_2.parseError)(err, err?.response?.data?.description || err.message);
        }
    }
    async getTradeData(disableEstimate = false, fromAddress, receiverAddress, directTransactionConfig) {
        if (directTransactionConfig) {
            return {
                data: directTransactionConfig.data,
                value: directTransactionConfig.value,
                to: directTransactionConfig.to,
                gasPrice: directTransactionConfig.gasPrice,
                gas: String(directTransactionConfig.gas)
            };
        }
        const fromTokenAddress = this.nativeSupportedFromWithoutFee.address;
        const toTokenAddress = this.nativeSupportedTo.address;
        const swapRequest = {
            params: {
                src: fromTokenAddress,
                dst: toTokenAddress,
                amount: this.nativeSupportedFromWithoutFee.stringWeiAmount,
                slippage: (this.slippageTolerance * 100).toString(),
                from: fromAddress || this.walletAddress,
                disableEstimate,
                ...(this.disableMultihops && {
                    connectorTokens: `${fromTokenAddress},${toTokenAddress}`
                }),
                ...(receiverAddress && { receiver: receiverAddress }),
                ...(this.availableProtocols && { protocols: this.availableProtocols })
            }
        };
        const { tx, toAmount } = await this.getResponseFromApiToTransactionRequest(swapRequest);
        this.checkAmountChange({
            data: tx.data,
            value: tx.value,
            to: tx.to
        }, toAmount, this.to.stringWeiAmount);
        return {
            data: tx.data,
            value: tx.value,
            to: tx.to,
            gasPrice: tx.gasPrice,
            gas: String(tx.gas)
        };
    }
    async getResponseFromApiToTransactionRequest(params) {
        return (0, utils_1.oneInchHttpGetRequest)('swap', this.from.blockchain, params);
    }
    specifyError(err) {
        const inchError = err?.error || err;
        if (inchError) {
            if ('message' in inchError) {
                if (inchError.message?.includes('cannot estimate')) {
                    const nativeToken = native_tokens_1.nativeTokensList[this.from.blockchain]?.symbol;
                    const message = `1inch sets increased costs on gas fee. For transaction enter less ${nativeToken} amount or top up your ${nativeToken} balance.`;
                    return new errors_1.RubicSdkError(message);
                }
                if (inchError.message?.includes('insufficient funds for transfer')) {
                    return new errors_1.InsufficientFundsOneinchError(this.from.blockchain);
                }
            }
            if ('description' in inchError && inchError.description?.includes('cannot estimate')) {
                return new errors_1.LowSlippageError();
            }
        }
        return null;
    }
}
exports.OneinchTrade = OneinchTrade;
__decorate([
    (0, decorators_1.Cache)({
        maxAge: 15000
    })
], OneinchTrade.prototype, "getResponseFromApiToTransactionRequest", null);
//# sourceMappingURL=oneinch-trade.js.map