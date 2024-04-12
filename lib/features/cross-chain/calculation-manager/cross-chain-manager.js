"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrossChainManager = void 0;
const rxjs_1 = require("rxjs");
const innerFrom_1 = require("rxjs/internal/observable/innerFrom");
const errors_1 = require("../../../common/errors");
const tokens_1 = require("../../../common/tokens");
const object_1 = require("../../../common/utils/object");
const options_1 = require("../../../common/utils/options");
const p_timeout_1 = __importDefault(require("../../../common/utils/p-timeout"));
const blockchains_info_1 = require("../../../core/blockchain/utils/blockchains-info/blockchains-info");
const proxy_supported_blockchain_1 = require("../../common/constants/proxy-supported-blockchain");
const get_price_tokens_from_input_tokens_1 = require("../../common/utils/get-price-tokens-from-input-tokens");
const cross_chain_providers_1 = require("./constants/cross-chain-providers");
const default_cross_chain_calculation_options_1 = require("./constants/default-cross-chain-calculation-options");
const default_provider_addresses_1 = require("./constants/default-provider-addresses");
const cross_chain_trade_type_1 = require("./models/cross-chain-trade-type");
const cross_chain_provider_1 = require("./providers/common/cross-chain-provider");
const compare_cross_chain_trades_1 = require("./utils/compare-cross-chain-trades");
/**
 * Contains method to calculate best cross-chain trade.
 */
