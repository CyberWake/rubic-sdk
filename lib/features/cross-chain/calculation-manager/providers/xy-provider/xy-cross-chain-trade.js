"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XyCrossChainTrade = void 0;
const decorators_1 = require("../../../../../common/utils/decorators");
const evm_web3_pure_1 = require("../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const web3_pure_1 = require("../../../../../core/blockchain/web3-pure/web3-pure");
const injector_1 = require("../../../../../core/injector/injector");
const xy_api_params_1 = require("../../../../common/providers/xy/constants/xy-api-params");
const xy_utils_1 = require("../../../../common/providers/xy/utils/xy-utils");
const cross_chain_trade_type_1 = require("../../models/cross-chain-trade-type");
const rubic_proxy_contract_address_1 = require("../common/constants/rubic-proxy-contract-address");
const evm_common_cross_chain_abi_1 = require("../common/emv-cross-chain-trade/constants/evm-common-cross-chain-abi");
const gateway_rubic_cross_chain_abi_1 = require("../common/emv-cross-chain-trade/constants/gateway-rubic-cross-chain-abi");
const evm_cross_chain_trade_1 = require("../common/emv-cross-chain-trade/evm-cross-chain-trade");
const bridge_type_1 = require("../common/models/bridge-type");
const proxy_cross_chain_evm_trade_1 = require("../common/proxy-cross-chain-evm-facade/proxy-cross-chain-evm-trade");
const xy_contract_address_1 = require("./constants/xy-contract-address");
const convert_gas_price_1 = require("../../utils/convert-gas-price");
/**
 * Calculated XY cross-chain trade.
 */
class XyCrossChainTrade extends evm_cross_chain_trade_1.EvmCrossChainTrade {
    /** @internal */
    static async getGasData(from, toToken, transactionRequest, feeInfo, providerAddress) {
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
                const { contractAddress, contractAbi, methodName, methodArguments, value } = await new XyCrossChainTrade({
                    from,
                    to: toToken,
                    transactionRequest,
                    gasData: null,
                    priceImpact: 0,
                    slippage: 0,
                    feeInfo,
                    onChainTrade: null
                }, providerAddress || evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS, []).getContractParams({}, true);
                const [proxyGasLimit, proxyGasDetails] = await Promise.all([
                    web3Public.getEstimatedGas(contractAbi, contractAddress, methodName, methodArguments, walletAddress, value),
                    (0, convert_gas_price_1.convertGasDataToBN)(await injector_1.Injector.gasPriceApi.getGasPrice(from.blockchain))
                ]);
                gasLimit = proxyGasLimit;
                gasDetails = proxyGasDetails;
            }
            else {
                const { data, value, to } = await new XyCrossChainTrade({
                    from,
                    to: toToken,
                    transactionRequest,
                    gasData: null,
                    priceImpact: 0,
                    slippage: 0,
                    feeInfo,
                    onChainTrade: null
                }, providerAddress || evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS, []).getTransactionRequest(transactionRequest?.receiver, undefined, true);
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
            : xy_contract_address_1.xyContractAddress[this.fromBlockchain].providerGateway;
    }
    get methodName() {
        return 'startBridgeTokensViaGenericCrossChain';
    }
    constructor(crossChainTrade, providerAddress, routePath) {
        super(providerAddress, routePath);
        this.type = cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.XY;
        this.isAggregator = false;
        this.onChainSubtype = {
            from: undefined,
            to: undefined
        };
        this.bridgeType = bridge_type_1.BRIDGE_TYPE.XY;
        this.from = crossChainTrade.from;
        this.to = crossChainTrade.to;
        this.transactionRequest = crossChainTrade.transactionRequest;
        this.gasData = crossChainTrade.gasData;
        this.priceImpact = crossChainTrade.priceImpact;
        this.slippage = crossChainTrade.slippage;
        this.toTokenAmountMin = this.to.tokenAmount.multipliedBy(1 - crossChainTrade.slippage);
        this.feeInfo = crossChainTrade.feeInfo;
        this.onChainTrade = crossChainTrade.onChainTrade;
    }
    async swapDirect(options = {}) {
        await this.checkTradeErrors();
        await this.checkAllowanceAndApprove(options);
        const { onConfirm, gasLimit, gasPriceOptions } = options;
        let transactionHash;
        const onTransactionHash = (hash) => {
            if (onConfirm) {
                onConfirm(hash);
            }
            transactionHash = hash;
        };
        // eslint-disable-next-line no-useless-catch
        try {
            const { data, value, to } = await this.getTransactionRequest(options?.receiverAddress, options?.directTransaction);
            await this.web3Private.trySendTransaction(to, {
                data,
                value,
                onTransactionHash,
                gas: gasLimit,
                gasPriceOptions
            });
            return transactionHash;
        }
        catch (err) {
            throw err;
        }
    }
    async getContractParams(options, skipAmountChangeCheck = false) {
        const receiverAddress = options?.receiverAddress || this.walletAddress;
        const { data, value: providerValue, to: providerRouter } = await this.getTransactionRequest(receiverAddress, options?.directTransaction, skipAmountChangeCheck);
        const bridgeData = proxy_cross_chain_evm_trade_1.ProxyCrossChainEvmTrade.getBridgeData(options, {
            walletAddress: receiverAddress,
            fromTokenAmount: this.from,
            toTokenAmount: this.to,
            srcChainTrade: null,
            providerAddress: this.providerAddress,
            type: `native:${this.type}`,
            fromAddress: this.walletAddress
        });
        const providerData = await proxy_cross_chain_evm_trade_1.ProxyCrossChainEvmTrade.getGenericProviderData(providerRouter, data, this.fromBlockchain, providerRouter, '0');
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
        return fromUsd.dividedBy(this.to.tokenAmount);
    }
    async getTransactionRequest(receiverAddress, transactionConfig, skipAmountChangeCheck = false) {
        if (transactionConfig) {
            return {
                data: transactionConfig.data,
                to: transactionConfig.to,
                value: transactionConfig.value
            };
        }
        const params = {
            ...this.transactionRequest,
            ...(receiverAddress && { receiver: receiverAddress })
        };
        const { success, tx, route, errorCode, errorMsg } = await this.getResponseFromApiToTransactionRequest(params);
        if (!success) {
            (0, xy_utils_1.xyAnalyzeStatusCode)(errorCode, errorMsg);
        }
        if (!skipAmountChangeCheck) {
            this.checkAmountChange(tx, route.dstQuoteTokenAmount, this.to.stringWeiAmount);
        }
        return tx;
    }
    async getResponseFromApiToTransactionRequest(params) {
        return injector_1.Injector.httpClient.get(`${xy_api_params_1.XY_API_ENDPOINT}/buildTx`, {
            params: { ...params }
        });
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
    getProviderData(_sourceData) {
        return [
            this.to.address,
            web3_pure_1.Web3Pure.toWei(this.toTokenAmountMin, this.to.decimals),
            this.slippage * 10000
        ];
    }
}
exports.XyCrossChainTrade = XyCrossChainTrade;
__decorate([
    (0, decorators_1.Cache)({
        maxAge: 15000
    })
], XyCrossChainTrade.prototype, "getResponseFromApiToTransactionRequest", null);
//# sourceMappingURL=xy-cross-chain-trade.js.map