"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TronWeb3Private = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../common/errors");
const tron_insufficient_native_balance_1 = require("../../../../../common/errors/blockchain/tron-insufficient-native-balance");
const tron_transaction_expired_1 = require("../../../../../common/errors/blockchain/tron-transaction-expired");
const errors_2 = require("../../../../../common/utils/errors");
const blockchain_name_1 = require("../../../models/blockchain-name");
const web3_private_1 = require("../web3-private");
const trc_20_contract_abi_1 = require("../../../web3-public-service/web3-public/tron-web3-public/constants/trc-20-contract-abi");
const tron_web3_pure_1 = require("../../../web3-pure/typed-web3-pure/tron-web3-pure/tron-web3-pure");
class TronWeb3Private extends web3_private_1.Web3Private {
    /**
     * Parses web3 error by its code or message.
     * @param err Web3 error to parse.
     */
    static parseError(err) {
        if (err?.includes?.('Confirmation declined by user')) {
            throw new errors_1.UserRejectError();
        }
        const message = err?.message;
        if (message?.includes('balance is not sufficient')) {
            throw new tron_insufficient_native_balance_1.TronInsufficientNativeBalance();
        }
        if (message?.includes('Transaction expired')) {
            throw new tron_transaction_expired_1.TronTransactionExpired();
        }
        return (0, errors_2.parseError)(err);
    }
    constructor(walletProviderCore) {
        super(walletProviderCore.address);
        this.Web3Pure = tron_web3_pure_1.TronWeb3Pure;
        this.tronWeb = walletProviderCore.core;
        this.checkAddressCorrect();
    }
    async getBlockchainName() {
        return blockchain_name_1.BLOCKCHAIN_NAME.TRON;
    }
    async approveTokens(tokenAddress, spenderAddress, amount = 'infinity', options = {}) {
        try {
            const contract = await this.tronWeb.contract(trc_20_contract_abi_1.TRC20_CONTRACT_ABI, tokenAddress);
            const rawValue = amount === 'infinity' ? new bignumber_js_1.default(2).pow(256).minus(1) : amount;
            const transactionHash = await contract
                .approve(spenderAddress, rawValue.toFixed(0))
                .send({
                ...(options.feeLimit && {
                    feeLimit: web3_private_1.Web3Private.stringifyAmount(options.feeLimit)
                })
            });
            if (options.onTransactionHash) {
                options.onTransactionHash(transactionHash);
            }
            return transactionHash;
        }
        catch (err) {
            console.error('Approve execution error: ', err);
            throw TronWeb3Private.parseError(err);
        }
    }
    async encodeApprove(tokenAddress, spenderAddress, value, options = {}) {
        const rawValue = value === 'infinity' ? new bignumber_js_1.default(2).pow(256).minus(1) : value;
        return tron_web3_pure_1.TronWeb3Pure.encodeMethodCall(tokenAddress, trc_20_contract_abi_1.TRC20_CONTRACT_ABI, 'approve', [spenderAddress, rawValue.toFixed(0)], '0', options.feeLimit);
    }
    async executeContractMethod(contractAddress, contractAbi, methodName, methodArguments, options = {}) {
        try {
            const contract = await this.tronWeb.contract(contractAbi, contractAddress);
            const transactionHash = await contract[methodName](...methodArguments).send({
                from: this.address,
                ...(options.callValue && {
                    callValue: web3_private_1.Web3Private.stringifyAmount(options.callValue)
                }),
                ...(options.feeLimit && {
                    feeLimit: web3_private_1.Web3Private.stringifyAmount(options.feeLimit)
                })
            });
            if (options.onTransactionHash) {
                options.onTransactionHash(transactionHash);
            }
            return transactionHash;
        }
        catch (err) {
            console.error('Method execution error: ', err);
            throw TronWeb3Private.parseError(err);
        }
    }
    async triggerContract(contractAddress, methodSignature, parameters, options = {}) {
        try {
            const transaction = await this.tronWeb.transactionBuilder.triggerSmartContract(contractAddress, methodSignature, options, parameters, this.address);
            const signedTransaction = await this.tronWeb.trx.sign(transaction.transaction);
            const receipt = await this.tronWeb.trx.sendRawTransaction(signedTransaction);
            if (options.onTransactionHash) {
                options.onTransactionHash(receipt.txid);
            }
            return receipt.txid;
        }
        catch (err) {
            console.error('Method execution error: ', err);
            throw TronWeb3Private.parseError(err);
        }
    }
}
exports.TronWeb3Private = TronWeb3Private;
//# sourceMappingURL=tron-web3-private.js.map