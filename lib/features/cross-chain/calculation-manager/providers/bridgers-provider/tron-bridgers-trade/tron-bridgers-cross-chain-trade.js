"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TronBridgersCrossChainTrade = void 0;
const tron_web3_pure_1 = require("../../../../../../core/blockchain/web3-pure/typed-web3-pure/tron-web3-pure/tron-web3-pure");
const get_from_without_fee_1 = require("../../../../../common/utils/get-from-without-fee");
const cross_chain_trade_type_1 = require("../../../models/cross-chain-trade-type");
const get_method_arguments_and_transaction_data_1 = require("../utils/get-method-arguments-and-transaction-data");
const bridge_type_1 = require("../../common/models/bridge-type");
const tron_common_cross_chain_abi_1 = require("../../common/tron-cross-chain-trade/constants/tron-common-cross-chain-abi");
const tron_native_swap_abi_1 = require("../../common/tron-cross-chain-trade/constants/tron-native-swap-abi");
const tron_cross_chain_trade_1 = require("../../common/tron-cross-chain-trade/tron-cross-chain-trade");
class TronBridgersCrossChainTrade extends tron_cross_chain_trade_1.TronCrossChainTrade {
    get fromContractAddress() {
        // return rubicProxyContractAddress[this.from.blockchain];
        return this.contractAddress;
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
        this.priceImpact = this.from.calculatePriceImpactPercent(this.to);
        this.slippage = crossChainTrade.slippage;
        this.contractAddress = crossChainTrade.contractAddress;
    }
    async swap(options) {
        return this.swapDirect(options);
    }
    async swapDirect(options) {
        await this.checkTradeErrors();
        await this.checkReceiverAddress(options.receiverAddress, true);
        await this.checkAllowanceAndApprove(options);
        const { onConfirm } = options;
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
            await this.web3Private.executeContractMethod(transactionData.to, tron_native_swap_abi_1.tronNativeSwapAbi, this.from.isNative ? 'swapEth' : 'swap', transactionData.parameter.map(el => el.value), {
                onTransactionHash,
                callValue: transactionData.options.callValue,
                feeLimit: transactionData.options.feeLimit
            });
            return transactionHash;
        }
        catch (err) {
            throw err;
        }
    }
    async getContractParams(options) {
        const fromWithoutFee = (0, get_from_without_fee_1.getFromWithoutFee)(this.from, this.feeInfo.rubicProxy?.platformFee?.percent);
        const { methodArguments, transactionData } = await (0, get_method_arguments_and_transaction_data_1.getMethodArgumentsAndTransactionData)(this.from, fromWithoutFee, this.to, this.toTokenAmountMin, this.walletAddress, this.providerAddress, options, this.checkAmountChange);
        const encodedData = tron_web3_pure_1.TronWeb3Pure.encodeMethodSignature(transactionData.functionName, transactionData.parameter);
        methodArguments.push(encodedData);
        const value = this.getSwapValue(transactionData.options.callValue);
        const { feeLimit } = transactionData.options;
        return {
            contractAddress: this.fromContractAddress,
            contractAbi: tron_common_cross_chain_abi_1.tronCommonCrossChainAbi,
            methodName: this.methodName,
            methodArguments,
            value,
            feeLimit
        };
    }
    getTradeAmountRatio(fromUsd) {
        return fromUsd.dividedBy(this.to.tokenAmount);
    }
    getTradeInfo() {
        return {
            estimatedGas: null,
            feeInfo: this.feeInfo,
            priceImpact: this.priceImpact ?? null,
            slippage: this.slippage * 100,
            routePath: this.routePath
        };
    }
}
exports.TronBridgersCrossChainTrade = TronBridgersCrossChainTrade;
//# sourceMappingURL=tron-bridgers-cross-chain-trade.js.map