"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CbridgeCrossChainProvider = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../common/errors");
const tokens_1 = require("../../../../../common/tokens");
const native_tokens_1 = require("../../../../../common/tokens/constants/native-tokens");
const wrapped_native_tokens_1 = require("../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_1 = require("../../../../../common/utils/blockchain");
const blockchains_info_1 = require("../../../../../core/blockchain/utils/blockchains-info/blockchains-info");
const blockchain_id_1 = require("../../../../../core/blockchain/utils/blockchains-info/constants/blockchain-id");
const web3_pure_1 = require("../../../../../core/blockchain/web3-pure/web3-pure");
const injector_1 = require("../../../../../core/injector/injector");
const get_from_without_fee_1 = require("../../../../common/utils/get-from-without-fee");
const cross_chain_trade_type_1 = require("../../models/cross-chain-trade-type");
const cbridge_cross_chain_api_service_1 = require("./cbridge-cross-chain-api-service");
const cbridge_cross_chain_trade_1 = require("./cbridge-cross-chain-trade");
const cbridge_contract_abi_1 = require("./constants/cbridge-contract-abi");
const cbridge_contract_address_1 = require("./constants/cbridge-contract-address");
const cbridge_supported_blockchains_1 = require("./constants/cbridge-supported-blockchains");
const cross_chain_provider_1 = require("../common/cross-chain-provider");
const proxy_cross_chain_evm_trade_1 = require("../common/proxy-cross-chain-evm-facade/proxy-cross-chain-evm-trade");
const typed_trade_providers_1 = require("../../../../on-chain/calculation-manager/constants/trade-providers/typed-trade-providers");
class CbridgeCrossChainProvider extends cross_chain_provider_1.CrossChainProvider {
    constructor() {
        super(...arguments);
        this.type = cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.CELER_BRIDGE;
    }
    isSupportedBlockchain(blockchain) {
        return cbridge_supported_blockchains_1.cbridgeSupportedBlockchains.some(supportedBlockchain => supportedBlockchain === blockchain);
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
            const config = await this.fetchContractAddressAndCheckTokens(fromToken, toToken);
            if (!config.supportedToToken) {
                throw new errors_1.RubicSdkError('To token is not supported');
            }
            const feeInfo = await this.getFeeInfo(fromBlockchain, options.providerAddress, fromToken, useProxy);
            const fromWithoutFee = (0, get_from_without_fee_1.getFromWithoutFee)(fromToken, feeInfo.rubicProxy?.platformFee?.percent);
            let onChainTrade = null;
            let transitTokenAmount = fromWithoutFee.tokenAmount;
            let transitMinAmount = transitTokenAmount;
            let transitToken = fromWithoutFee;
            if (!config.isBridge) {
                if (!useProxy) {
                    return {
                        trade: null,
                        error: new errors_1.NotSupportedTokensError(),
                        tradeType: this.type
                    };
                }
                onChainTrade = await this.getOnChainTrade(fromWithoutFee, [], options.slippageTolerance, config.possibleTransitToken.token.address);
                if (!onChainTrade) {
                    return {
                        trade: null,
                        error: new errors_1.NotSupportedTokensError(),
                        tradeType: this.type
                    };
                }
                transitTokenAmount = onChainTrade.to.tokenAmount;
                transitMinAmount = onChainTrade.toTokenAmountMin.tokenAmount;
                transitToken = onChainTrade.to;
                const defaultTransit = new tokens_1.PriceTokenAmount({
                    ...onChainTrade.to.asStructWithAmount
                });
                const transitConfig = await this.fetchContractAddressAndCheckTokens(defaultTransit, toToken);
                const celerTransitTokenStruct = {
                    blockchain: fromToken.blockchain,
                    address: transitToken.address,
                    name: onChainTrade
                        ? transitConfig.possibleTransitToken.name
                        : transitConfig.supportedFromToken.name,
                    symbol: onChainTrade
                        ? transitConfig.possibleTransitToken.token.symbol
                        : transitConfig.supportedFromToken.token.symbol,
                    decimals: onChainTrade
                        ? transitConfig.possibleTransitToken.token.decimal
                        : transitConfig.supportedFromToken.token.decimal,
                    price: new bignumber_js_1.default(0),
                    tokenAmount: transitTokenAmount
                };
                transitToken = transitConfig?.supportedFromToken
                    ? new tokens_1.PriceTokenAmount(celerTransitTokenStruct)
                    : defaultTransit;
            }
            const { amount, maxSlippage } = await this.getEstimates(transitToken, toToken, options, config);
            if (!amount) {
                throw new errors_1.RubicSdkError('Can not estimate trade');
            }
            const to = new tokens_1.PriceTokenAmount({
                ...toToken.asStruct,
                tokenAmount: web3_pure_1.Web3Pure.fromWei(amount, toToken.decimals)
            });
            const gasData = options.gasCalculation === 'enabled'
                ? await cbridge_cross_chain_trade_1.CbridgeCrossChainTrade.getGasData(fromToken, to, onChainTrade, feeInfo, maxSlippage, config.address, options.providerAddress, options.receiverAddress || this.getWalletAddress(fromToken.blockchain))
                : null;
            const amountsErrors = await this.getMinMaxAmountsErrors(transitToken, feeInfo);
            return {
                trade: new cbridge_cross_chain_trade_1.CbridgeCrossChainTrade({
                    from: fromToken,
                    to,
                    gasData,
                    priceImpact: fromToken.calculatePriceImpactPercent(to),
                    slippage: options.slippageTolerance,
                    feeInfo: feeInfo,
                    maxSlippage,
                    contractAddress: config.address,
                    transitMinAmount,
                    onChainTrade
                }, options.providerAddress, await this.getRoutePath(fromToken, transitToken, to, onChainTrade)),
                error: amountsErrors,
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
    async fetchContractAddressAndCheckTokens(fromTokenOrNative, toTokenOrNative) {
        let fromToken = fromTokenOrNative;
        const useTestnet = blockchains_info_1.BlockchainsInfo.isTestBlockchainName(fromToken.blockchain);
        if (fromToken.isNative) {
            const wrappedFrom = wrapped_native_tokens_1.wrappedNativeTokensList[fromTokenOrNative.blockchain];
            const token = await tokens_1.PriceTokenAmount.createToken({
                ...wrappedFrom,
                tokenAmount: fromTokenOrNative.tokenAmount
            });
            fromToken = token;
        }
        let toToken = toTokenOrNative;
        if (toToken.symbol === native_tokens_1.nativeTokensList[toToken.blockchain].symbol) {
            const wrappedTo = wrapped_native_tokens_1.wrappedNativeTokensList[toTokenOrNative.blockchain];
            const token = await tokens_1.PriceToken.createToken(wrappedTo);
            toToken = token;
        }
        const config = await cbridge_cross_chain_api_service_1.CbridgeCrossChainApiService.getTransferConfigs({ useTestnet });
        const fromChainId = blockchain_id_1.blockchainId[fromToken.blockchain];
        const toChainId = blockchain_id_1.blockchainId[toToken.blockchain];
        if (!config.chains.some(chain => chain.id === fromChainId) ||
            !config.chains.some(chain => chain.id === toChainId)) {
            throw new errors_1.RubicSdkError('Not supported chain');
        }
        const supportedFromToken = config.chain_token?.[fromChainId]?.token.find(el => (0, blockchain_1.compareAddresses)(el.token.address, fromToken.address));
        const supportedToToken = config.chain_token?.[toChainId]?.token.find(el => (0, blockchain_1.compareAddresses)(el.token.address, toToken.address));
        if (!supportedToToken) {
            throw new errors_1.RubicSdkError('Not supported tokens');
        }
        const possibleTransitToken = config.chain_token?.[fromChainId]?.token.find(el => el.token.symbol === supportedToToken.token.symbol);
        return {
            supportedFromToken,
            supportedToToken,
            address: config.chains.find(chain => chain.id === fromChainId).contract_addr,
            isBridge: supportedFromToken?.token.symbol === supportedToToken?.token.symbol,
            possibleTransitToken
        };
    }
    async getEstimates(fromToken, toToken, options, config) {
        let tokenSymbol = fromToken.symbol;
        const useTestnet = blockchains_info_1.BlockchainsInfo.isTestBlockchainName(fromToken.blockchain);
        if (config.isBridge) {
            tokenSymbol = config.supportedFromToken?.token.symbol || tokenSymbol;
        }
        const requestParams = {
            src_chain_id: blockchain_id_1.blockchainId[fromToken.blockchain],
            dst_chain_id: blockchain_id_1.blockchainId[toToken.blockchain],
            token_symbol: tokenSymbol,
            usr_addr: options?.receiverAddress || this.getWalletAddress(fromToken.blockchain),
            slippage_tolerance: Number((options.slippageTolerance * 1000000).toFixed(0)),
            amt: fromToken.stringWeiAmount
        };
        const { estimated_receive_amt, max_slippage, base_fee } = await cbridge_cross_chain_api_service_1.CbridgeCrossChainApiService.fetchEstimateAmount(requestParams, { useTestnet });
        return { amount: estimated_receive_amt, maxSlippage: max_slippage, fee: base_fee };
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
    async getMinMaxAmountsErrors(fromToken, _feeInfo) {
        try {
            const fromBlockchain = fromToken.blockchain;
            const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(fromBlockchain);
            const fromTokenAddress = fromToken.isNative
                ? wrapped_native_tokens_1.wrappedNativeTokensList[fromBlockchain].address
                : fromToken.address;
            const minAmountString = await web3Public.callContractMethod(cbridge_contract_address_1.cbridgeContractAddress[fromBlockchain].providerRouter, cbridge_contract_abi_1.cbridgeContractAbi, 'minSend', [fromTokenAddress]);
            const minAmount = new bignumber_js_1.default(minAmountString);
            if (minAmount.gte(fromToken.stringWeiAmount)) {
                return new errors_1.MinAmountError(web3_pure_1.Web3Pure.fromWei(minAmount, fromToken.decimals), fromToken.symbol);
            }
            const maxAmountString = await web3Public.callContractMethod(cbridge_contract_address_1.cbridgeContractAddress[fromBlockchain].providerRouter, cbridge_contract_abi_1.cbridgeContractAbi, 'maxSend', [fromTokenAddress]);
            const maxAmount = new bignumber_js_1.default(maxAmountString);
            if (maxAmount.lt(fromToken.stringWeiAmount)) {
                return new errors_1.MaxAmountError(web3_pure_1.Web3Pure.fromWei(maxAmount, fromToken.decimals), fromToken.symbol);
            }
        }
        catch {
            return undefined;
        }
        return undefined;
    }
    async getFeeInfo(fromBlockchain, providerAddress, percentFeeToken, useProxy) {
        return proxy_cross_chain_evm_trade_1.ProxyCrossChainEvmTrade.getFeeInfo(fromBlockchain, providerAddress, percentFeeToken, useProxy);
    }
    async getRoutePath(from, transit, to, onChainTrade) {
        const routePath = [];
        if (onChainTrade) {
            routePath.push({
                type: 'on-chain',
                path: [from, transit],
                provider: onChainTrade.type
            });
        }
        routePath.push({
            type: 'cross-chain',
            path: [transit, to],
            provider: cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.CELER_BRIDGE
        });
        return routePath;
    }
}
exports.CbridgeCrossChainProvider = CbridgeCrossChainProvider;
//# sourceMappingURL=cbridge-cross-chain-provider.js.map