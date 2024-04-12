"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LimitOrderManager = void 0;
const limit_order_protocol_utils_1 = require("@1inch/limit-order-protocol-utils");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../common/errors");
const tokens_1 = require("../../common/tokens");
const blockchain_name_1 = require("../../core/blockchain/models/blockchain-name");
const chain_type_1 = require("../../core/blockchain/models/chain-type");
const blockchain_id_1 = require("../../core/blockchain/utils/blockchains-info/constants/blockchain-id");
const evm_web3_private_1 = require("../../core/blockchain/web3-private-service/web3-private/evm-web3-private/evm-web3-private");
const injector_1 = require("../../core/injector/injector");
const limit_order_api_service_1 = require("./limit-order-api-service");
const supported_blockchains_1 = require("./models/supported-blockchains");
const get_parsed_token_amounts_1 = require("./utils/get-parsed-token-amounts");
class LimitOrderManager {
    constructor() {
        this.apiService = new limit_order_api_service_1.LimitOrderApiService();
    }
    static isSupportedBlockchain(blockchain) {
        return supported_blockchains_1.limitOrderSupportedBlockchains.some(supportedBlockchain => supportedBlockchain === blockchain);
    }
    get web3Private() {
        return injector_1.Injector.web3PrivateService.getWeb3Private(chain_type_1.CHAIN_TYPE.EVM);
    }
    get walletAddress() {
        return this.web3Private.address;
    }
    getWeb3Public(blockchain) {
        return injector_1.Injector.web3PublicService.getWeb3Public(blockchain);
    }
    checkWalletConnected() {
        if (!this.walletAddress) {
            throw new errors_1.WalletNotConnectedError();
        }
    }
    async needApprove(fromToken, fromAmount) {
        this.checkWalletConnected();
        const fromTokenAmount = await tokens_1.TokenAmount.createToken({
            ...fromToken,
            tokenAmount: new bignumber_js_1.default(fromAmount)
        });
        const { blockchain } = fromToken;
        const chainId = blockchain_id_1.blockchainId[blockchain];
        const contractAddress = limit_order_protocol_utils_1.limirOrderProtocolAdresses[chainId];
        const allowance = await this.getWeb3Public(blockchain).getAllowance(fromToken.address, this.walletAddress, contractAddress);
        return fromTokenAmount.weiAmount.gt(allowance);
    }
    async approve(fromToken, fromAmount, options, checkNeedApprove = true) {
        if (checkNeedApprove) {
            const needApprove = await this.needApprove(fromToken, fromAmount);
            if (!needApprove) {
                throw new errors_1.UnnecessaryApproveError();
            }
        }
        this.checkWalletConnected();
        const { blockchain } = fromToken;
        await this.web3Private.checkBlockchainCorrect(blockchain);
        const fromTokenAmount = await tokens_1.TokenAmount.createToken({
            ...fromToken,
            tokenAmount: new bignumber_js_1.default(fromAmount)
        });
        const approveAmount = fromToken.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.GNOSIS ||
            fromToken.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.CRONOS
            ? fromTokenAmount.weiAmount
            : 'infinity';
        const chainId = blockchain_id_1.blockchainId[blockchain];
        const contractAddress = limit_order_protocol_utils_1.limirOrderProtocolAdresses[chainId];
        return this.web3Private.approveTokens(fromTokenAmount.address, contractAddress, approveAmount, options);
    }
    async checkAllowanceAndApprove(fromTokenAmount, options) {
        const needApprove = await this.needApprove(fromTokenAmount, fromTokenAmount.tokenAmount);
        if (!needApprove) {
            return;
        }
        const approveOptions = {
            onTransactionHash: options?.onApprove,
            feeLimit: options?.approveFeeLimit
        };
        await this.approve(fromTokenAmount, fromTokenAmount.tokenAmount, approveOptions, false);
    }
    async createOrder(fromToken, toToken, fromAmount, toAmount, options) {
        const { fromTokenAmount, toTokenAmount } = await (0, get_parsed_token_amounts_1.getParsedTokenAmounts)(fromToken, toToken, fromAmount, toAmount);
        if (fromTokenAmount.blockchain !== toTokenAmount.blockchain) {
            throw new errors_1.RubicSdkError('Blockchains must be equal');
        }
        this.checkWalletConnected();
        const { blockchain } = fromToken;
        await this.web3Private.checkBlockchainCorrect(blockchain);
        await this.checkAllowanceAndApprove(fromTokenAmount);
        const chainId = blockchain_id_1.blockchainId[blockchain];
        const connector = new limit_order_protocol_utils_1.Web3ProviderConnector(this.web3Private.web3);
        const contractAddress = limit_order_protocol_utils_1.limirOrderProtocolAdresses[chainId];
        const simpleLimitOrderPredicate = await this.getLimitOrderPredicate(chainId, connector, options.deadline);
        const limitOrderBuilder = new limit_order_protocol_utils_1.LimitOrderBuilder(contractAddress, chainId, connector);
        const limitOrder = limitOrderBuilder.buildLimitOrder({
            makerAssetAddress: fromTokenAmount.address,
            takerAssetAddress: toTokenAmount.address,
            makerAddress: this.walletAddress,
            makingAmount: fromTokenAmount.stringWeiAmount,
            takingAmount: toTokenAmount.stringWeiAmount,
            predicate: simpleLimitOrderPredicate
        });
        const limitOrderTypedData = limitOrderBuilder.buildLimitOrderTypedData(limitOrder);
        const limitOrderHash = limitOrderBuilder.buildLimitOrderHash(limitOrderTypedData);
        let limitOrderSignature;
        try {
            limitOrderSignature = await limitOrderBuilder.buildOrderSignature(this.walletAddress, limitOrderTypedData);
        }
        catch (err) {
            throw evm_web3_private_1.EvmWeb3Private.parseError(err);
        }
        await this.apiService.createLimitOrder(chainId, {
            orderHash: limitOrderHash,
            signature: limitOrderSignature,
            data: limitOrder
        });
        return limitOrderHash;
    }
    async getLimitOrderPredicate(chainId, connector, deadline) {
        const contractAddress = limit_order_protocol_utils_1.limirOrderProtocolAdresses[chainId];
        const seriesContractAddress = limit_order_protocol_utils_1.seriesNonceManagerContractAddresses[chainId];
        const limitOrderProtocolFacade = new limit_order_protocol_utils_1.LimitOrderProtocolFacade(contractAddress, chainId, connector);
        const limitOrderPredicateBuilder = new limit_order_protocol_utils_1.LimitOrderPredicateBuilder(limitOrderProtocolFacade);
        const seriesNonceManagerFacade = new limit_order_protocol_utils_1.SeriesNonceManagerFacade(seriesContractAddress, chainId, connector);
        const seriesNonceManagerPredicateBuilder = new limit_order_protocol_utils_1.SeriesNonceManagerPredicateBuilder(seriesNonceManagerFacade);
        const expiration = Math.floor(Date.now() / 1000) + deadline * 60;
        const nonce = await seriesNonceManagerFacade.getNonce(limit_order_protocol_utils_1.NonceSeriesV2.LimitOrderV3, this.walletAddress);
        return limitOrderPredicateBuilder.arbitraryStaticCall(seriesNonceManagerPredicateBuilder.facade, seriesNonceManagerPredicateBuilder.timestampBelowAndNonceEquals(limit_order_protocol_utils_1.NonceSeriesV2.LimitOrderV3, expiration, BigInt(nonce), this.walletAddress));
    }
    getUserTrades(userAddress) {
        return this.apiService.getUserOrders(userAddress);
    }
    async cancelOrder(blockchain, orderHash, options = {}) {
        this.checkWalletConnected();
        await this.web3Private.checkBlockchainCorrect(blockchain);
        const chainId = blockchain_id_1.blockchainId[blockchain];
        const contractAddress = limit_order_protocol_utils_1.limirOrderProtocolAdresses[chainId];
        const callData = await this.getCancelCallData(blockchain, orderHash);
        let transactionHash;
        const onTransactionHash = (hash) => {
            transactionHash = hash;
            options.onConfirm?.(hash);
        };
        try {
            await this.web3Private.trySendTransaction(contractAddress, {
                data: callData,
                onTransactionHash,
                gas: options.gasLimit,
                gasPriceOptions: options.gasPriceOptions
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
    async getCancelCallData(blockchain, orderHash) {
        const order = await this.apiService.getOrderByHash(this.walletAddress, blockchain, orderHash);
        if (!order) {
            throw new errors_1.RubicSdkError(`No order with hash ${orderHash}`);
        }
        const chainId = blockchain_id_1.blockchainId[blockchain];
        const connector = new limit_order_protocol_utils_1.Web3ProviderConnector(this.web3Private.web3);
        const limitOrderProtocolFacade = new limit_order_protocol_utils_1.LimitOrderProtocolFacade(limit_order_protocol_utils_1.limirOrderProtocolAdresses[chainId], chainId, connector);
        return limitOrderProtocolFacade.cancelLimitOrder(order.data);
    }
    async fillOrder(takingToken, orderHash, options = {}) {
        this.checkWalletConnected();
        const blockchain = takingToken.blockchain;
        await this.web3Private.checkBlockchainCorrect(blockchain);
        const chainId = blockchain_id_1.blockchainId[blockchain];
        const contractAddress = limit_order_protocol_utils_1.limirOrderProtocolAdresses[chainId];
        const callData = await this.getFillCallData(blockchain, orderHash, takingToken.stringWeiAmount);
        let transactionHash;
        const onTransactionHash = (hash) => {
            transactionHash = hash;
            options.onConfirm?.(hash);
        };
        try {
            await this.web3Private.trySendTransaction(contractAddress, {
                data: callData,
                onTransactionHash,
                gas: options.gasLimit,
                gasPriceOptions: options.gasPriceOptions
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
    async getFillCallData(blockchain, orderHash, takingAmountWei) {
        const order = await this.apiService.getOrderByHash(this.walletAddress, blockchain, orderHash);
        if (!order) {
            throw new errors_1.RubicSdkError(`No order with hash ${orderHash}`);
        }
        const chainId = blockchain_id_1.blockchainId[blockchain];
        const connector = new limit_order_protocol_utils_1.Web3ProviderConnector(this.web3Private.web3);
        const limitOrderProtocolFacade = new limit_order_protocol_utils_1.LimitOrderProtocolFacade(limit_order_protocol_utils_1.limirOrderProtocolAdresses[chainId], chainId, connector);
        return limitOrderProtocolFacade.fillLimitOrder({
            order: order.data,
            signature: order.signature,
            makingAmount: '0',
            takingAmount: takingAmountWei,
            thresholdAmount: '0'
        });
    }
}
exports.LimitOrderManager = LimitOrderManager;
//# sourceMappingURL=limit-order-manager.js.map