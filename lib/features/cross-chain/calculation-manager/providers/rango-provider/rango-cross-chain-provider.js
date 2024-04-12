"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangoCrossChainProvider = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const tokens_1 = require("../../../../../common/tokens");
const native_tokens_1 = require("../../../../../common/tokens/constants/native-tokens");
const web3_pure_1 = require("../../../../../core/blockchain/web3-pure/web3-pure");
const rango_api_common_1 = require("../../../../common/providers/rango/constants/rango-api-common");
const rango_supported_blockchains_1 = require("../../../../common/providers/rango/models/rango-supported-blockchains");
const rango_parser_1 = require("../../../../common/providers/rango/services/rango-parser");
const rango_utils_1 = require("../../../../common/providers/rango/utils/rango-utils");
const get_from_without_fee_1 = require("../../../../common/utils/get-from-without-fee");
const cross_chain_trade_type_1 = require("../../models/cross-chain-trade-type");
const cross_chain_provider_1 = require("../common/cross-chain-provider");
const proxy_cross_chain_evm_trade_1 = require("../common/proxy-cross-chain-evm-facade/proxy-cross-chain-evm-trade");
const rango_cross_chain_trade_1 = require("./rango-cross-chain-trade");
const rango_cross_chain_api_service_1 = require("./services/rango-cross-chain-api-service");
const rango_cross_chain_params_parser_1 = require("./services/rango-cross-chain-params-parser");
class RangoCrossChainProvider extends cross_chain_provider_1.CrossChainProvider {
    constructor() {
        super(...arguments);
        this.type = cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.RANGO;
        this.rangoSupportedBlockchains = rango_supported_blockchains_1.rangoSupportedBlockchains;
    }
    isSupportedBlockchain(blockchain) {
        return this.rangoSupportedBlockchains.some(supportedBlockchain => supportedBlockchain === blockchain);
    }
    async calculate(from, toToken, options) {
        const fromBlockchain = from.blockchain;
        const useProxy = options?.useProxy?.[this.type] ?? true;
        try {
            const feeInfo = await this.getFeeInfo(fromBlockchain, options.providerAddress, from, useProxy);
            const fromWithoutFee = (0, get_from_without_fee_1.getFromWithoutFee)(from, feeInfo.rubicProxy?.platformFee?.percent);
            const bestRouteParams = await rango_parser_1.RangoCommonParser.getBestRouteQueryParams(fromWithoutFee, toToken, { ...options, swapperGroups: options.rangoDisabledProviders });
            const { route } = await rango_cross_chain_api_service_1.RangoCrossChainApiService.getBestRoute(bestRouteParams);
            const { outputAmountMin, outputAmount, path, fee } = route;
            const toTokenAmountMin = web3_pure_1.Web3Pure.fromWei(outputAmountMin, toToken.decimals);
            const to = new tokens_1.PriceTokenAmount({
                ...toToken.asStruct,
                tokenAmount: web3_pure_1.Web3Pure.fromWei(outputAmount, toToken.decimals)
            });
            const routePath = await this.getRoutePath(from, to, path);
            const swapQueryParams = await rango_parser_1.RangoCommonParser.getSwapQueryParams(fromWithoutFee, toToken, { ...options, swapperGroups: options.rangoDisabledProviders });
            const cryptoFee = await this.getCryptoFee(fee, fromBlockchain);
            if (cryptoFee?.amount.gt(0)) {
                feeInfo.provider = {
                    cryptoFee
                };
            }
            const bridgeSubtype = routePath.find(el => el.type === 'cross-chain')?.provider;
            const tradeParams = await rango_cross_chain_params_parser_1.RangoCrossChainParser.getTradeConstructorParams({
                fromToken: from,
                toToken: to,
                options,
                routePath,
                feeInfo,
                toTokenAmountMin,
                swapQueryParams,
                bridgeSubtype
            });
            const trade = new rango_cross_chain_trade_1.RangoCrossChainTrade(tradeParams);
            const tradeType = this.type;
            return { trade, tradeType };
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
    async getRoutePath(fromToken, toToken, path) {
        if (!path) {
            return [{ type: 'cross-chain', provider: this.type, path: [fromToken, toToken] }];
        }
        return Promise.all(path.map(path => this.getStep(path)));
    }
    async getStep(rangoPath) {
        const type = rangoPath.swapperType === 'DEX' ? 'on-chain' : 'cross-chain';
        const provider = rango_utils_1.RangoUtils.getTradeTypeForRubic(type, rangoPath.swapper.swapperGroup);
        const fromBlockchain = rango_utils_1.RangoUtils.getRubicBlockchainByRangoBlockchain(rangoPath.from.blockchain);
        const toBlockchain = rango_utils_1.RangoUtils.getRubicBlockchainByRangoBlockchain(rangoPath.to.blockchain);
        const fromTokenAmount = await tokens_1.TokenAmount.createToken({
            address: rangoPath.from.address || native_tokens_1.nativeTokensList[fromBlockchain].address,
            blockchain: fromBlockchain,
            weiAmount: new bignumber_js_1.default(rangoPath.inputAmount)
        });
        const toTokenAmount = await tokens_1.TokenAmount.createToken({
            address: rangoPath.to.address || native_tokens_1.nativeTokensList[toBlockchain].address,
            blockchain: toBlockchain,
            weiAmount: new bignumber_js_1.default(rangoPath.expectedOutput)
        });
        return {
            provider: provider,
            type: type,
            path: [fromTokenAmount, toTokenAmount]
        };
    }
    async getFeeInfo(fromBlockchain, providerAddress, percentFeeToken, useProxy) {
        return proxy_cross_chain_evm_trade_1.ProxyCrossChainEvmTrade.getFeeInfo(fromBlockchain, providerAddress, percentFeeToken, useProxy);
    }
    async getCryptoFee(fee, fromBlockchain) {
        const nativeToken = native_tokens_1.nativeTokensList[fromBlockchain];
        if (!fee) {
            return {
                amount: new bignumber_js_1.default(0),
                token: await tokens_1.PriceTokenAmount.createFromToken({
                    ...nativeToken,
                    weiAmount: new bignumber_js_1.default(0)
                })
            };
        }
        const feeAmount = fee
            .filter(fee => fee.expenseType === 'FROM_SOURCE_WALLET')
            .reduce((acc, fee) => acc.plus(fee.amount), new bignumber_js_1.default(0));
        const cryptoFeeToken = await tokens_1.PriceTokenAmount.createFromToken({
            ...nativeToken,
            weiAmount: new bignumber_js_1.default(feeAmount)
        });
        return {
            amount: web3_pure_1.Web3Pure.fromWei(feeAmount, nativeToken.decimals),
            token: cryptoFeeToken
        };
    }
}
exports.RangoCrossChainProvider = RangoCrossChainProvider;
RangoCrossChainProvider.apiKey = rango_api_common_1.RANGO_API_KEY;
RangoCrossChainProvider.apiEndpoint = rango_api_common_1.RANGO_API_ENDPOINT;
//# sourceMappingURL=rango-cross-chain-provider.js.map