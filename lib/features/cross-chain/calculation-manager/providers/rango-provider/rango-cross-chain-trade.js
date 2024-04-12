"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangoCrossChainTrade = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../common/errors");
const evm_web3_pure_1 = require("../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const web3_pure_1 = require("../../../../../core/blockchain/web3-pure/web3-pure");
const injector_1 = require("../../../../../core/injector/injector");
const rango_contract_address_1 = require("../../../../common/providers/rango/constants/rango-contract-address");
const cross_chain_trade_type_1 = require("../../models/cross-chain-trade-type");
const convert_gas_price_1 = require("../../utils/convert-gas-price");
const rubic_proxy_contract_address_1 = require("../common/constants/rubic-proxy-contract-address");
const evm_common_cross_chain_abi_1 = require("../common/emv-cross-chain-trade/constants/evm-common-cross-chain-abi");
const gateway_rubic_cross_chain_abi_1 = require("../common/emv-cross-chain-trade/constants/gateway-rubic-cross-chain-abi");
const evm_cross_chain_trade_1 = require("../common/emv-cross-chain-trade/evm-cross-chain-trade");
const bridge_type_1 = require("../common/models/bridge-type");
const proxy_cross_chain_evm_trade_1 = require("../common/proxy-cross-chain-evm-facade/proxy-cross-chain-evm-trade");
const rango_cross_chain_api_service_1 = require("./services/rango-cross-chain-api-service");
class RangoCrossChainTrade extends evm_cross_chain_trade_1.EvmCrossChainTrade {
    /** @internal */
    static async getGasData({ fromToken, toToken, feeInfo, routePath, swapQueryParams, bridgeSubtype }) {
        const fromBlockchain = fromToken.blockchain;
        const walletAddress = swapQueryParams.fromAddress;
        if (!walletAddress) {
            return null;
        }
        try {
            let gasLimit;
            let gasDetails;
            const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(fromBlockchain);
            const tradeParams = {
                crossChainTrade: {
                    from: fromToken,
                    to: toToken,
                    toTokenAmountMin: new bignumber_js_1.default(0),
                    feeInfo,
                    gasData: null,
                    priceImpact: fromToken.calculatePriceImpactPercent(toToken) || 0,
                    slippage: swapQueryParams.slippage,
                    bridgeSubtype,
                    swapQueryParams
                },
                routePath,
                providerAddress: swapQueryParams.toAddress
            };
            if (feeInfo.rubicProxy?.fixedFee?.amount.gt(0)) {
                const { contractAddress, contractAbi, methodName, methodArguments, value } = await new RangoCrossChainTrade(tradeParams).getContractParams({
                    receiverAddress: swapQueryParams.toAddress
                }, true);
                const [proxyGasLimit, proxyGasDetails] = await Promise.all([
                    web3Public.getEstimatedGas(contractAbi, contractAddress, methodName, methodArguments, walletAddress, value),
                    (0, convert_gas_price_1.convertGasDataToBN)(await injector_1.Injector.gasPriceApi.getGasPrice(fromBlockchain))
                ]);
                gasLimit = proxyGasLimit;
                gasDetails = proxyGasDetails;
            }
            else {
                const { data, value, to } = await new RangoCrossChainTrade(tradeParams).getTransactionRequest(swapQueryParams.toAddress, undefined, true);
                const defaultGasLimit = await web3Public.getEstimatedGasByData(walletAddress, to, {
                    data,
                    value
                });
                const defaultGasDetails = (0, convert_gas_price_1.convertGasDataToBN)(await injector_1.Injector.gasPriceApi.getGasPrice(fromBlockchain));
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
        catch (err) {
            return null;
        }
    }
    get fromBlockchain() {
        return this.from.blockchain;
    }
    get fromContractAddress() {
        return this.isProxyTrade
            ? rubic_proxy_contract_address_1.rubicProxyContractAddress[this.fromBlockchain].gateway
            : rango_contract_address_1.rangoContractAddresses[this.fromBlockchain].providerGateway;
    }
    get methodName() {
        return 'startBridgeTokensViaGenericCrossChain';
    }
    constructor(params) {
        super(params.providerAddress, params.routePath);
        /**ABSTRACT PROPS */
        this.type = cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.RANGO;
        this.isAggregator = true;
        this.onChainSubtype = { from: undefined, to: undefined };
        this.bridgeType = bridge_type_1.BRIDGE_TYPE.RANGO;
        this.to = params.crossChainTrade.to;
        this.from = params.crossChainTrade.from;
        this.toTokenAmountMin = params.crossChainTrade.toTokenAmountMin;
        this.feeInfo = params.crossChainTrade.feeInfo;
        this.gasData = params.crossChainTrade.gasData;
        this.priceImpact = params.crossChainTrade.priceImpact;
        this.slippage = params.crossChainTrade.slippage;
        this.swapQueryParams = params.crossChainTrade.swapQueryParams;
        this.bridgeType = params.crossChainTrade.bridgeSubtype || bridge_type_1.BRIDGE_TYPE.RANGO;
    }
    async getContractParams(options, skipAmountChangeCheck = false) {
        const receiverAddress = options?.receiverAddress || this.walletAddress;
        const { data, value: providerValue, to: providerRouter } = await this.getTransactionRequest(receiverAddress, options.directTransaction, skipAmountChangeCheck);
        const bridgeData = proxy_cross_chain_evm_trade_1.ProxyCrossChainEvmTrade.getBridgeData(options, {
            walletAddress: receiverAddress,
            fromTokenAmount: this.from,
            toTokenAmount: this.to,
            srcChainTrade: null,
            providerAddress: this.providerAddress,
            type: `rango:${this.bridgeType}`,
            fromAddress: this.walletAddress
        });
        const extraNativeFee = this.from.isNative
            ? new bignumber_js_1.default(providerValue).minus(this.from.stringWeiAmount).toFixed()
            : new bignumber_js_1.default(providerValue).toFixed();
        const providerData = await proxy_cross_chain_evm_trade_1.ProxyCrossChainEvmTrade.getGenericProviderData(providerRouter, data, this.from.blockchain, providerRouter, extraNativeFee);
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
            const receiverAddress = options?.receiverAddress || this.walletAddress;
            const { data, value, to } = await this.getTransactionRequest(receiverAddress, options.directTransaction);
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
    async getTransactionRequest(receiverAddress, transactionConfig, skipAmountChangeCheck = false) {
        if (transactionConfig) {
            return {
                data: transactionConfig.data,
                to: transactionConfig.to,
                value: transactionConfig.value
            };
        }
        const { route, tx, error, requestId } = await rango_cross_chain_api_service_1.RangoCrossChainApiService.getSwapTransaction({
            ...this.swapQueryParams,
            toAddress: receiverAddress || this.swapQueryParams.toAddress
        });
        this.rangoRequestId = requestId;
        if (!route || !tx) {
            throw new errors_1.RubicSdkError('Invalid data after sending swap request. Error text:' + error);
        }
        const config = {
            data: tx.txData,
            value: tx.value || '0',
            to: tx.txTo
        };
        if (!skipAmountChangeCheck) {
            this.checkAmountChange(config, route.outputAmount, this.to.stringWeiAmount);
        }
        return config;
    }
    getTradeInfo() {
        return {
            estimatedGas: this.estimatedGas,
            feeInfo: this.feeInfo,
            priceImpact: this.priceImpact,
            slippage: this.slippage * 100,
            routePath: this.routePath
        };
    }
}
exports.RangoCrossChainTrade = RangoCrossChainTrade;
//# sourceMappingURL=rango-cross-chain-trade.js.map