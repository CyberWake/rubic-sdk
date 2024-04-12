"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangenowCrossChainProvider = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../common/errors");
const tokens_1 = require("../../../../../common/tokens");
const native_tokens_1 = require("../../../../../common/tokens/constants/native-tokens");
const blockchain_1 = require("../../../../../common/utils/blockchain");
const blockchain_name_1 = require("../../../../../core/blockchain/models/blockchain-name");
const blockchains_info_1 = require("../../../../../core/blockchain/utils/blockchains-info/blockchains-info");
const evm_web3_pure_1 = require("../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const get_from_without_fee_1 = require("../../../../common/utils/get-from-without-fee");
const cross_chain_trade_type_1 = require("../../models/cross-chain-trade-type");
const changenow_cross_chain_trade_1 = require("./changenow-cross-chain-trade");
const changenow_api_blockchain_1 = require("./constants/changenow-api-blockchain");
const changenow_proxy_supported_blockchains_1 = require("./constants/changenow-proxy-supported-blockchains");
const native_addresses_1 = require("./constants/native-addresses");
const cross_chain_provider_1 = require("../common/cross-chain-provider");
const proxy_cross_chain_evm_trade_1 = require("../common/proxy-cross-chain-evm-facade/proxy-cross-chain-evm-trade");
const typed_trade_providers_1 = require("../../../../on-chain/calculation-manager/constants/trade-providers/typed-trade-providers");
const changenow_cross_chain_api_service_1 = require("./services/changenow-cross-chain-api-service");
class ChangenowCrossChainProvider extends cross_chain_provider_1.CrossChainProvider {
    constructor() {
        super(...arguments);
        this.type = cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.CHANGENOW;
    }
    isSupportedBlockchain(blockchain) {
        return Object.keys(changenow_api_blockchain_1.changenowApiBlockchain).includes(blockchain);
    }
    isSupportedProxyBlockchain(blockchain) {
        return changenow_proxy_supported_blockchains_1.changenowProxySupportedBlockchains.some(supportedBlockchain => supportedBlockchain === blockchain);
    }
    // eslint-disable-next-line complexity
    async calculate(from, toToken, options) {
        const fromBlockchain = from.blockchain;
        const toBlockchain = toToken.blockchain;
        const useProxy = this.isSupportedProxyBlockchain(fromBlockchain) &&
            (options?.useProxy?.[this.type] || false);
        if (!this.areSupportedBlockchains(fromBlockchain, toBlockchain) ||
            (!options.changenowFullyEnabled && !blockchains_info_1.BlockchainsInfo.isEvmBlockchainName(fromBlockchain))) {
            return {
                trade: null,
                error: new errors_1.NotSupportedTokensError(),
                tradeType: this.type
            };
        }
        const { fromCurrency, toCurrency, transitCurrency, nativeCurrency } = await this.getChangenowCurrencies(from, toToken);
        if (!toCurrency || (!fromCurrency && !transitCurrency && !nativeCurrency)) {
            return {
                trade: null,
                error: new errors_1.NotSupportedTokensError(),
                tradeType: this.type
            };
        }
        const feeInfo = await this.getFeeInfo(fromBlockchain, options.providerAddress, from, useProxy);
        const fromWithoutFee = (0, get_from_without_fee_1.getFromWithoutFee)(from, feeInfo.rubicProxy?.platformFee?.percent);
        let onChainTrade = null;
        let transitMinAmount = fromWithoutFee.tokenAmount;
        let transitFromToken = fromWithoutFee;
        if (!fromCurrency) {
            if (!useProxy) {
                return {
                    trade: null,
                    error: new errors_1.NotSupportedTokensError(),
                    tradeType: this.type
                };
            }
            onChainTrade = transitCurrency
                ? await this.getOnChainTrade(fromWithoutFee, [], 0.02, transitCurrency.tokenContract)
                : null;
            if (!onChainTrade) {
                onChainTrade = await this.getOnChainTrade(fromWithoutFee, [], options.slippageTolerance, native_tokens_1.nativeTokensList[fromBlockchain].address);
            }
            if (!onChainTrade) {
                return {
                    trade: null,
                    error: new errors_1.NotSupportedTokensError(),
                    tradeType: this.type
                };
            }
            transitMinAmount = onChainTrade.toTokenAmountMin.tokenAmount;
            transitFromToken = onChainTrade.to;
        }
        const transit = onChainTrade ? transitCurrency || nativeCurrency : fromCurrency;
        try {
            const toAmount = await this.getToAmount(transit, toCurrency, transitMinAmount);
            const to = new tokens_1.PriceTokenAmount({
                ...toToken.asStruct,
                tokenAmount: toAmount
            });
            const changenowTrade = {
                from: from,
                to,
                toTokenAmountMin: toAmount,
                fromCurrency: transit,
                toCurrency,
                feeInfo,
                gasData: null,
                onChainTrade
            };
            const gasData = options.gasCalculation === 'enabled'
                ? await changenow_cross_chain_trade_1.ChangenowCrossChainTrade.getGasData(changenowTrade, options.providerAddress, options.receiverAddress)
                : null;
            const trade = new changenow_cross_chain_trade_1.ChangenowCrossChainTrade({ ...changenowTrade, gasData }, options.providerAddress, await this.getRoutePath(from, to));
            const error = await this.checkMinMaxAmounts(transitFromToken, transit, toCurrency);
            if (error) {
                return {
                    trade,
                    error,
                    tradeType: this.type
                };
            }
            return { trade, tradeType: this.type };
        }
        catch {
            const error = await this.checkMinMaxAmounts(transitFromToken, transit, toCurrency);
            if (error) {
                return {
                    trade: null,
                    error,
                    tradeType: this.type
                };
            }
            return {
                trade: null,
                error: new errors_1.NotSupportedTokensError(),
                tradeType: this.type
            };
        }
    }
    async getChangenowCurrencies(from, to) {
        const currencies = await changenow_cross_chain_api_service_1.ChangeNowCrossChainApiService.getCurrencies();
        const nativeToken = native_tokens_1.nativeTokensList[from.blockchain];
        return {
            fromCurrency: this.getCurrency(currencies, from),
            toCurrency: this.getCurrency(currencies, to),
            nativeCurrency: this.getCurrency(currencies, nativeToken),
            transitCurrency: this.getTransitCurrency(currencies, from.blockchain)
        };
    }
    async checkMinMaxAmounts(from, fromCurrency, toCurrency) {
        const { minAmount, maxAmount } = await this.getMinMaxRange(fromCurrency, toCurrency);
        if (minAmount.gt(from.tokenAmount)) {
            return new errors_1.MinAmountError(minAmount, from.symbol);
        }
        if (maxAmount?.lt(from.tokenAmount)) {
            return new errors_1.MaxAmountError(maxAmount, from.symbol);
        }
        return null;
    }
    isNativeAddress(token, currency) {
        return native_addresses_1.nativeTokensData.some(nativeTokenData => token.blockchain === nativeTokenData.blockchain &&
            (0, blockchain_1.compareAddresses)(nativeTokenData.address, token.address) &&
            currency.network === changenow_api_blockchain_1.changenowApiBlockchain[nativeTokenData.blockchain] &&
            currency.ticker === nativeTokenData.ticker);
    }
    async getToAmount(fromCurrency, toCurrency, fromAmount) {
        const res = await changenow_cross_chain_api_service_1.ChangeNowCrossChainApiService.getQuoteTx({
            fromCurrency: fromCurrency.ticker,
            toCurrency: toCurrency.ticker,
            fromAmount: fromAmount.toFixed(),
            fromNetwork: fromCurrency.network,
            toNetwork: toCurrency.network
        });
        return new bignumber_js_1.default(res.toAmount);
    }
    async getMinMaxRange(fromCurrency, toCurrency) {
        const response = await changenow_cross_chain_api_service_1.ChangeNowCrossChainApiService.getMinMaxRange({
            fromCurrency: fromCurrency.ticker,
            toCurrency: toCurrency.ticker,
            fromNetwork: fromCurrency.network,
            toNetwork: toCurrency.network
        });
        return {
            minAmount: new bignumber_js_1.default(response.minAmount),
            maxAmount: response.maxAmount ? new bignumber_js_1.default(response.maxAmount) : null
        };
    }
    async getFeeInfo(fromBlockchain, providerAddress, percentFeeToken, useProxy) {
        return proxy_cross_chain_evm_trade_1.ProxyCrossChainEvmTrade.getFeeInfo(fromBlockchain, providerAddress, percentFeeToken, useProxy);
    }
    async getOnChainTrade(from, _availableDexes, slippageTolerance, transitTokenAddress) {
        const fromBlockchain = from.blockchain;
        const dexes = Object.values(typed_trade_providers_1.typedTradeProviders[fromBlockchain]).filter(dex => dex.supportReceiverAddress);
        const to = await tokens_1.PriceToken.createToken({
            address: transitTokenAddress,
            blockchain: fromBlockchain
        });
        const onChainTrades = (await Promise.allSettled(dexes.map(dex => dex.calculate(from, to, {
            slippageTolerance,
            gasCalculation: 'disabled',
            useProxy: false
        }))))
            .filter(value => value.status === 'fulfilled')
            .map(value => value.value)
            .sort((a, b) => b.to.tokenAmount.comparedTo(a.to.tokenAmount));
        if (!onChainTrades.length) {
            return null;
        }
        return onChainTrades[0];
    }
    getCurrency(currencies, token) {
        if (!token) {
            return undefined;
        }
        const apiBlockchain = token.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE &&
            evm_web3_pure_1.EvmWeb3Pure.isNativeAddress(token.address)
            ? 'cchain'
            : changenow_api_blockchain_1.changenowApiBlockchain[token.blockchain];
        return currencies.find(currency => currency.network === apiBlockchain &&
            ((currency.tokenContract === null &&
                (token.isNative || this.isNativeAddress(token, currency))) ||
                (currency.tokenContract &&
                    (0, blockchain_1.compareAddresses)(token.address, currency.tokenContract))));
    }
    getTransitCurrency(currencies, blockchain) {
        const apiBlockchain = changenow_api_blockchain_1.changenowApiBlockchain[blockchain];
        return currencies.find(currency => currency.network === apiBlockchain && currency.tokenContract !== null);
    }
    async getRoutePath(from, to) {
        return [
            {
                type: 'cross-chain',
                provider: cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.CHANGENOW,
                path: [from, to]
            }
        ];
    }
}
exports.ChangenowCrossChainProvider = ChangenowCrossChainProvider;
//# sourceMappingURL=changenow-cross-chain-provider.js.map