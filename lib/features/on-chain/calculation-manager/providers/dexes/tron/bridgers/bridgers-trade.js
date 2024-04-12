"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BridgersTrade = void 0;
const errors_1 = require("../../../../../../../common/errors");
const tron_web3_pure_1 = require("../../../../../../../core/blockchain/web3-pure/typed-web3-pure/tron-web3-pure/tron-web3-pure");
const injector_1 = require("../../../../../../../core/injector/injector");
const bridgers_native_address_1 = require("../../../../../../common/providers/bridgers/constants/bridgers-native-address");
const to_bridgers_blockchain_1 = require("../../../../../../common/providers/bridgers/constants/to-bridgers-blockchain");
const token_native_address_proxy_1 = require("../../../../../../common/utils/token-native-address-proxy");
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const tron_on_chain_trade_1 = require("../../../common/on-chain-trade/tron-on-chain-trade/tron-on-chain-trade");
class BridgersTrade extends tron_on_chain_trade_1.TronOnChainTrade {
    get type() {
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.BRIDGERS;
    }
    get spenderAddress() {
        return this.contractAddress;
    }
    get toTokenAmountMin() {
        return this.to;
    }
    constructor(tradeStruct, providerAddress) {
        super(providerAddress);
        this.path = [];
        this.from = tradeStruct.from;
        this.to = tradeStruct.to;
        this.slippageTolerance = tradeStruct.slippageTolerance;
        this.contractAddress = tradeStruct.contractAddress;
        this.cryptoFeeToken = tradeStruct.cryptoFeeToken;
        this.platformFee = tradeStruct.platformFee;
        this.feeInfo = {
            rubicProxy: {
                platformFee: {
                    percent: tradeStruct.platformFee.percent,
                    token: tradeStruct.platformFee.token
                }
            }
        };
    }
    async swap(options = {}) {
        await this.checkWalletState();
        await this.checkAllowanceAndApprove(options);
        try {
            const transactionData = await this.getTransactionData(options);
            return await this.web3Private.triggerContract(this.contractAddress, transactionData.functionName, transactionData.parameter, { ...transactionData.options, onTransactionHash: options.onConfirm });
        }
        catch (err) {
            if ([400, 500, 503].includes(err.code)) {
                throw new errors_1.SwapRequestError();
            }
            throw err;
        }
    }
    async encode(options) {
        try {
            const transactionData = await this.getTransactionData(options);
            const encodedData = tron_web3_pure_1.TronWeb3Pure.encodeMethodSignature(transactionData.functionName, transactionData.parameter);
            return {
                to: this.contractAddress,
                data: encodedData,
                callValue: transactionData.options.callValue,
                feeLimit: options.feeLimit || transactionData.options.feeLimit
            };
        }
        catch (err) {
            if ([400, 500, 503].includes(err.code)) {
                throw new errors_1.SwapRequestError();
            }
            throw err;
        }
    }
    async getTransactionData(options) {
        const fromTokenAddress = (0, token_native_address_proxy_1.createTokenNativeAddressProxy)(this.from, bridgers_native_address_1.bridgersNativeAddress).address;
        const toTokenAddress = (0, token_native_address_proxy_1.createTokenNativeAddressProxy)(this.to, bridgers_native_address_1.bridgersNativeAddress).address;
        const fromAddress = options.fromAddress || this.walletAddress;
        const toAddress = options.receiverAddress || fromAddress;
        const amountOutMin = this.toTokenAmountMin.stringWeiAmount;
        const swapRequest = {
            fromTokenAddress,
            toTokenAddress,
            fromAddress,
            toAddress,
            fromTokenChain: to_bridgers_blockchain_1.toBridgersBlockchain[this.from.blockchain],
            toTokenChain: to_bridgers_blockchain_1.toBridgersBlockchain[this.to.blockchain],
            fromTokenAmount: this.from.stringWeiAmount,
            amountOutMin,
            equipmentNo: fromAddress.slice(0, 32),
            sourceFlag: 'rubic_widget'
        };
        const swapData = await injector_1.Injector.httpClient.post('https://sswap.swft.pro/api/sswap/swap', swapRequest);
        return swapData.data.txData;
    }
}
exports.BridgersTrade = BridgersTrade;
//# sourceMappingURL=bridgers-trade.js.map