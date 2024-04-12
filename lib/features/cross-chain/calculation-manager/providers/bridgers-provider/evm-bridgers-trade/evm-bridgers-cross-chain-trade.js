"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvmBridgersCrossChainTrade = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const evm_web3_pure_1 = require("../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const web3_pure_1 = require("../../../../../../core/blockchain/web3-pure/web3-pure");
const injector_1 = require("../../../../../../core/injector/injector");
const bridgers_contract_addresses_1 = require("../../../../../common/providers/bridgers/models/bridgers-contract-addresses");
const get_from_without_fee_1 = require("../../../../../common/utils/get-from-without-fee");
const cross_chain_trade_type_1 = require("../../../models/cross-chain-trade-type");
const get_method_arguments_and_transaction_data_1 = require("../utils/get-method-arguments-and-transaction-data");
const rubic_proxy_contract_address_1 = require("../../common/constants/rubic-proxy-contract-address");
const evm_common_cross_chain_abi_1 = require("../../common/emv-cross-chain-trade/constants/evm-common-cross-chain-abi");
const evm_cross_chain_trade_1 = require("../../common/emv-cross-chain-trade/evm-cross-chain-trade");
const bridge_type_1 = require("../../common/models/bridge-type");
const convert_gas_price_1 = require("../../../utils/convert-gas-price");
class EvmBridgersCrossChainTrade extends evm_cross_chain_trade_1.EvmCrossChainTrade {
    /** @internal */
    static async getGasData(from, to, receiverAddress, providerAddress, feeInfo, toTokenAmountMin) {
        const fromBlockchain = from.blockchain;
        const walletAddress = injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(fromBlockchain).address;
        if (!walletAddress) {
            return null;
        }
        try {
            let gasLimit;
            let gasDetails;
            const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(fromBlockchain);
            const trade = new EvmBridgersCrossChainTrade({
                from,
                to,
                toTokenAmountMin: new bignumber_js_1.default(0),
                feeInfo,
                gasData: null,
                slippage: 0
            }, providerAddress || evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS, []);
            if (feeInfo.rubicProxy?.fixedFee?.amount.gt(0)) {
                const { contractAddress, contractAbi, methodName, methodArguments, value } = await trade.getContractParams({ receiverAddress }, true);
                const [proxyGasLimit, proxyGasDetails] = await Promise.all([
                    web3Public.getEstimatedGas(contractAbi, contractAddress, methodName, methodArguments, walletAddress, value),
                    (0, convert_gas_price_1.convertGasDataToBN)(await injector_1.Injector.gasPriceApi.getGasPrice(from.blockchain))
                ]);
                gasLimit = proxyGasLimit;
                gasDetails = proxyGasDetails;
            }
            else {
                const fromWithoutFee = (0, get_from_without_fee_1.getFromWithoutFee)(from, feeInfo.rubicProxy?.platformFee?.percent);
                const { transactionData } = await (0, get_method_arguments_and_transaction_data_1.getMethodArgumentsAndTransactionData)(from, fromWithoutFee, to, toTokenAmountMin, walletAddress, providerAddress, { receiverAddress, fromAddress: walletAddress }, trade.checkAmountChange);
                const defaultGasLimit = await web3Public.getEstimatedGasByData(walletAddress, transactionData.to, {
                    data: transactionData.data,
                    value: transactionData.value
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
    get fromContractAddress() {
        return this.isProxyTrade
            ? rubic_proxy_contract_address_1.rubicProxyContractAddress[this.from.blockchain].gateway
            : bridgers_contract_addresses_1.bridgersContractAddresses[this.from.blockchain];
    }
    get methodName() {
        return '';
    }
    constructor(crossChainTrade, providerAddress, routePath) {
        super(providerAddress, routePath);
        this.type = cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.BRIDGERS;
        this.isAggregator = false;
        this.onChainSubtype = { from: undefined, to: undefined };
        this.bridgeType = bridge_type_1.BRIDGE_TYPE.BRIDGERS;
        this.from = crossChainTrade.from;
        this.to = crossChainTrade.to;
        this.toTokenAmountMin = crossChainTrade.toTokenAmountMin;
        this.feeInfo = crossChainTrade.feeInfo;
        this.gasData = crossChainTrade.gasData;
        this.priceImpact = this.from.calculatePriceImpactPercent(this.to);
        this.slippage = crossChainTrade.slippage;
    }
    async swapDirect(options) {
        await this.checkTradeErrors();
        await this.checkReceiverAddress(options.receiverAddress, true);
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
            const fromWithoutFee = (0, get_from_without_fee_1.getFromWithoutFee)(this.from, this.feeInfo.rubicProxy?.platformFee?.percent);
            const { transactionData } = await (0, get_method_arguments_and_transaction_data_1.getMethodArgumentsAndTransactionData)(this.from, fromWithoutFee, this.to, this.toTokenAmountMin, this.walletAddress, this.providerAddress, options, this.checkAmountChange);
            await this.web3Private.trySendTransaction(transactionData.to, {
                data: transactionData.data,
                value: transactionData.value,
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
    async encode(options) {
        return super.encode(options);
    }
    async getContractParams(options, skipAmountChangeCheck = false) {
        const fromWithoutFee = (0, get_from_without_fee_1.getFromWithoutFee)(this.from, this.feeInfo.rubicProxy?.platformFee?.percent);
        const { methodArguments, transactionData } = await (0, get_method_arguments_and_transaction_data_1.getMethodArgumentsAndTransactionData)(this.from, fromWithoutFee, this.to, this.toTokenAmountMin, this.walletAddress, this.providerAddress, options, this.checkAmountChange, skipAmountChangeCheck);
        const encodedData = transactionData.data;
        methodArguments.push(encodedData);
        const value = this.getSwapValue(transactionData.value);
        return {
            contractAddress: this.fromContractAddress,
            contractAbi: evm_common_cross_chain_abi_1.evmCommonCrossChainAbi,
            methodName: this.methodName,
            methodArguments,
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
            slippage: this.slippage * 100,
            routePath: this.routePath
        };
    }
}
exports.EvmBridgersCrossChainTrade = EvmBridgersCrossChainTrade;
//# sourceMappingURL=evm-bridgers-cross-chain-trade.js.map