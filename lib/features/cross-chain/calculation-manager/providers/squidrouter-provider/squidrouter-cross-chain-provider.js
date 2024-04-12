"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SquidrouterCrossChainProvider = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../common/errors");
const tokens_1 = require("../../../../../common/tokens");
const native_tokens_1 = require("../../../../../common/tokens/constants/native-tokens");
const blockchain_1 = require("../../../../../common/utils/blockchain");
const blockchain_id_1 = require("../../../../../core/blockchain/utils/blockchains-info/constants/blockchain-id");
const web3_pure_1 = require("../../../../../core/blockchain/web3-pure/web3-pure");
const get_from_without_fee_1 = require("../../../../common/utils/get-from-without-fee");
const cross_chain_trade_type_1 = require("../../models/cross-chain-trade-type");
const cross_chain_provider_1 = require("../common/cross-chain-provider");
const proxy_cross_chain_evm_trade_1 = require("../common/proxy-cross-chain-evm-facade/proxy-cross-chain-evm-trade");
const squidrouter_cross_chain_supported_blockchain_1 = require("./constants/squidrouter-cross-chain-supported-blockchain");
const squidrouter_cross_chain_trade_1 = require("./squidrouter-cross-chain-trade");
const on_chain_trade_type_1 = require("../../../../on-chain/calculation-manager/providers/common/models/on-chain-trade-type");
class SquidrouterCrossChainProvider extends cross_chain_provider_1.CrossChainProvider {
    constructor() {
        super(...arguments);
        this.nativeAddress = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
        this.type = cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.SQUIDROUTER;
    }
    isSupportedBlockchain(blockchain) {
        return squidrouter_cross_chain_supported_blockchain_1.squidrouterCrossChainSupportedBlockchains.some(supportedBlockchain => supportedBlockchain === blockchain);
    }
    async calculate(from, toToken, options) {
        const fromBlockchain = from.blockchain;
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
            const feeInfo = await this.getFeeInfo(fromBlockchain, options.providerAddress, from, useProxy);
            const fromWithoutFee = (0, get_from_without_fee_1.getFromWithoutFee)(from, feeInfo.rubicProxy?.platformFee?.percent);
            const fakeAddress = '0xe388Ed184958062a2ea29B7fD049ca21244AE02e';
            const receiver = options?.receiverAddress || this.getWalletAddress(fromBlockchain) || fakeAddress;
            const requestParams = {
                fromChain: blockchain_id_1.blockchainId[fromBlockchain],
                fromToken: from.isNative ? this.nativeAddress : from.address,
                fromAmount: fromWithoutFee.stringWeiAmount,
                toChain: blockchain_id_1.blockchainId[toBlockchain],
                toToken: toToken.isNative ? this.nativeAddress : toToken.address,
                toAddress: receiver,
                slippage: Number(options.slippageTolerance * 100)
            };
            const { route: { transactionRequest, estimate } } = await squidrouter_cross_chain_trade_1.SquidrouterCrossChainTrade.getResponseFromApiToTransactionRequest(requestParams);
            const squidGasData = {
                gasLimit: new bignumber_js_1.default(transactionRequest.gasLimit).plus(useProxy ? 120000 : 0),
                gasPrice: web3_pure_1.Web3Pure.fromWei(transactionRequest.gasPrice),
                maxFeePerGas: new bignumber_js_1.default(transactionRequest.maxFeePerGas),
                maxPriorityFeePerGas: new bignumber_js_1.default(transactionRequest.maxPriorityFeePerGas)
            };
            const to = new tokens_1.PriceTokenAmount({
                ...toToken.asStruct,
                tokenAmount: web3_pure_1.Web3Pure.fromWei(estimate.toAmount, toToken.decimals)
            });
            const gasData = options.gasCalculation === 'enabled'
                ? await squidrouter_cross_chain_trade_1.SquidrouterCrossChainTrade.getGasData(from, to, requestParams, feeInfo, receiver, options.providerAddress)
                : null;
            const feeAmount = estimate.feeCosts
                .filter(fee => (0, blockchain_1.compareAddresses)(this.nativeAddress, fee.token.address))
                .reduce((acc, fee) => acc.plus(fee.amount), new bignumber_js_1.default(0));
            const nativeToken = native_tokens_1.nativeTokensList[fromBlockchain];
            const cryptoFeeToken = await tokens_1.PriceTokenAmount.createFromToken({
                ...nativeToken,
                weiAmount: new bignumber_js_1.default(feeAmount)
            });
            const transitRoute = estimate.route.toChain.at(-1);
            const transitUSDAmount = 'toAmount' in transitRoute
                ? web3_pure_1.Web3Pure.fromWei(transitRoute.toAmount, transitRoute.toToken.decimals)
                : new bignumber_js_1.default(estimate.toAmountUSD);
            return {
                trade: new squidrouter_cross_chain_trade_1.SquidrouterCrossChainTrade({
                    from,
                    to,
                    gasData: gasData || squidGasData,
                    priceImpact: from.calculatePriceImpactPercent(to),
                    allowanceTarget: transactionRequest.targetAddress,
                    slippage: options.slippageTolerance,
                    feeInfo: {
                        ...feeInfo,
                        provider: {
                            cryptoFee: {
                                amount: web3_pure_1.Web3Pure.fromWei(feeAmount, nativeToken.decimals),
                                token: cryptoFeeToken
                            }
                        }
                    },
                    transitUSDAmount,
                    cryptoFeeToken,
                    onChainTrade: null,
                    onChainSubtype: { from: undefined, to: undefined },
                    transactionRequest: requestParams
                }, options.providerAddress, await this.getRoutePath(estimate, from, to)),
                tradeType: this.type
            };
        }
        catch (err) {
            let rubicSdkError = cross_chain_provider_1.CrossChainProvider.parseError(err);
            const httpError = err?.error?.errors?.[0];
            if (httpError?.message) {
                rubicSdkError = new errors_1.RubicSdkError(httpError.message);
            }
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
    async getRoutePath(estimation, from, to) {
        const transitFrom = estimation.route.fromChain.map(el => ({
            address: el.toToken.address,
            amount: new bignumber_js_1.default(el.toAmount)
        }));
        const transitTo = estimation.route.toChain
            // @ts-ignore
            .filter(el => 'dex' in el).map(el => ({
            amount: new bignumber_js_1.default(el.fromAmount),
            address: el.fromToken.address
        }));
        const fromTransitTokens = await tokens_1.Token.createTokens(transitFrom.map(el => el.address), from.blockchain);
        const toTransitTokens = await tokens_1.Token.createTokens(transitTo.map(el => el.address), to.blockchain);
        const fromTokenAmount = fromTransitTokens.map((token, index) => new tokens_1.TokenAmount({ ...token, weiAmount: transitFrom[index].amount }));
        const toTokenAmount = toTransitTokens.map((token, index) => new tokens_1.TokenAmount({ ...token, weiAmount: transitTo[index].amount }));
        const routePath = [];
        if (fromTokenAmount.length) {
            routePath.push({
                type: 'on-chain',
                // @TODO Add generic provider
                provider: on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.ONE_INCH,
                path: [from, ...fromTokenAmount]
            });
        }
        routePath.push({
            type: 'cross-chain',
            // @TODO Add generic provider
            provider: cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.SQUIDROUTER,
            path: [fromTokenAmount.at(-1) || from, toTokenAmount.at(0) || to]
        });
        if (toTokenAmount.length) {
            routePath.push({
                type: 'on-chain',
                // @TODO Add generic provider
                provider: on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.ONE_INCH,
                path: [...toTokenAmount, to]
            });
        }
        return routePath;
    }
}
exports.SquidrouterCrossChainProvider = SquidrouterCrossChainProvider;
SquidrouterCrossChainProvider.apiEndpoint = 'https://api.0xsquid.com/v1/';
//# sourceMappingURL=squidrouter-cross-chain-provider.js.map