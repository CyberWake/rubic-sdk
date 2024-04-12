"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LifiProvider = void 0;
const sdk_1 = require("@lifi/sdk");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../../common/errors");
const tokens_1 = require("../../../../../../common/tokens");
const object_1 = require("../../../../../../common/utils/object");
const options_1 = require("../../../../../../common/utils/options");
const blockchain_id_1 = require("../../../../../../core/blockchain/utils/blockchains-info/constants/blockchain-id");
const lifi_config_1 = require("../../../../../common/providers/lifi/constants/lifi-config");
const lifi_forbidden_blockchains_1 = require("./constants/lifi-forbidden-blockchains");
const lifi_providers_1 = require("./constants/lifi-providers");
const lifi_trade_1 = require("./lifi-trade");
const on_chain_trade_type_1 = require("../../common/models/on-chain-trade-type");
const get_gas_fee_info_1 = require("../../common/utils/get-gas-fee-info");
const get_gas_price_info_1 = require("../../common/utils/get-gas-price-info");
const evm_provider_default_options_1 = require("../../dexes/common/on-chain-provider/evm-on-chain-provider/constants/evm-provider-default-options");
const aggregator_on_chain_provider_abstract_1 = require("../../common/on-chain-aggregator/aggregator-on-chain-provider-abstract");
class LifiProvider extends aggregator_on_chain_provider_abstract_1.AggregatorOnChainProvider {
    constructor() {
        super(...arguments);
        this.tradeType = on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.LIFI;
        this.lifi = new sdk_1.LiFi((0, lifi_config_1.getLifiConfig)());
        this.defaultOptions = {
            ...evm_provider_default_options_1.evmProviderDefaultOptions,
            gasCalculation: 'calculate'
        };
    }
    isSupportedBlockchain(blockchain) {
        return !lifi_forbidden_blockchains_1.lifiForbiddenBlockchains.some(forbiddenChain => forbiddenChain === blockchain);
    }
    async calculate(from, toToken, options) {
        if (!this.isSupportedBlockchain(from.blockchain)) {
            throw new errors_1.RubicSdkError('Blockchain is not supported');
        }
        if (options.withDeflation.from.isDeflation) {
            throw new errors_1.RubicSdkError('[RUBIC_SDK] Lifi does not work if source token is deflation.');
        }
        const fullOptions = (0, options_1.combineOptions)(options, {
            ...this.defaultOptions,
            disabledProviders: [...options.disabledProviders, on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.DODO]
        });
        const { fromWithoutFee, proxyFeeInfo } = await this.handleProxyContract(from, fullOptions);
        const fromChainId = blockchain_id_1.blockchainId[from.blockchain];
        const toChainId = blockchain_id_1.blockchainId[toToken.blockchain];
        const { disabledProviders } = fullOptions;
        const lifiDisabledProviders = Object.entries(lifi_providers_1.lifiProviders)
            .filter(([_lifiProviderKey, tradeType]) => disabledProviders.includes(tradeType))
            .map(([lifiProviderKey]) => lifiProviderKey);
        const routeOptions = {
            order: 'RECOMMENDED',
            slippage: fullOptions.slippageTolerance,
            maxPriceImpact: 0.5,
            exchanges: {
                deny: lifiDisabledProviders.concat('openocean')
            }
        };
        const routesRequest = {
            fromChainId,
            fromAmount: fromWithoutFee.stringWeiAmount,
            fromTokenAddress: fromWithoutFee.address,
            toChainId,
            toTokenAddress: toToken.address,
            options: routeOptions
        };
        const result = await this.lifi.getRoutes(routesRequest);
        const { routes } = result;
        const allTrades = (await Promise.all(routes.map(async (route) => {
            const step = route.steps[0];
            if (!step) {
                return null;
            }
            const type = on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.LIFI;
            const to = new tokens_1.PriceTokenAmount({
                ...toToken.asStruct,
                weiAmount: new bignumber_js_1.default(route.toAmount)
            });
            const path = this.getRoutePath(from, to);
            let lifiTradeStruct = {
                from,
                to,
                gasFeeInfo: null,
                slippageTolerance: fullOptions.slippageTolerance,
                type,
                path,
                route,
                toTokenWeiAmountMin: new bignumber_js_1.default(route.toAmountMin),
                useProxy: fullOptions.useProxy,
                proxyFeeInfo,
                fromWithoutFee,
                withDeflation: fullOptions.withDeflation
            };
            const gasFeeInfo = fullOptions.gasCalculation === 'disabled'
                ? null
                : await this.getGasFeeInfo(lifiTradeStruct);
            lifiTradeStruct = {
                ...lifiTradeStruct,
                gasFeeInfo
            };
            return new lifi_trade_1.LifiTrade(lifiTradeStruct, fullOptions.providerAddress);
        }))).filter(object_1.notNull);
        const bestTrade = this.getBestTrade(allTrades);
        return bestTrade;
    }
    /**
     * @description Lifi-aggregator provides several providers at the same time, this method chooses the most profitable trade
     * @param trades all available lifiTrades
     * @returns best trade
     */
    getBestTrade(trades) {
        const best = trades.sort((prev, next) => next.to.tokenAmount.comparedTo(prev.to.tokenAmount))[0];
        return best;
    }
    async getGasFeeInfo(lifiTradeStruct) {
        try {
            const gasPriceInfo = await (0, get_gas_price_info_1.getGasPriceInfo)(lifiTradeStruct.from.blockchain);
            const gasLimit = await lifi_trade_1.LifiTrade.getGasLimit(lifiTradeStruct);
            return (0, get_gas_fee_info_1.getGasFeeInfo)(gasLimit, gasPriceInfo);
        }
        catch {
            return null;
        }
    }
}
exports.LifiProvider = LifiProvider;
//# sourceMappingURL=lifi-provider.js.map