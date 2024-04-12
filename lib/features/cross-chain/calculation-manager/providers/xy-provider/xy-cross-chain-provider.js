"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XyCrossChainProvider = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../common/errors");
const tokens_1 = require("../../../../../common/tokens");
const blockchain_1 = require("../../../../../common/utils/blockchain");
const blockchain_id_1 = require("../../../../../core/blockchain/utils/blockchains-info/constants/blockchain-id");
const evm_web3_pure_1 = require("../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const web3_pure_1 = require("../../../../../core/blockchain/web3-pure/web3-pure");
const injector_1 = require("../../../../../core/injector/injector");
const xy_api_params_1 = require("../../../../common/providers/xy/constants/xy-api-params");
const xy_utils_1 = require("../../../../common/providers/xy/utils/xy-utils");
const get_from_without_fee_1 = require("../../../../common/utils/get-from-without-fee");
const cross_chain_trade_type_1 = require("../../models/cross-chain-trade-type");
const cross_chain_provider_1 = require("../common/cross-chain-provider");
const proxy_cross_chain_evm_trade_1 = require("../common/proxy-cross-chain-evm-facade/proxy-cross-chain-evm-trade");
const xy_supported_blockchains_1 = require("./constants/xy-supported-blockchains");
const xy_cross_chain_trade_1 = require("./xy-cross-chain-trade");
const on_chain_trade_type_1 = require("../../../../on-chain/calculation-manager/providers/common/models/on-chain-trade-type");
class XyCrossChainProvider extends cross_chain_provider_1.CrossChainProvider {
    constructor() {
        super(...arguments);
        this.type = cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.XY;
    }
    isSupportedBlockchain(blockchain) {
        return xy_supported_blockchains_1.xySupportedBlockchains.some(supportedBlockchain => supportedBlockchain === blockchain);
    }
    async calculate(fromToken, toToken, options) {
        const fromBlockchain = fromToken.blockchain;
        const toBlockchain = toToken.blockchain;
        const useProxy = options?.useProxy?.[this.type] ?? true;
        if (!this.areSupportedBlockchains(fromBlockchain, toBlockchain)) {
            return {
                trade: null,
                error: new errors_1.NotSupportedTokensError(),
                tradeType: this.type
            };
        }
        try {
            const receiverAddress = options.receiverAddress || this.getWalletAddress(fromBlockchain);
            const feeInfo = await this.getFeeInfo(fromBlockchain, options.providerAddress, fromToken, useProxy);
            const fromWithoutFee = (0, get_from_without_fee_1.getFromWithoutFee)(fromToken, feeInfo.rubicProxy?.platformFee?.percent);
            const slippageTolerance = options.slippageTolerance * 100;
            const requestParams = {
                srcChainId: blockchain_id_1.blockchainId[fromBlockchain],
                srcQuoteTokenAddress: fromToken.isNative ? xy_api_params_1.XY_NATIVE_ADDRESS : fromToken.address,
                srcQuoteTokenAmount: fromWithoutFee.stringWeiAmount,
                dstChainId: blockchain_id_1.blockchainId[toBlockchain],
                dstQuoteTokenAddress: toToken.isNative ? xy_api_params_1.XY_NATIVE_ADDRESS : toToken.address,
                slippage: slippageTolerance
            };
            const { success, routes, errorCode, errorMsg } = await injector_1.Injector.httpClient.get(`${xy_api_params_1.XY_API_ENDPOINT}/quote`, {
                params: { ...requestParams }
            });
            if (!success) {
                (0, xy_utils_1.xyAnalyzeStatusCode)(errorCode, errorMsg);
            }
            const { srcSwapDescription, bridgeDescription, dstSwapDescription, dstQuoteTokenAmount } = routes[0];
            const to = new tokens_1.PriceTokenAmount({
                ...toToken.asStruct,
                tokenAmount: web3_pure_1.Web3Pure.fromWei(dstQuoteTokenAmount, toToken.decimals)
            });
            const buildTxTransactionRequest = {
                ...requestParams,
                ...(srcSwapDescription?.provider && {
                    srcSwapProvider: srcSwapDescription?.provider
                }),
                ...(bridgeDescription?.provider && {
                    srcBridgeTokenAddress: bridgeDescription.srcBridgeTokenAddress,
                    bridgeProvider: bridgeDescription.provider,
                    dstBridgeTokenAddress: bridgeDescription.dstBridgeTokenAddress
                }),
                ...(dstSwapDescription?.provider && {
                    dstSwapProvider: dstSwapDescription?.provider
                }),
                receiver: receiverAddress
            };
            const gasData = options.gasCalculation === 'enabled'
                ? await xy_cross_chain_trade_1.XyCrossChainTrade.getGasData(fromToken, to, buildTxTransactionRequest, feeInfo, options.providerAddress)
                : null;
            return {
                trade: new xy_cross_chain_trade_1.XyCrossChainTrade({
                    from: fromToken,
                    to,
                    transactionRequest: buildTxTransactionRequest,
                    gasData,
                    priceImpact: fromToken.calculatePriceImpactPercent(to),
                    slippage: options.slippageTolerance,
                    feeInfo,
                    onChainTrade: null
                }, options.providerAddress, await this.getRoutePath(fromToken, to, {
                    srcSwapDescription,
                    bridgeDescription,
                    dstSwapDescription,
                    dstQuoteTokenAmount
                })),
                tradeType: this.type
            };
        }
        catch (err) {
            const rubicSdkError = cross_chain_provider_1.CrossChainProvider.parseError(err);
            return {
                trade: null,
                error: rubicSdkError,
                tradeType: this.type
            };
        }
    }
    async getFeeInfo(fromBlockchain, providerAddress, percentFeeToken, useProxy) {
        return proxy_cross_chain_evm_trade_1.ProxyCrossChainEvmTrade.getFeeInfo(fromBlockchain, providerAddress, percentFeeToken, useProxy);
    }
    async getRoutePath(fromToken, toToken, quote) {
        const transitFromAddress = quote.srcSwapDescription?.dstTokenAddress;
        const transitToAddress = quote.dstSwapDescription?.srcTokenAddress;
        const fromTokenAmount = transitFromAddress
            ? await tokens_1.TokenAmount.createToken({
                blockchain: fromToken.blockchain,
                address: (0, blockchain_1.compareAddresses)(transitFromAddress, xy_api_params_1.XY_NATIVE_ADDRESS)
                    ? evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS
                    : transitFromAddress,
                weiAmount: new bignumber_js_1.default(0)
            })
            : fromToken;
        const toTokenAmount = transitToAddress
            ? await tokens_1.TokenAmount.createToken({
                blockchain: toToken.blockchain,
                address: (0, blockchain_1.compareAddresses)(transitToAddress, xy_api_params_1.XY_NATIVE_ADDRESS)
                    ? evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS
                    : transitToAddress,
                weiAmount: new bignumber_js_1.default(0)
            })
            : toToken;
        const routePath = [];
        if (transitFromAddress) {
            routePath.push({
                type: 'on-chain',
                // @TODO provider: ON_CHAIN_TRADE_TYPE.XY_DEX,
                provider: on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.ONE_INCH,
                path: [fromToken, fromTokenAmount]
            });
        }
        routePath.push({
            type: 'cross-chain',
            provider: cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.XY,
            path: [fromTokenAmount, toTokenAmount]
        });
        if (transitToAddress) {
            routePath.push({
                type: 'on-chain',
                // @TODO provider: ON_CHAIN_TRADE_TYPE.XY_DEX,
                provider: on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.ONE_INCH,
                path: [toTokenAmount, toToken]
            });
        }
        return routePath;
    }
}
exports.XyCrossChainProvider = XyCrossChainProvider;
//# sourceMappingURL=xy-cross-chain-provider.js.map