"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CbridgeCrossChainTrade = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const blockchain_id_1 = require("../../../../../core/blockchain/utils/blockchains-info/constants/blockchain-id");
const evm_web3_pure_1 = require("../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const web3_pure_1 = require("../../../../../core/blockchain/web3-pure/web3-pure");
const injector_1 = require("../../../../../core/injector/injector");
const cross_chain_trade_type_1 = require("../../models/cross-chain-trade-type");
const cbridge_contract_abi_1 = require("./constants/cbridge-contract-abi");
const cbridge_contract_address_1 = require("./constants/cbridge-contract-address");
const rubic_proxy_contract_address_1 = require("../common/constants/rubic-proxy-contract-address");
const evm_common_cross_chain_abi_1 = require("../common/emv-cross-chain-trade/constants/evm-common-cross-chain-abi");
const gateway_rubic_cross_chain_abi_1 = require("../common/emv-cross-chain-trade/constants/gateway-rubic-cross-chain-abi");
const evm_cross_chain_trade_1 = require("../common/emv-cross-chain-trade/evm-cross-chain-trade");
const bridge_type_1 = require("../common/models/bridge-type");
const proxy_cross_chain_evm_trade_1 = require("../common/proxy-cross-chain-evm-facade/proxy-cross-chain-evm-trade");
const convert_gas_price_1 = require("../../utils/convert-gas-price");
class CbridgeCrossChainTrade extends evm_cross_chain_trade_1.EvmCrossChainTrade {
    /** @internal */
    static async getGasData(from, toToken, onChainTrade, feeInfo, maxSlippage, celerContractAddress, providerAddress, receiverAddress) {
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
                const { contractAddress, contractAbi, methodName, methodArguments, value } = await new CbridgeCrossChainTrade({
                    from,
                    to: toToken,
                    gasData: null,
                    priceImpact: 0,
                    slippage: 0,
                    feeInfo: feeInfo,
                    maxSlippage,
                    contractAddress: celerContractAddress,
                    transitMinAmount: new bignumber_js_1.default(0),
                    onChainTrade: onChainTrade
                }, providerAddress || evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS, []).getContractParams({});
                const [proxyGasLimit, proxyGasDetails] = await Promise.all([
                    web3Public.getEstimatedGas(contractAbi, contractAddress, methodName, methodArguments, walletAddress, value),
                    (0, convert_gas_price_1.convertGasDataToBN)(await injector_1.Injector.gasPriceApi.getGasPrice(from.blockchain))
                ]);
                gasLimit = proxyGasLimit;
                gasDetails = proxyGasDetails;
            }
            else {
                const { data, to, value } = new CbridgeCrossChainTrade({
                    from,
                    to: toToken,
                    gasData: null,
                    priceImpact: 0,
                    slippage: 0,
                    feeInfo: feeInfo,
                    maxSlippage,
                    contractAddress: celerContractAddress,
                    transitMinAmount: new bignumber_js_1.default(0),
                    onChainTrade: onChainTrade
                }, providerAddress || evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS, []).getTransactionRequest(receiverAddress, maxSlippage, onChainTrade ? onChainTrade.to : from);
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
            : cbridge_contract_address_1.cbridgeContractAddress[this.fromBlockchain].providerGateway;
    }
    get methodName() {
        return this.onChainTrade
            ? 'swapAndStartBridgeTokensViaGenericCrossChain'
            : 'startBridgeTokensViaGenericCrossChain';
    }
    constructor(crossChainTrade, providerAddress, routePath) {
        super(providerAddress, routePath);
        this.type = cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.CELER_BRIDGE;
        this.isAggregator = false;
        this.bridgeType = bridge_type_1.BRIDGE_TYPE.CELER_BRIDGE;
        this.from = crossChainTrade.from;
        this.to = crossChainTrade.to;
        this.gasData = crossChainTrade.gasData;
        this.priceImpact = crossChainTrade.priceImpact;
        this.slippage = crossChainTrade.slippage;
        this.toTokenAmountMin = crossChainTrade.to.tokenAmount.multipliedBy(1 - crossChainTrade.maxSlippage / 10000000);
        this.feeInfo = crossChainTrade.feeInfo;
        this.maxSlippage = crossChainTrade.maxSlippage;
        this.celerContractAddress = crossChainTrade.contractAddress;
        this.onChainSubtype = crossChainTrade.onChainTrade
            ? { from: crossChainTrade.onChainTrade.type, to: undefined }
            : { from: undefined, to: undefined };
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
            const { data, to, value } = this.getTransactionRequest(options.receiverAddress || this.walletAddress, this.maxSlippage, this.from);
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
    async getContractParams(options) {
        const receiverAddress = options?.receiverAddress || this.walletAddress;
        const { data, to, value: providerValue } = this.getTransactionRequest(receiverAddress, this.maxSlippage, this.onChainTrade ? this.onChainTrade.to : this.from);
        const bridgeData = proxy_cross_chain_evm_trade_1.ProxyCrossChainEvmTrade.getBridgeData(options, {
            walletAddress: this.walletAddress,
            fromTokenAmount: this.from,
            toTokenAmount: this.to,
            srcChainTrade: this.onChainTrade,
            providerAddress: this.providerAddress,
            type: `native:${this.type}`,
            fromAddress: this.walletAddress
        });
        const swapData = this.onChainTrade &&
            (await proxy_cross_chain_evm_trade_1.ProxyCrossChainEvmTrade.getSwapData(options, {
                walletAddress: this.walletAddress,
                contractAddress: rubic_proxy_contract_address_1.rubicProxyContractAddress[this.from.blockchain].router,
                fromTokenAmount: this.from,
                toTokenAmount: this.onChainTrade.to,
                onChainEncodeFn: this.onChainTrade.encode.bind(this.onChainTrade)
            }));
        const providerData = await proxy_cross_chain_evm_trade_1.ProxyCrossChainEvmTrade.getGenericProviderData(to, data, this.fromBlockchain, to, '0');
        const methodArguments = swapData
            ? [bridgeData, swapData, providerData]
            : [bridgeData, providerData];
        const value = this.getSwapValue(new bignumber_js_1.default(this.from.isNative ? this.from.stringWeiAmount : 0).plus(providerValue?.toString()));
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
    getTradeInfo() {
        return {
            estimatedGas: this.estimatedGas,
            feeInfo: this.feeInfo,
            priceImpact: this.priceImpact ?? null,
            slippage: this.maxSlippage / 10000,
            routePath: this.routePath
        };
    }
    getTransactionRequest(receiverAddress, maxSlippage, transitToken) {
        const params = [receiverAddress];
        if (!transitToken.isNative) {
            params.push(transitToken.address);
        }
        params.push(transitToken.stringWeiAmount, blockchain_id_1.blockchainId[this.to.blockchain], Date.now(), maxSlippage);
        const encode = evm_web3_pure_1.EvmWeb3Pure.encodeMethodCall(cbridge_contract_address_1.cbridgeContractAddress[this.fromBlockchain].providerRouter, cbridge_contract_abi_1.cbridgeContractAbi, transitToken.isNative ? 'sendNative' : 'send', params, transitToken.isNative ? this.from.stringWeiAmount : '0');
        return { data: encode.data, to: encode.to, value: encode.value };
    }
}
exports.CbridgeCrossChainTrade = CbridgeCrossChainTrade;
//# sourceMappingURL=cbridge-cross-chain-trade.js.map