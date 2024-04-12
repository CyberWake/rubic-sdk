"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaCrossChainTrade = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const options_1 = require("../../../../../../common/utils/options");
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const blockchains_info_1 = require("../../../../../../core/blockchain/utils/blockchains-info/blockchains-info");
const evm_web3_pure_1 = require("../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const injector_1 = require("../../../../../../core/injector/injector");
const cross_chain_trade_1 = require("../cross-chain-trade");
class SolanaCrossChainTrade extends cross_chain_trade_1.CrossChainTrade {
    get fromWeb3Public() {
        return injector_1.Injector.web3PublicService.getWeb3Public(blockchain_name_1.BLOCKCHAIN_NAME.SOLANA);
    }
    get web3Private() {
        return injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(blockchain_name_1.BLOCKCHAIN_NAME.SOLANA);
    }
    /**
     * Gets gas fee in source blockchain.
     */
    get estimatedGas() {
        return null;
    }
    async approve(_options, _checkNeedApprove = true, _amount = 'infinity') {
        throw new Error('Method is not supported');
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
        return this.swapDirect(options);
        // There is no Rubic proxy contracts in Solana for now
        // if (!this.isProxyTrade) {
        //     return this.swapDirect(options);
        // }
        // return this.swapWithParams(options);
    }
    async swapWithParams(_options = {}) {
        throw new Error("Method is not supported');");
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
            gas: gasLimit || '0',
            ...(0, options_1.getGasOptions)(options)
        });
    }
    async encodeApprove(_tokenAddress, _spenderAddress, _value, _options = {}) {
        throw new Error('Method is not supported');
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
exports.SolanaCrossChainTrade = SolanaCrossChainTrade;
//# sourceMappingURL=solana-cross-chain-trade.js.map