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
exports.SquidrouterCrossChainTrade = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../common/errors");
const decorators_1 = require("../../../../../common/utils/decorators");
const errors_2 = require("../../../../../common/utils/errors");
const evm_web3_pure_1 = require("../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const web3_pure_1 = require("../../../../../core/blockchain/web3-pure/web3-pure");
const injector_1 = require("../../../../../core/injector/injector");
const cross_chain_trade_type_1 = require("../../models/cross-chain-trade-type");
const rubic_proxy_contract_address_1 = require("../common/constants/rubic-proxy-contract-address");
const evm_common_cross_chain_abi_1 = require("../common/emv-cross-chain-trade/constants/evm-common-cross-chain-abi");
const gateway_rubic_cross_chain_abi_1 = require("../common/emv-cross-chain-trade/constants/gateway-rubic-cross-chain-abi");
const evm_cross_chain_trade_1 = require("../common/emv-cross-chain-trade/evm-cross-chain-trade");
const bridge_type_1 = require("../common/models/bridge-type");
const proxy_cross_chain_evm_trade_1 = require("../common/proxy-cross-chain-evm-facade/proxy-cross-chain-evm-trade");
const squidrouter_contract_address_1 = require("./constants/squidrouter-contract-address");
const squidrouter_cross_chain_provider_1 = require("./squidrouter-cross-chain-provider");
const convert_gas_price_1 = require("../../utils/convert-gas-price");
/**
 * Calculated DeBridge cross-chain trade.
 */
class SquidrouterCrossChainTrade extends evm_cross_chain_trade_1.EvmCrossChainTrade {
    /** @internal */
    static async getGasData(from, toToken, transactionRequest, feeInfo, receiverAddress, providerAddress) {
        const fromBlockchain = from.blockchain;
        const walletAddress = injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(fromBlockchain).address;
        if (!walletAddress) {
            return null;
        }
        try {
            let gasLimit;
            let gasDetails;
            const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(fromBlockchain);
            if (feeInfo.rubicProxy?.fixedFee?.amount.gt(0)) {
                const { contractAddress, contractAbi, methodName, methodArguments, value } = await new SquidrouterCrossChainTrade({
                    from,
                    to: toToken,
                    gasData: null,
                    priceImpact: 0,
                    allowanceTarget: '',
                    slippage: 0,
                    feeInfo,
                    transitUSDAmount: new bignumber_js_1.default(NaN),
                    cryptoFeeToken: from,
                    onChainTrade: null,
                    onChainSubtype: { from: undefined, to: undefined },
                    transactionRequest
                }, providerAddress || evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS, []).getContractParams({}, true);
                const [proxyGasLimit, proxyGasDetails] = await Promise.all([
                    web3Public.getEstimatedGas(contractAbi, contractAddress, methodName, methodArguments, walletAddress, value),
                    (0, convert_gas_price_1.convertGasDataToBN)(await injector_1.Injector.gasPriceApi.getGasPrice(from.blockchain))
                ]);
                gasLimit = proxyGasLimit;
                gasDetails = proxyGasDetails;
            }
            else {
                const { data, value, to } = await new SquidrouterCrossChainTrade({
                    from,
                    to: toToken,
                    gasData: null,
                    priceImpact: 0,
                    allowanceTarget: '',
                    slippage: 0,
                    feeInfo,
                    transitUSDAmount: new bignumber_js_1.default(NaN),
                    cryptoFeeToken: from,
                    onChainTrade: null,
                    onChainSubtype: { from: undefined, to: undefined },
                    transactionRequest
                }, providerAddress || evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS, []).getTransactionRequest(receiverAddress, null, true);
                const defaultGasLimit = await web3Public.getEstimatedGasByData(walletAddress, to, {
                    data,
                    value
                });
                const defaultGasDetails = (0, convert_gas_price_1.convertGasDataToBN)(await injector_1.Injector.gasPriceApi.getGasPrice(from.blockchain));
                gasLimit = defaultGasLimit;
                gasDetails = defaultGasDetails;
            }
            if (!gasLimit?.isFinite()) {
                return null;
            }
            const increasedGasLimit = web3_pure_1.Web3Pure.calculateGasMargin(gasLimit, 1.2);
            return {
                gasLimit: increasedGasLimit,
                ...gasDetails
            };
        }
        catch (_err) {
            return null;
        }
    }
    get fromBlockchain() {
        return this.from.blockchain;
    }
    get fromContractAddress() {
        return this.isProxyTrade
            ? rubic_proxy_contract_address_1.rubicProxyContractAddress[this.fromBlockchain].gateway
            : squidrouter_contract_address_1.SquidrouterContractAddress[this.fromBlockchain].providerGateway;
    }
    get methodName() {
        return 'startBridgeTokensViaGenericCrossChain';
    }
    constructor(crossChainTrade, providerAddress, routePath) {
        super(providerAddress, routePath);
        this.type = cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.SQUIDROUTER;
        this.isAggregator = false;
        this.onChainSubtype = {
            from: undefined,
            to: undefined
        };
        this.bridgeType = bridge_type_1.BRIDGE_TYPE.SQUIDROUTER;
        this.from = crossChainTrade.from;
        this.to = crossChainTrade.to;
        this.gasData = crossChainTrade.gasData;
        this.priceImpact = crossChainTrade.priceImpact;
        this.allowanceTarget = crossChainTrade.allowanceTarget;
        this.slippage = crossChainTrade.slippage;
        this.onChainTrade = crossChainTrade.onChainTrade;
        this.toTokenAmountMin = this.to.tokenAmount.multipliedBy(1 - crossChainTrade.slippage);
        this.feeInfo = crossChainTrade.feeInfo;
        this.cryptoFeeToken = crossChainTrade.cryptoFeeToken;
        this.onChainSubtype = crossChainTrade.onChainSubtype;
        this.transactionRequest = crossChainTrade.transactionRequest;
        this.transitUSDAmount = crossChainTrade.transitUSDAmount;
    }
    async swapDirect(options = {}) {
        this.checkWalletConnected();
        await this.checkAllowanceAndApprove(options);
        let transactionHash;
        try {
            const { data, value, to } = await this.getTransactionRequest(options?.receiverAddress || this.walletAddress, options?.directTransaction);
            const { onConfirm } = options;
            const onTransactionHash = (hash) => {
                if (onConfirm) {
                    onConfirm(hash);
                }
                transactionHash = hash;
            };
            await this.web3Private.trySendTransaction(to, {
                onTransactionHash,
                data,
                value,
                gas: options.gasLimit,
                gasPriceOptions: options.gasPriceOptions
            });
            return transactionHash;
        }
        catch (err) {
            if (err instanceof errors_1.FailedToCheckForTransactionReceiptError) {
                return transactionHash;
            }
            throw (0, errors_2.parseError)(err);
        }
    }
    async getContractParams(options, skipAmountChangeCheck = false) {
        const { data, value: providerValue, to } = await this.getTransactionRequest(options?.receiverAddress || this.walletAddress, options?.directTransaction, skipAmountChangeCheck);
        const bridgeData = proxy_cross_chain_evm_trade_1.ProxyCrossChainEvmTrade.getBridgeData(options, {
            walletAddress: this.walletAddress,
            fromTokenAmount: this.from,
            toTokenAmount: this.to,
            srcChainTrade: this.onChainTrade,
            providerAddress: this.providerAddress,
            type: `native:${this.type}`,
            fromAddress: this.walletAddress
        });
        const extraNativeFee = this.from.isNative
            ? new bignumber_js_1.default(providerValue).minus(this.from.stringWeiAmount).toFixed()
            : new bignumber_js_1.default(providerValue).toFixed();
        const providerData = await proxy_cross_chain_evm_trade_1.ProxyCrossChainEvmTrade.getGenericProviderData(to, data, this.fromBlockchain, to, extraNativeFee);
        const methodArguments = [bridgeData, providerData];
        const value = this.getSwapValue(providerValue);
        const transactionConfiguration = evm_web3_pure_1.EvmWeb3Pure.encodeMethodCall(rubic_proxy_contract_address_1.rubicProxyContractAddress[this.from.blockchain].router, evm_common_cross_chain_abi_1.evmCommonCrossChainAbi, this.methodName, methodArguments, value);
        const sendingToken = this.from.isNative ? [] : [this.from.address];
        const sendingAmount = this.from.isNative ? [] : [this.from.stringWeiAmount];
        return {
            contractAddress: rubic_proxy_contract_address_1.rubicProxyContractAddress[this.from.blockchain].gateway,
            contractAbi: gateway_rubic_cross_chain_abi_1.gatewayRubicCrossChainAbi,
            methodName: 'startViaRubic',
            methodArguments: [sendingToken, sendingAmount, transactionConfiguration.data],
            value
        };
    }
    getTradeAmountRatio(fromUsd) {
        const usdCryptoFee = this.cryptoFeeToken.price.multipliedBy(this.cryptoFeeToken.tokenAmount);
        return fromUsd.plus(usdCryptoFee.isNaN() ? 0 : usdCryptoFee).dividedBy(this.to.tokenAmount);
    }
    getTradeInfo() {
        return {
            estimatedGas: this.estimatedGas,
            feeInfo: this.feeInfo,
            priceImpact: this.priceImpact ?? null,
            slippage: this.slippage * 100,
            routePath: this.routePath
        };
    }
    async getTransactionRequest(receiverAddress, transactionConfig, skipAmountChangeCheck = false) {
        if (transactionConfig) {
            return {
                data: transactionConfig.data,
                value: transactionConfig.value,
                to: transactionConfig.to
            };
        }
        const requestParams = {
            ...this.transactionRequest,
            toAddress: receiverAddress
        };
        const { route: { transactionRequest, estimate: routeEstimate } } = await SquidrouterCrossChainTrade.getResponseFromApiToTransactionRequest(requestParams);
        if (!skipAmountChangeCheck) {
            this.checkAmountChange({
                data: transactionRequest.data,
                value: transactionRequest.value,
                to: transactionRequest.targetAddress
            }, routeEstimate.toAmount, this.to.stringWeiAmount);
        }
        return {
            data: transactionRequest.data,
            value: transactionRequest.value,
            to: transactionRequest.targetAddress
        };
    }
    static async getResponseFromApiToTransactionRequest(requestParams) {
        return injector_1.Injector.httpClient.get(`${squidrouter_cross_chain_provider_1.SquidrouterCrossChainProvider.apiEndpoint}route`, {
            params: requestParams,
            headers: {
                'x-integrator-id': 'rubic-api'
            }
        });
    }
}
exports.SquidrouterCrossChainTrade = SquidrouterCrossChainTrade;
__decorate([
    (0, decorators_1.Cache)({
        maxAge: 15000
    })
], SquidrouterCrossChainTrade, "getResponseFromApiToTransactionRequest", null);
//# sourceMappingURL=squidrouter-cross-chain-trade.js.map