class CrossChainManager {
    constructor(providerAddress) {
        this.providerAddress = providerAddress;
        this.tradeProviders = cross_chain_providers_1.CrossChainProviders.reduce((acc, ProviderClass) => {
            const provider = new ProviderClass();
            acc[provider.type] = provider;
            return acc;
        }, {});
    }
    /**
     * Calculates cross-chain trades and sorts them by exchange courses.
     * Wrapped trade object may contain error, but sometimes course can be
     * calculated even with thrown error (e.g. min/max amount error).
     *
     * @example
     * ```ts
     * const fromBlockchain = BLOCKCHAIN_NAME.ETHEREUM;
     * // ETH
     * const fromTokenAddress = '0x0000000000000000000000000000000000000000';
     * const fromAmount = 1;
     * const toBlockchain = BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN;
     * // BUSD
     * const toTokenAddress = '0xe9e7cea3dedca5984780bafc599bd69add087d56';
     *
     * const wrappedTrades = await sdk.crossChainManager.calculateTrade(
     *     { blockchain: fromBlockchain, address: fromTokenAddress },
     *     fromAmount,
     *     { blockchain: toBlockchain, address: toTokenAddress }
     * );
     * const bestTrade = wrappedTrades[0];
     *
     * wrappedTrades.forEach(wrappedTrade => {
     *    if (wrappedTrade.trade) {
     *        console.log(wrappedTrade.tradeType, `to amount: ${wrappedTrade.trade.to.tokenAmount.toFormat(3)}`));
     *    }
     *    if (wrappedTrade.error) {
     *        console.error(wrappedTrade.tradeType, 'error: wrappedTrade.error');
     *    }
     * });
     *
     * ```
     *
     * @param fromToken Token to sell.
     * @param fromAmount Amount to sell.
     * @param toToken Token to get.
     * @param options Additional options.
     * @returns Array of sorted wrapped cross-chain trades with possible errors.
     */
    async calculateTrade(fromToken, fromAmount, toToken, options) {
        if (toToken instanceof tokens_1.Token && fromToken.blockchain === toToken.blockchain) {
            throw new errors_1.RubicSdkError('Blockchains of `from` and `to` tokens must be different.');
        }
        const { from, to } = await (0, get_price_tokens_from_input_tokens_1.getPriceTokensFromInputTokens)(fromToken, fromAmount, toToken);
        const { disabledProviders, ...providerOptions } = this.getFullOptions(from.blockchain, options);
        const providers = this.getNotDisabledProviders(from.blockchain, to.blockchain, disabledProviders);
        const calculationPromises = providers.map(provider => this.getProviderCalculationPromise(provider, from, to, providerOptions));
        const wrappedTrades = (await Promise.all(calculationPromises)).filter(object_1.notNull);
        if (!wrappedTrades?.length) {
            throw new errors_1.RubicSdkError('No success providers calculation for the trade');
        }
        return wrappedTrades.sort((nextTrade, prevTrade) => (0, compare_cross_chain_trades_1.compareCrossChainTrades)(nextTrade, prevTrade));
    }
    /**
     * Calculates cross-chain trades reactively in sequence.
     * Contains wrapped trade object which may contain error, but sometimes course can be
     * calculated even with thrown error (e.g. min/max amount error).
     *
     * @example
     * ```ts
     * const fromBlockchain = BLOCKCHAIN_NAME.ETHEREUM;
     * // ETH
     * const fromTokenAddress = '0x0000000000000000000000000000000000000000';
     * const fromAmount = 1;
     * const toBlockchain = BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN;
     * // BUSD
     * const toTokenAddress = '0xe9e7cea3dedca5984780bafc599bd69add087d56';
     *
     * sdk.crossChain.calculateTrade(
     *     { blockchain: fromBlockchain, address: fromTokenAddress },
     *     fromAmount,
     *     { blockchain: toBlockchain, address: toTokenAddress }
     * ).subscribe(tradeData => {
     *     console.log(tradeData.total) // 3
     *     console.log(tradeData.calculated) // 0 or 1 ... or tradeData.total
     *
     *     const wrappedTrade = tradeData.wrappedTrade;
     *     if (wrappedTrade) {
     *         console.log(wrappedTrade.tradeType, `to amount: ${wrappedTrade.trade.to.tokenAmount.toFormat(3)}`));
     *         if (wrappedTrade.error) {
     *             console.error(wrappedTrade.tradeType, 'error: wrappedTrade.error');
     *         }
     *    }
     * });
     *
     * ```
     *
     * @param fromToken Token to sell.
     * @param fromAmount Amount to sell.
     * @param toToken Token to get.
     * @param options Additional options.
     * @returns Observable of cross-chain providers calculation data with best trade and possible errors.
     */
    calculateTradesReactively(fromToken, fromAmount, toToken, options) {
        if (toToken instanceof tokens_1.Token && fromToken.blockchain === toToken.blockchain) {
            throw new errors_1.RubicSdkError('Blockchains of from and to tokens must be different.');
        }
        return (0, rxjs_1.from)((0, get_price_tokens_from_input_tokens_1.getPriceTokensFromInputTokens)(fromToken, fromAmount, toToken)).pipe((0, rxjs_1.switchMap)(({ from, to }) => {
            const { disabledProviders, ...providerOptions } = this.getFullOptions(from.blockchain, options);
            const providers = this.getNotDisabledProviders(from.blockchain, to.blockchain, disabledProviders);
            const totalTrades = providers.length;
            return (0, rxjs_1.merge)(...providers.map(provider => (0, innerFrom_1.fromPromise)(this.getProviderCalculationPromise(provider, from, to, providerOptions)))).pipe((0, rxjs_1.map)((wrappedTrade, index) => {
                return {
                    total: totalTrades,
                    calculated: index + 1,
                    wrappedTrade
                };
            }), (0, rxjs_1.startWith)({
                total: totalTrades,
                calculated: 0,
                wrappedTrade: null
            }));
        }));
    }
    getFullOptions(fromBlockchain, options) {
        const providerAddress = options?.providerAddress
            ? options.providerAddress
            : this.getProviderAddress(fromBlockchain);
        const useProxy = this.getProxyConfig(fromBlockchain, options);
        return (0, options_1.combineOptions)({ ...options, useProxy }, {
            ...default_cross_chain_calculation_options_1.defaultCrossChainCalculationOptions,
            providerAddress,
            useProxy
        });
    }
    getNotDisabledProviders(fromBlockchain, toBlockchain, disabledProviders) {
        const providers = Object.entries(this.tradeProviders)
            .filter(([type, provider]) => {
            if (disabledProviders.includes(type)) {
                return false;
            }
            return provider.areSupportedBlockchains(fromBlockchain, toBlockchain);
        })
            .map(([_type, provider]) => provider);
        if (!providers.length) {
            throw new errors_1.RubicSdkError(`There are no providers for trade`);
        }
        return providers;
    }
    async getProviderCalculationPromise(provider, from, to, options) {
        try {
            const wrappedTrade = await (0, p_timeout_1.default)(provider.calculate(from, to, options), options.timeout);
            if (!wrappedTrade) {
                return null;
            }
            return {
                ...wrappedTrade,
                tradeType: provider.type
            };
        }
        catch (err) {
            console.debug(`[RUBIC_SDK] Trade calculation error occurred for ${provider.type} trade provider.`, err);
            return {
                trade: null,
                tradeType: provider.type,
                error: cross_chain_provider_1.CrossChainProvider.parseError(err)
            };
        }
    }
    getProviderAddress(fromBlockchain) {
        let chainType;
        try {
            chainType = blockchains_info_1.BlockchainsInfo.getChainType(fromBlockchain);
        }
        catch { }
        let providerAddress = default_provider_addresses_1.defaultProviderAddresses.crossChain;
        if (chainType &&
            this.providerAddress?.[chainType]?.crossChain &&
            this.providerAddress[chainType].crossChain !== undefined) {
            providerAddress = this.providerAddress[chainType].crossChain;
        }
        return providerAddress;
    }
    getProxyConfig(fromBlockchain, options) {
        const isBlockchainSupportedByProxy = proxy_supported_blockchain_1.proxySupportedBlockchains.includes(fromBlockchain);
        return Object.fromEntries(Object.values(cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE).map(key => {
            return [
                key,
                isBlockchainSupportedByProxy
                    ? options?.useProxy?.[key] ?? true
                    : false
            ];
        }));
    }
}
exports.CrossChainManager = CrossChainManager;
//# sourceMappingURL=cross-chain-manager.js.map