"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebridgeSolanaCrossChainTrade = void 0;
const errors_1 = require("../../../../../../common/errors");
const errors_2 = require("../../../../../../common/utils/errors");
const blockchains_info_1 = require("../../../../../../core/blockchain/utils/blockchains-info/blockchains-info");
const dln_api_service_1 = require("../../../../../common/providers/dln/dln-api-service");
const cross_chain_trade_type_1 = require("../../../models/cross-chain-trade-type");
const rubic_proxy_contract_address_1 = require("../../common/constants/rubic-proxy-contract-address");
const bridge_type_1 = require("../../common/models/bridge-type");
const solana_cross_chain_trade_1 = require("../../common/solana-cross-chain-trade/solana-cross-chain-trade");
const on_chain_trade_type_1 = require("../../../../../on-chain/calculation-manager/providers/common/models/on-chain-trade-type");
/**
 * Calculated DeBridge cross-chain trade.
 */
class DebridgeSolanaCrossChainTrade extends solana_cross_chain_trade_1.SolanaCrossChainTrade {
    get fromBlockchain() {
        return this.from.blockchain;
    }
    get fromContractAddress() {
        if (this.isProxyTrade) {
            throw new Error('Solana contract is not implemented yet');
        }
        return rubic_proxy_contract_address_1.rubicProxyContractAddress[this.fromBlockchain].gateway;
    }
    get methodName() {
        return 'startBridgeTokensViaGenericCrossChain';
    }
    constructor(crossChainTrade, providerAddress, routePath) {
        super(providerAddress, routePath);
        this.type = cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.DEBRIDGE;
        this.isAggregator = false;
        this.onChainSubtype = {
            from: on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.DLN,
            to: on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.DLN
        };
        this.bridgeType = bridge_type_1.BRIDGE_TYPE.DEBRIDGE;
        this.latestFixedFee = null;
        this.from = crossChainTrade.from;
        this.to = crossChainTrade.to;
        this.transactionRequest = crossChainTrade.transactionRequest;
        this.priceImpact = crossChainTrade.priceImpact;
        this.slippage = crossChainTrade.slippage;
        this.toTokenAmountMin = crossChainTrade.toTokenAmountMin;
        this.feeInfo = crossChainTrade.feeInfo;
        this.cryptoFeeToken = crossChainTrade.cryptoFeeToken;
        this.transitAmount = crossChainTrade.transitAmount;
    }
    async swapDirect(options = {}) {
        this.checkWalletConnected();
        await this.checkAllowanceAndApprove(options);
        let transactionHash;
        try {
            const { tx: { data } } = await this.getTransactionRequest(options?.receiverAddress, options?.directTransaction);
            const { onConfirm } = options;
            const onTransactionHash = (hash) => {
                if (onConfirm) {
                    onConfirm(hash);
                }
                transactionHash = hash;
            };
            await this.web3Private.sendTransaction({ data, onTransactionHash });
            return transactionHash;
        }
        catch (err) {
            if (err?.error?.errorId === 'ERROR_LOW_GIVE_AMOUNT') {
                throw new errors_1.TooLowAmountError();
            }
            if (err instanceof errors_1.FailedToCheckForTransactionReceiptError) {
                return transactionHash;
            }
            throw (0, errors_2.parseError)(err);
        }
    }
    async getContractParams(_options, _skipAmountChangeCheck = false) {
        throw new Error('Solana contracts is not implemented yet');
    }
    async getTransactionRequest(receiverAddress, transactionConfig, skipAmountChangeCheck = false) {
        if (transactionConfig && this.latestFixedFee) {
            return {
                tx: {
                    data: transactionConfig.data
                },
                fixFee: this.latestFixedFee
            };
        }
        const sameChain = blockchains_info_1.BlockchainsInfo.getChainType(this.from.blockchain) ===
            blockchains_info_1.BlockchainsInfo.getChainType(this.to.blockchain);
        const walletAddress = this.web3Private.address;
        const params = {
            ...this.transactionRequest,
            ...(receiverAddress && { dstChainTokenOutRecipient: receiverAddress }),
            senderAddress: walletAddress,
            srcChainRefundAddress: walletAddress,
            dstChainOrderAuthorityAddress: sameChain
                ? receiverAddress || walletAddress
                : receiverAddress,
            srcChainOrderAuthorityAddress: sameChain
                ? receiverAddress || walletAddress
                : walletAddress,
            referralCode: '4350'
        };
        const { tx, fixFee, estimation } = await dln_api_service_1.DlnApiService.fetchCrossChainSwapData(params);
        this.latestFixedFee = Boolean(fixFee) ? fixFee : '0';
        if (!skipAmountChangeCheck) {
            this.checkAmountChange({ data: tx.data, value: '', to: '' }, estimation.dstChainTokenOut.amount, this.to.stringWeiAmount);
        }
        return { tx, fixFee };
    }
    getTradeInfo() {
        return {
            estimatedGas: this.estimatedGas,
            feeInfo: this.feeInfo,
            priceImpact: this.priceImpact ?? null,
            slippage: this.slippage,
            routePath: this.routePath
        };
    }
    getTradeAmountRatio(fromUsd) {
        const usdCryptoFee = this.cryptoFeeToken.price.multipliedBy(this.cryptoFeeToken.tokenAmount);
        return fromUsd.plus(usdCryptoFee.isNaN() ? 0 : usdCryptoFee).dividedBy(this.to.tokenAmount);
    }
}
exports.DebridgeSolanaCrossChainTrade = DebridgeSolanaCrossChainTrade;
//# sourceMappingURL=debridge-solana-cross-chain-trade.js.map