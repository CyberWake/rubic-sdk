"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TronCrossChainTrade = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../../common/errors");
const tron_web3_pure_1 = require("../../../../../../core/blockchain/web3-pure/typed-web3-pure/tron-web3-pure/tron-web3-pure");
const injector_1 = require("../../../../../../core/injector/injector");
const cross_chain_trade_1 = require("../cross-chain-trade");
class TronCrossChainTrade extends cross_chain_trade_1.CrossChainTrade {
    get fromWeb3Public() {
        return injector_1.Injector.web3PublicService.getWeb3Public(this.from.blockchain);
    }
    get web3Private() {
        return injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(this.from.blockchain);
    }
    async approve(options, checkNeedApprove = true, amount = 'infinity') {
        if (checkNeedApprove) {
            const needApprove = await this.needApprove();
            if (!needApprove) {
                throw new errors_1.UnnecessaryApproveError();
            }
        }
        this.checkWalletConnected();
        await this.checkBlockchainCorrect();
        return this.web3Private.approveTokens(this.from.address, this.fromContractAddress, amount, options);
    }
    async checkAllowanceAndApprove(options) {
        const needApprove = await this.needApprove();
        if (!needApprove) {
            return;
        }
        const approveOptions = {
            onTransactionHash: options?.onApprove,
            feeLimit: options?.approveFeeLimit
        };
        await this.approve(approveOptions, false);
    }
    async swap(options) {
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
        const { contractAddress, contractAbi, methodName, methodArguments, value, feeLimit } = await this.getContractParams(options);
        try {
            await this.web3Private.executeContractMethod(contractAddress, contractAbi, methodName, methodArguments, {
                onTransactionHash,
                callValue: value,
                feeLimit: options.feeLimit || feeLimit
            });
            return transactionHash;
        }
        catch (err) {
            if (err instanceof errors_1.FailedToCheckForTransactionReceiptError) {
                return transactionHash;
            }
            throw err;
        }
    }
    async encode(options) {
        await this.checkFromAddress(options.fromAddress, true);
        await this.checkReceiverAddress(options.receiverAddress, true);
        const { contractAddress, contractAbi, methodName, methodArguments, value, feeLimit } = await this.getContractParams({
            fromAddress: options.fromAddress,
            receiverAddress: options.receiverAddress
        });
        return tron_web3_pure_1.TronWeb3Pure.encodeMethodCall(contractAddress, contractAbi, methodName, methodArguments, value, options.feeLimit || feeLimit);
    }
    async encodeApprove(tokenAddress, spenderAddress, value, options = {}) {
        return this.web3Private.encodeApprove(tokenAddress, spenderAddress, value, options);
    }
    getUsdPrice() {
        let feeSum = new bignumber_js_1.default(0);
        const providerFee = this.feeInfo.provider?.cryptoFee;
        if (providerFee) {
            feeSum = feeSum.plus(providerFee.amount.multipliedBy(providerFee.token.price));
        }
        return this.to.price.multipliedBy(this.to.tokenAmount).minus(feeSum);
    }
}
exports.TronCrossChainTrade = TronCrossChainTrade;
//# sourceMappingURL=tron-cross-chain-trade.js.map