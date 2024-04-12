"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrossChainSymbiosisManager = void 0;
const errors_1 = require("../../../common/errors");
const chain_type_1 = require("../../../core/blockchain/models/chain-type");
const blockchain_id_1 = require("../../../core/blockchain/utils/blockchains-info/constants/blockchain-id");
const injector_1 = require("../../../core/injector/injector");
class CrossChainSymbiosisManager {
    get web3Private() {
        return injector_1.Injector.web3PrivateService.getWeb3Private(chain_type_1.CHAIN_TYPE.EVM);
    }
    get walletAddress() {
        return this.web3Private.address;
    }
    async getUserTrades(fromAddress) {
        fromAddress || (fromAddress = this.walletAddress);
        if (!fromAddress) {
            throw new errors_1.RubicSdkError('`fromAddress` parameter or wallet address must not be empty');
        }
        return this.getSymbiosisStuckedTrades(fromAddress);
    }
    getSymbiosisStuckedTrades(fromAddress) {
        return injector_1.Injector.httpClient
            .get(`https://api-v2.symbiosis.finance/crosschain/v1/stucked/${fromAddress}`)
            .then(response => response.filter(trade => Boolean(trade.hash)))
            .catch(() => []);
    }
    async revertTrade(revertTransactionHash, options = {}) {
        const stuckedTrades = await this.getUserTrades();
        const stuckedTrade = stuckedTrades.find(trade => trade.hash.toLowerCase() === revertTransactionHash.toLowerCase());
        if (!stuckedTrade) {
            throw new errors_1.RubicSdkError('No request with provided transaction hash');
        }
        const transactionRequest = await this.getRevertTransactionRequest(stuckedTrade);
        const blockchain = Object.entries(blockchain_id_1.blockchainId).find(([_, id]) => id === stuckedTrade.chainId)[0];
        await this.web3Private.checkBlockchainCorrect(blockchain);
        const { onConfirm, gasLimit, gasPriceOptions } = options;
        const onTransactionHash = (hash) => {
            if (onConfirm) {
                onConfirm(hash);
            }
        };
        return this.web3Private.trySendTransaction(transactionRequest.to, {
            data: transactionRequest.data.toString(),
            value: transactionRequest.value?.toString() || '0',
            onTransactionHash,
            gas: gasLimit,
            gasPriceOptions
        });
    }
    async getRevertTransactionRequest(stuckedTrade) {
        return (await injector_1.Injector.httpClient.post(`https://api-v2.symbiosis.finance/crosschain/v1/revert`, {
            transactionHash: stuckedTrade.hash,
            chainId: stuckedTrade.chainId
        })).tx;
    }
}
exports.CrossChainSymbiosisManager = CrossChainSymbiosisManager;
//# sourceMappingURL=cross-chain-symbiosis-manager.js.map