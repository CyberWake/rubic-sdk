"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvmCrossChainTrade = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../../common/errors");
const options_1 = require("../../../../../../common/utils/options");
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const blockchains_info_1 = require("../../../../../../core/blockchain/utils/blockchains-info/blockchains-info");
const evm_web3_pure_1 = require("../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const web3_pure_1 = require("../../../../../../core/blockchain/web3-pure/web3-pure");
const injector_1 = require("../../../../../../core/injector/injector");
const cross_chain_trade_1 = require("../cross-chain-trade");
class EvmCrossChainTrade extends cross_chain_trade_1.CrossChainTrade {
    get fromWeb3Public() {
        return injector_1.Injector.web3PublicService.getWeb3Public(this.from.blockchain);
    }
    get web3Private() {
        return injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(this.from.blockchain);
    }
    /**
     * Gets gas fee in source blockchain.
     */
    get estimatedGas() {
        if (!this.gasData) {
            return null;
        }
        if (this.gasData.baseFee && this.gasData.maxPriorityFeePerGas) {
            return web3_pure_1.Web3Pure.fromWei(this.gasData.baseFee).plus(web3_pure_1.Web3Pure.fromWei(this.gasData.maxPriorityFeePerGas));
        }
        if (this.gasData.gasPrice) {
            return web3_pure_1.Web3Pure.fromWei(this.gasData.gasPrice).multipliedBy(this.gasData.gasLimit);
        }
        return null;
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
        const approveAmount = this.from.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.GNOSIS ||
            this.from.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.CRONOS
            ? this.from.weiAmount
            : amount;
        const fromTokenAddress = this.from.isNative && this.from.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.METIS
            ? '0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000'
            : this.from.address;
        return this.web3Private.approveTokens(fromTokenAddress, this.fromContractAddress, approveAmount, options);
    }
    async checkAllowanceAndApprove(options) {
        const needApprove = await this.needApprove();
        if (!needApprove) {
            return;
        }
        const approveOptions = {
            onTransactionHash: options?.onApprove,
            gas: options?.approveGasLimit,
            gasPriceOptions: options?.gasPriceOptions
        };
        await this.approve(approveOptions, false);
    }
    /**
     *
     * @returns txHash(srcTxHash) | never
     */
    async swap(options = {}) {
        if (!this.isProxyTrade) {
            return this.swapDirect(options);
        }
        return this.swapWithParams(options);
    }
    async swapWithParams(options = {}) {
        await this.checkTradeErrors();
        await this.checkReceiverAddress(options.receiverAddress, !blockchains_info_1.BlockchainsInfo.isEvmBlockchainName(this.to.blockchain));
        await this.checkAllowanceAndApprove(options);
        const { onConfirm, gasLimit, gasPriceOptions } = options;
        let transactionHash;
        const onTransactionHash = (hash) => {
            if (onConfirm) {
                onConfirm(hash);
            }
            transactionHash = hash;
        };
        const { contractAddress, contractAbi, methodName, methodArguments, value } = await this.getContractParams(options, false);
        try {
            let method = 'tryExecuteContractMethod';
            if (options?.testMode) {
                console.info(contractAddress, contractAbi, methodName, methodName, value, gasLimit, gasPriceOptions);
                method = 'executeContractMethod';
            }
            await this.web3Private[method](contractAddress, contractAbi, methodName, methodArguments, {
                value,
                onTransactionHash,
                gas: gasLimit,
                gasPriceOptions
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
        await this.checkReceiverAddress(options.receiverAddress, !blockchains_info_1.BlockchainsInfo.isEvmBlockchainName(this.to.blockchain));
        const { gasLimit } = options;
        const { contractAddress, contractAbi, methodName, methodArguments, value } = await this.getContractParams({
            fromAddress: options.fromAddress,
            receiverAddress: options.receiverAddress || options.fromAddress
        });
        return evm_web3_pure_1.EvmWeb3Pure.encodeMethodCall(contractAddress, contractAbi, methodName, methodArguments, value, {
            gas: gasLimit || this.gasData?.gasLimit.toFixed(0),
            ...(0, options_1.getGasOptions)(options)
        });
    }
    async encodeApprove(tokenAddress, spenderAddress, value, options = {}) {
        return this.web3Private.encodeApprove(tokenAddress, spenderAddress, value, options);
    }
    getUsdPrice(providerFeeToken) {
        let feeSum = new bignumber_js_1.default(0);
        const providerFee = this.feeInfo.provider?.cryptoFee;
        if (providerFee) {
            feeSum = feeSum.plus(providerFee.amount.multipliedBy(providerFeeToken || providerFee.token.price));
        }
        return this.to.price.multipliedBy(this.to.tokenAmount).minus(feeSum);
    }
}
exports.EvmCrossChainTrade = EvmCrossChainTrade;
//# sourceMappingURL=evm-cross-chain-trade.js.map