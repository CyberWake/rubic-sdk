"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PulseChainCrossChainProvider = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../common/errors");
const tokens_1 = require("../../../../../common/tokens");
const blockchain_1 = require("../../../../../common/utils/blockchain");
const blockchain_name_1 = require("../../../../../core/blockchain/models/blockchain-name");
const web3_pure_1 = require("../../../../../core/blockchain/web3-pure/web3-pure");
const get_from_without_fee_1 = require("../../../../common/utils/get-from-without-fee");
const cross_chain_trade_type_1 = require("../../models/cross-chain-trade-type");
const cross_chain_provider_1 = require("../common/cross-chain-provider");
const proxy_cross_chain_evm_trade_1 = require("../common/proxy-cross-chain-evm-facade/proxy-cross-chain-evm-trade");
const pulse_chain_supported_blockchains_1 = require("./constants/pulse-chain-supported-blockchains");
const bridge_manager_1 = require("./omni-bridge-entities/bridge-manager");
const pulse_chain_cross_chain_trade_1 = require("./pulse-chain-cross-chain-trade");
const typed_trade_providers_1 = require("../../../../on-chain/calculation-manager/constants/trade-providers/typed-trade-providers");
class PulseChainCrossChainProvider extends cross_chain_provider_1.CrossChainProvider {
    constructor() {
        super(...arguments);
        this.type = cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.PULSE_CHAIN_BRIDGE;
    }
    isSupportedBlockchain(blockchain) {
        return pulse_chain_supported_blockchains_1.pulseChainSupportedBlockchains.some(chain => chain === blockchain);
    }
    async calculate(fromToken, toToken, options) {
        const fromBlockchain = fromToken.blockchain;
        const toBlockchain = toToken.blockchain;
        const useProxy = options?.useProxy?.[this.type] ?? true;
        if (!this.areSupportedBlockchains(fromBlockchain, toBlockchain) ||
            // @TODO Remove after home bridge development
            fromToken.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.PULSECHAIN) {
            return {
                trade: null,
                error: new errors_1.NotSupportedTokensError(),
                tradeType: this.type
            };
        }
        const feeInfo = await this.getFeeInfo(fromBlockchain, options.providerAddress, fromToken, useProxy);
        try {
            const sourceBridgeManager = bridge_manager_1.BridgeManager.createBridge(fromToken, toToken);
            const targetBridgeManager = bridge_manager_1.BridgeManager.createBridge(fromToken, toToken);
            const fromTokenAddress = this.getTokenAddress(fromToken);
            const toTokenAddress = this.getTokenAddress(toToken);
            const tokenRegistered = await sourceBridgeManager.isTokenRegistered(fromTokenAddress);
            const targetTokenAddress = await sourceBridgeManager.getBridgeToken(fromTokenAddress);
            if (!(0, blockchain_1.compareAddresses)(toTokenAddress, targetTokenAddress)) {
                return {
                    trade: null,
                    error: new errors_1.NotSupportedTokensError(),
                    tradeType: this.type
                };
            }
            const fromWithoutFee = (0, get_from_without_fee_1.getFromWithoutFee)(fromToken, feeInfo.rubicProxy?.platformFee?.percent);
            let onChainTrade = null;
            let transitTokenAmount = fromWithoutFee.tokenAmount;
            let transitMinAmount = transitTokenAmount;
            let transitToken = fromWithoutFee;
            if (!tokenRegistered) {
                if (!useProxy) {
                    return {
                        trade: null,
                        error: new errors_1.NotSupportedTokensError(),
                        tradeType: this.type
                    };
                }
                const transitTokenAddress = await targetBridgeManager.getBridgeToken(toToken.address);
                onChainTrade = await this.getOnChainTrade(fromWithoutFee, [], options.slippageTolerance, transitTokenAddress);
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
            }
            const targetAmount = await sourceBridgeManager.calculateAmount(toToken.address, web3_pure_1.Web3Pure.toWei(transitTokenAmount, transitToken.decimals));
            const targetAmountMin = await sourceBridgeManager.calculateAmount(toToken.address, web3_pure_1.Web3Pure.toWei(transitMinAmount, transitToken.decimals));
            const amountsErrors = await this.getMinMaxAmountsErrors(fromTokenAddress, sourceBridgeManager, transitToken);
            if (!targetAmount) {
                throw new errors_1.RubicSdkError('Can not estimate trade');
            }
            const to = new tokens_1.PriceTokenAmount({
                ...toToken.asStruct,
                tokenAmount: web3_pure_1.Web3Pure.fromWei(targetAmount, toToken.decimals)
            });
            const gasData = options.gasCalculation === 'enabled'
                ? await pulse_chain_cross_chain_trade_1.PulseChainCrossChainTrade.getGasData(fromToken, to, onChainTrade, feeInfo, targetAmountMin, options.providerAddress, options.receiverAddress || this.getWalletAddress(fromToken.blockchain), sourceBridgeManager.sourceBridgeAddress, tokenRegistered)
                : null;
            return {
                trade: new pulse_chain_cross_chain_trade_1.PulseChainCrossChainTrade({
                    from: fromToken,
                    to,
                    gasData,
                    slippage: options.slippageTolerance,
                    feeInfo: feeInfo,
                    toTokenAmountMin: targetAmountMin,
                    onChainTrade,
                    priceImpact: fromToken.calculatePriceImpactPercent(to),
                    routerAddress: sourceBridgeManager.sourceBridgeAddress,
                    tokenRegistered
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
    async getMinMaxAmountsErrors(fromTokenAddress, fromBridgeManager, fromToken) {
        try {
            const minAmountWei = await fromBridgeManager.getMinAmountToken(fromTokenAddress);
            const minAmount = new bignumber_js_1.default(minAmountWei);
            if (minAmount.gte(fromToken.stringWeiAmount)) {
                return new errors_1.MinAmountError(web3_pure_1.Web3Pure.fromWei(minAmount, fromToken.decimals), fromToken.symbol);
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
            provider: cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.PULSE_CHAIN_BRIDGE
        });
        return routePath;
    }
    getTokenAddress(token) {
        if (token.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM) {
            return token.isNative ? '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' : token.address;
        }
        return token.isNative ? '0xA1077a294dDE1B09bB078844df40758a5D0f9a27' : token.address;
    }
}
exports.PulseChainCrossChainProvider = PulseChainCrossChainProvider;
//# sourceMappingURL=pulse-chain-cross-chain-provider.js.map