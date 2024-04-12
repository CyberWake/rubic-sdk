"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangoCommonParser = void 0;
const web3_pure_1 = require("../../../../../core/blockchain/web3-pure/web3-pure");
const injector_1 = require("../../../../../core/injector/injector");
const fake_wallet_address_1 = require("../../../constants/fake-wallet-address");
const rango_api_common_1 = require("../constants/rango-api-common");
const rango_utils_1 = require("../utils/rango-utils");
class RangoCommonParser {
    /**
     * @description Transform parameters to required view for rango-api
     */
    static async getBestRouteQueryParams(from, toToken, options) {
        const fromParam = await rango_utils_1.RangoUtils.getFromToQueryParam(from);
        const toParam = await rango_utils_1.RangoUtils.getFromToQueryParam(toToken);
        const amountParam = web3_pure_1.Web3Pure.toWei(from.tokenAmount, from.decimals);
        const apiKey = rango_api_common_1.RANGO_API_KEY;
        const swapperGroups = options.swapperGroups
            ?.map(swapper => rango_utils_1.RangoUtils.getTradeTypeForRango(swapper))
            .join(',');
        return {
            apiKey,
            from: fromParam,
            to: toParam,
            amount: amountParam,
            ...(options.slippageTolerance && { slippage: options.slippageTolerance * 100 }),
            ...(swapperGroups?.length && { swapperGroups }),
            swappersGroupsExclude: options?.swappersGroupsExclude ?? true,
            contractCall: true
        };
    }
    static async getSwapQueryParams(fromToken, toToken, options) {
        const amount = web3_pure_1.Web3Pure.toWei(fromToken.tokenAmount, fromToken.decimals);
        const from = await rango_utils_1.RangoUtils.getFromToQueryParam(fromToken);
        const to = await rango_utils_1.RangoUtils.getFromToQueryParam(toToken);
        const walletAddress = injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(fromToken.blockchain).address;
        const fromAddress = options.fromAddress || walletAddress;
        const toAddress = options?.receiverAddress || walletAddress || fake_wallet_address_1.FAKE_WALLET_ADDRESS;
        const slippage = options.slippageTolerance * 100;
        const apiKey = rango_api_common_1.RANGO_API_KEY;
        const swapperGroups = options.swapperGroups
            ?.map(swapper => rango_utils_1.RangoUtils.getTradeTypeForRango(swapper))
            .join(',');
        return {
            apiKey,
            amount,
            from,
            to,
            fromAddress,
            slippage,
            toAddress,
            ...(swapperGroups?.length && { swapperGroups }),
            swappersGroupsExclude: options?.swappersGroupsExclude ?? true,
            contractCall: true
        };
    }
    static getTxStatusQueryParams(srcTxHash, requestId) {
        const apiKey = rango_api_common_1.RANGO_API_KEY;
        return { apiKey, requestId, txId: srcTxHash };
    }
}
exports.RangoCommonParser = RangoCommonParser;
//# sourceMappingURL=rango-parser.js.map