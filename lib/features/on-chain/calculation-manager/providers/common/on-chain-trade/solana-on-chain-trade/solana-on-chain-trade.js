"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaOnChainTrade = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../../../common/errors");
const native_tokens_1 = require("../../../../../../../common/tokens/constants/native-tokens");
const errors_2 = require("../../../../../../../common/utils/errors");
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const web3_pure_1 = require("../../../../../../../core/blockchain/web3-pure/web3-pure");
const injector_1 = require("../../../../../../../core/injector/injector");
const rubic_proxy_contract_address_1 = require("../../../../../../cross-chain/calculation-manager/providers/common/constants/rubic-proxy-contract-address");
const on_chain_trade_1 = require("../on-chain-trade");
class SolanaOnChainTrade extends on_chain_trade_1.OnChainTrade {
    get spenderAddress() {
        return this.useProxy
            ? rubic_proxy_contract_address_1.rubicProxyContractAddress[this.from.blockchain].gateway
            : this.dexContractAddress;
    }
    get web3Public() {
        return injector_1.Injector.web3PublicService.getWeb3Public(blockchain_name_1.BLOCKCHAIN_NAME.SOLANA);
    }
    get web3Private() {
        return injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(blockchain_name_1.BLOCKCHAIN_NAME.SOLANA);
    }
    constructor(tradeStruct, providerAddress) {
        super(providerAddress);
        this.from = tradeStruct.from;
        this.to = tradeStruct.to;
        this.slippageTolerance = tradeStruct.slippageTolerance;
        this.path = tradeStruct.path;
        this.gasFeeInfo = tradeStruct.gasFeeInfo;
        this.useProxy = tradeStruct.useProxy;
        this.fromWithoutFee = tradeStruct.fromWithoutFee;
        this.feeInfo = {
            rubicProxy: {
                ...(tradeStruct.proxyFeeInfo?.fixedFeeToken && {
                    fixedFee: {
                        amount: tradeStruct.proxyFeeInfo?.fixedFeeToken.tokenAmount || new bignumber_js_1.default(0),
                        token: tradeStruct.proxyFeeInfo?.fixedFeeToken
                    }
                }),
                ...(tradeStruct.proxyFeeInfo?.platformFee && {
                    platformFee: {
                        percent: tradeStruct.proxyFeeInfo?.platformFee.percent || 0,
                        token: tradeStruct.proxyFeeInfo?.platformFee.token
                    }
                })
            }
        };
        this.withDeflation = tradeStruct.withDeflation;
    }
    async approve(_options, _checkNeedApprove = true, _amount = 'infinity') {
        throw new Error('Method is not supported');
    }
    async encodeApprove(_tokenAddress, _spenderAddress, _value, _options = {}) {
        throw new Error('Method is not supported');
    }
    async checkAllowanceAndApprove() {
        throw new Error('Method is not supported');
    }
    /**
     * Calculates value for swap transaction.
     * @param providerValue Value, returned from cross-chain provider.
     */
    getSwapValue(providerValue) {
        const nativeToken = native_tokens_1.nativeTokensList[this.from.blockchain];
        const fixedFeeValue = web3_pure_1.Web3Pure.toWei(this.feeInfo.rubicProxy?.fixedFee?.amount || 0, nativeToken.decimals);
        let fromValue;
        if (this.from.isNative) {
            if (providerValue) {
                fromValue = new bignumber_js_1.default(providerValue).dividedBy(1 - (this.feeInfo.rubicProxy?.platformFee?.percent || 0) / 100);
            }
            else {
                fromValue = this.from.weiAmount;
            }
        }
        else {
            fromValue = new bignumber_js_1.default(providerValue || 0);
        }
        return new bignumber_js_1.default(fromValue).plus(fixedFeeValue).toFixed(0, 0);
    }
    async swap(options = {}) {
        await this.checkWalletState();
        const { onConfirm, directTransaction } = options;
        let transactionHash;
        const onTransactionHash = (hash) => {
            if (onConfirm) {
                onConfirm(hash);
            }
            transactionHash = hash;
        };
        const fromAddress = this.walletAddress;
        const receiverAddress = options.receiverAddress || this.walletAddress;
        const transactionConfig = await this.encode({
            fromAddress,
            receiverAddress,
            ...(directTransaction && { directTransaction }),
            ...(options?.referrer && { referrer: options?.referrer })
        });
        try {
            await this.web3Private.sendTransaction({
                data: transactionConfig.data,
                onTransactionHash
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
    async encode(options) {
        await this.checkFromAddress(options.fromAddress, true);
        await this.checkReceiverAddress(options.receiverAddress);
        return this.encodeDirect(options);
    }
    getGasParams(options, calculatedGasFee = {
        gasLimit: this.gasFeeInfo?.gasLimit?.toFixed(),
        gasPrice: this.gasFeeInfo?.gasPrice?.toFixed()
    }) {
        return {
            gas: options.gasLimit || calculatedGasFee.gasLimit,
            gasPrice: options.gasPrice || calculatedGasFee.gasPrice,
            maxPriorityFeePerGas: options.maxPriorityFeePerGas || calculatedGasFee.maxPriorityFeePerGas,
            maxFeePerGas: options.maxFeePerGas || calculatedGasFee.maxFeePerGas
        };
    }
    async getSwapData(_options) {
        throw new Error('Method is not supported');
    }
}
exports.SolanaOnChainTrade = SolanaOnChainTrade;
//# sourceMappingURL=solana-on-chain-trade.js.map