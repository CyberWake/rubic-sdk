"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebridgeCrossChainProvider = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../common/errors");
const tokens_1 = require("../../../../../common/tokens");
const native_tokens_1 = require("../../../../../common/tokens/constants/native-tokens");
const blockchain_name_1 = require("../../../../../core/blockchain/models/blockchain-name");
const chain_type_1 = require("../../../../../core/blockchain/models/chain-type");
const blockchains_info_1 = require("../../../../../core/blockchain/utils/blockchains-info/blockchains-info");
const blockchain_id_1 = require("../../../../../core/blockchain/utils/blockchains-info/constants/blockchain-id");
const web3_pure_1 = require("../../../../../core/blockchain/web3-pure/web3-pure");
const dln_api_service_1 = require("../../../../common/providers/dln/dln-api-service");
const dln_utils_1 = require("../../../../common/providers/dln/dln-utils");
const get_from_without_fee_1 = require("../../../../common/utils/get-from-without-fee");
const cross_chain_trade_type_1 = require("../../models/cross-chain-trade-type");
const cross_chain_provider_1 = require("../common/cross-chain-provider");
const proxy_cross_chain_evm_trade_1 = require("../common/proxy-cross-chain-evm-facade/proxy-cross-chain-evm-trade");
const debridge_evm_cross_chain_trade_1 = require("./chains/debridge-evm-cross-chain-trade");
const debridge_cross_chain_supported_blockchain_1 = require("./constants/debridge-cross-chain-supported-blockchain");
const debridge_cross_chain_factory_1 = require("./debridge-cross-chain-factory");
const deflation_token_manager_1 = require("../../../../deflation-token-manager/deflation-token-manager");
const on_chain_trade_type_1 = require("../../../../on-chain/calculation-manager/providers/common/models/on-chain-trade-type");
class DebridgeCrossChainProvider extends cross_chain_provider_1.CrossChainProvider {
    constructor() {
        super(...arguments);
        this.type = cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.DEBRIDGE;
    }
    isSupportedBlockchain(blockchain) {
        return debridge_cross_chain_supported_blockchain_1.deBridgeCrossChainSupportedBlockchains.some(supportedBlockchain => supportedBlockchain === blockchain);
    }
    async calculate(from, toToken, options) {
        const fromBlockchain = from.blockchain;
        const toBlockchain = toToken.blockchain;
        const useProxy = options?.useProxy?.[this.type] ?? true;
        await this.checkDeflationTokens(from, toToken);
        if (!this.areSupportedBlockchains(fromBlockchain, toBlockchain)) {
            return {
                trade: null,
                error: new errors_1.NotSupportedTokensError(),
                tradeType: this.type
            };
        }
        try {
            const fakeAddress = dln_utils_1.DlnUtils.getFakeReceiver(toBlockchain);
            const feeInfo = await this.getFeeInfo(fromBlockchain, options.providerAddress, from, useProxy);
            const fromWithoutFee = (0, get_from_without_fee_1.getFromWithoutFee)(from, feeInfo.rubicProxy?.platformFee?.percent);
            const requestParams = {
                ...this.getAffiliateFee(fromBlockchain),
                srcChainId: blockchain_id_1.blockchainId[fromBlockchain],
                srcChainTokenIn: dln_utils_1.DlnUtils.getSupportedAddress(from),
                srcChainTokenInAmount: fromWithoutFee.stringWeiAmount,
                dstChainId: blockchain_id_1.blockchainId[toBlockchain],
                dstChainTokenOut: dln_utils_1.DlnUtils.getSupportedAddress(toToken),
                dstChainTokenOutRecipient: this.getWalletAddress(fromBlockchain) || fakeAddress,
                prependOperatingExpenses: false
            };
            const debridgeResponse = await dln_api_service_1.DlnApiService.fetchCrossChainQuote(requestParams);
            const to = new tokens_1.PriceTokenAmount({
                ...toToken.asStruct,
                tokenAmount: web3_pure_1.Web3Pure.fromWei(debridgeResponse.estimation.dstChainTokenOut.maxTheoreticalAmount, debridgeResponse.estimation.dstChainTokenOut.decimals)
            });
            const toTokenAmountMin = web3_pure_1.Web3Pure.fromWei(debridgeResponse.estimation.dstChainTokenOut.amount, debridgeResponse.estimation.dstChainTokenOut.decimals);
            const slippage = Number(to.tokenAmount
                .minus(toTokenAmountMin)
                .dividedBy(toTokenAmountMin)
                .multipliedBy(100)
                .toFixed(2));
            const transitToken = debridgeResponse.estimation.srcChainTokenOut ||
                debridgeResponse.estimation.srcChainTokenIn;
            const nativeToken = native_tokens_1.nativeTokensList[fromBlockchain];
            const cryptoFeeToken = await tokens_1.PriceTokenAmount.createFromToken({
                ...nativeToken,
                weiAmount: new bignumber_js_1.default(debridgeResponse.fixFee)
            });
            const gasData = await this.getGasData({ ...options, receiverAddress: fakeAddress }, from, to, requestParams, feeInfo);
            return {
                trade: debridge_cross_chain_factory_1.DebridgeCrossChainFactory.createTrade(fromBlockchain, {
                    from,
                    to,
                    transactionRequest: requestParams,
                    gasData,
                    priceImpact: from.calculatePriceImpactPercent(to),
                    allowanceTarget: debridgeResponse?.tx?.allowanceTarget,
                    slippage,
                    feeInfo: {
                        ...feeInfo,
                        provider: {
                            cryptoFee: {
                                amount: web3_pure_1.Web3Pure.fromWei(cryptoFeeToken.stringWeiAmount, cryptoFeeToken.decimals),
                                token: cryptoFeeToken
                            }
                        }
                    },
                    transitAmount: web3_pure_1.Web3Pure.fromWei(transitToken.amount, transitToken.decimals),
                    toTokenAmountMin,
                    cryptoFeeToken,
                    onChainTrade: null
                }, options.providerAddress, await this.getRoutePath(debridgeResponse.estimation, from, to)),
                tradeType: this.type
            };
        }
        catch (err) {
            const rubicSdkError = cross_chain_provider_1.CrossChainProvider.parseError(err);
            const debridgeApiError = this.parseDebridgeApiError(err);
            return {
                trade: null,
                error: debridgeApiError || rubicSdkError,
                tradeType: this.type
            };
        }
    }
    async getFeeInfo(fromBlockchain, providerAddress, percentFeeToken, useProxy) {
        return proxy_cross_chain_evm_trade_1.ProxyCrossChainEvmTrade.getFeeInfo(fromBlockchain, providerAddress, percentFeeToken, useProxy);
    }
    parseDebridgeApiError(httpErrorResponse) {
        if (httpErrorResponse?.error?.errorId === 'INCLUDED_GAS_FEE_NOT_COVERED_BY_INPUT_AMOUNT' ||
            httpErrorResponse?.error?.errorId === 'ERROR_LOW_GIVE_AMOUNT') {
            return new errors_1.TooLowAmountError();
        }
        // @TODO handle other debridge API error codes:
        // CONNECTOR_1INCH_RETURNED_ERROR
        // INCLUDED_GAS_FEE_CANNOT_BE_ESTIMATED_FOR_TRANSACTION_BUNDLE
        return null;
    }
    async getRoutePath(estimation, from, to) {
        const fromChainId = String(blockchain_id_1.blockchainId[from.blockchain]);
        const toChainId = String(blockchain_id_1.blockchainId[to.blockchain]);
        const transitFrom = [...estimation.costsDetails]
            .reverse()
            .find(el => el.chain === fromChainId);
        const transitTo = estimation.costsDetails.find(el => el.chain === toChainId);
        try {
            const fromTokenAmount = transitFrom
                ? await tokens_1.TokenAmount.createToken({
                    blockchain: from.blockchain,
                    address: transitFrom.tokenOut,
                    weiAmount: new bignumber_js_1.default(transitFrom.amountOut)
                })
                : from;
            const toTokenAmount = transitTo
                ? await tokens_1.TokenAmount.createToken({
                    blockchain: to.blockchain,
                    address: transitTo.tokenIn,
                    weiAmount: new bignumber_js_1.default(transitTo.amountIn)
                })
                : to;
            return [
                {
                    type: 'on-chain',
                    path: [from, fromTokenAmount],
                    provider: on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.DLN
                },
                {
                    type: 'on-chain',
                    path: [toTokenAmount, to],
                    provider: on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.DLN
                }
            ];
        }
        catch {
            return [
                {
                    type: 'cross-chain',
                    path: [from, to],
                    provider: cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.DEBRIDGE
                }
            ];
        }
    }
    async getGasData(options, from, to, requestParams, feeInfo) {
        if (options.gasCalculation !== 'enabled') {
            return null;
        }
        const blockchain = from.blockchain;
        const chainType = blockchains_info_1.BlockchainsInfo.getChainType(blockchain);
        if (chainType === chain_type_1.CHAIN_TYPE.EVM) {
            return debridge_evm_cross_chain_trade_1.DebridgeEvmCrossChainTrade.getGasData(from, to, requestParams, feeInfo, options.providerAddress, options.receiverAddress);
        }
        // Chain is not supported
        return null;
    }
    async checkDeflationTokens(from, toToken) {
        const deflationTokenManager = new deflation_token_manager_1.DeflationTokenManager();
        await deflationTokenManager.checkToken(from);
        await deflationTokenManager.checkToken(toToken);
    }
    getAffiliateFee(fromBlockchain) {
        if (fromBlockchain === blockchain_name_1.BLOCKCHAIN_NAME.SOLANA) {
            return {
                affiliateFeeRecipient: '4juPxgyQapaKdgxuCS7N8pRxjttXGRZsS5WTVZ42rNjn',
                affiliateFeePercent: 0.1
            };
        }
        return {};
    }
}
exports.DebridgeCrossChainProvider = DebridgeCrossChainProvider;
//# sourceMappingURL=debridge-cross-chain-provider.js.map