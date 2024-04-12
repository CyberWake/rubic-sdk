"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LifiCrossChainProvider = void 0;
const sdk_1 = require("@lifi/sdk");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../common/errors");
const tokens_1 = require("../../../../../common/tokens");
const native_tokens_1 = require("../../../../../common/tokens/constants/native-tokens");
const blockchain_id_1 = require("../../../../../core/blockchain/utils/blockchains-info/constants/blockchain-id");
const web3_pure_1 = require("../../../../../core/blockchain/web3-pure/web3-pure");
const lifi_config_1 = require("../../../../common/providers/lifi/constants/lifi-config");
const get_from_without_fee_1 = require("../../../../common/utils/get-from-without-fee");
const cross_chain_trade_type_1 = require("../../models/cross-chain-trade-type");
const cross_chain_provider_1 = require("../common/cross-chain-provider");
const bridge_type_1 = require("../common/models/bridge-type");
const proxy_cross_chain_evm_trade_1 = require("../common/proxy-cross-chain-evm-facade/proxy-cross-chain-evm-trade");
const lifi_cross_chain_supported_blockchain_1 = require("./constants/lifi-cross-chain-supported-blockchain");
const lifi_cross_chain_trade_1 = require("./lifi-cross-chain-trade");
const lifi_bridge_types_1 = require("./models/lifi-bridge-types");
const lifi_providers_1 = require("../../../../on-chain/calculation-manager/providers/aggregators/lifi/constants/lifi-providers");
const on_chain_trade_type_1 = require("../../../../on-chain/calculation-manager/providers/common/models/on-chain-trade-type");
class LifiCrossChainProvider extends cross_chain_provider_1.CrossChainProvider {
    constructor() {
        super(...arguments);
        this.type = cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.LIFI;
        this.lifi = new sdk_1.LiFi((0, lifi_config_1.getLifiConfig)());
        this.MIN_AMOUNT_USD = new bignumber_js_1.default(30);
    }
    isSupportedBlockchain(blockchain) {
        return lifi_cross_chain_supported_blockchain_1.lifiCrossChainSupportedBlockchains.some(supportedBlockchain => supportedBlockchain === blockchain);
    }
    async calculate(from, toToken, options) {
        const fromBlockchain = from.blockchain;
        const toBlockchain = toToken.blockchain;
        if (!this.areSupportedBlockchains(fromBlockchain, toBlockchain)) {
            return {
                trade: null,
                error: new errors_1.NotSupportedTokensError(),
                tradeType: this.type
            };
        }
        if (options.lifiDisabledBridgeTypes?.length &&
            !this.checkBridgeTypes(options.lifiDisabledBridgeTypes)) {
            throw new errors_1.RubicSdkError('Incorrect bridges filter param');
        }
        const denyBridges = options.lifiDisabledBridgeTypes || [];
        const routeOptions = {
            slippage: options.slippageTolerance,
            order: 'RECOMMENDED',
            allowSwitchChain: false,
            bridges: { deny: denyBridges }
        };
        const fromChainId = blockchain_id_1.blockchainId[fromBlockchain];
        const toChainId = blockchain_id_1.blockchainId[toBlockchain];
        const feeInfo = await this.getFeeInfo(fromBlockchain, options.providerAddress, from, options?.useProxy?.[this.type] ?? true);
        const fromWithoutFee = (0, get_from_without_fee_1.getFromWithoutFee)(from, feeInfo.rubicProxy?.platformFee?.percent);
        const fromAddress = this.getWalletAddress(fromBlockchain);
        const toAddress = options.receiverAddress || fromAddress;
        const routesRequest = {
            fromChainId,
            fromAmount: fromWithoutFee.stringWeiAmount,
            fromTokenAddress: from.address,
            toChainId,
            toTokenAddress: toToken.address,
            options: routeOptions,
            ...(fromAddress && { fromAddress }),
            ...(toAddress && { toAddress })
        };
        const result = await this.lifi.getRoutes(routesRequest);
        const { routes } = result;
        const bestRoute = routes.find(route => route.steps.length === 1 && !route.containsSwitchChain);
        if (!bestRoute) {
            throw new errors_1.RubicSdkError('No available routes');
        }
        const providerFee = bestRoute.steps[0].estimate.feeCosts?.find((el) => el?.included === false);
        const nativeToken = await tokens_1.PriceToken.createFromToken(native_tokens_1.nativeTokensList[from.blockchain]);
        if (providerFee && providerFee.amount !== '0') {
            feeInfo.provider = {
                cryptoFee: {
                    amount: web3_pure_1.Web3Pure.fromWei(new bignumber_js_1.default(providerFee.amount), providerFee.token.decimals),
                    token: nativeToken
                }
            };
        }
        from = new tokens_1.PriceTokenAmount({
            ...from.asStructWithAmount,
            price: new bignumber_js_1.default(bestRoute.fromAmountUSD).dividedBy(from.tokenAmount)
        });
        const to = new tokens_1.PriceTokenAmount({
            ...toToken.asStruct,
            weiAmount: new bignumber_js_1.default(bestRoute.toAmount)
        });
        const priceImpact = from.calculatePriceImpactPercent(to);
        const gasData = options.gasCalculation === 'enabled'
            ? await lifi_cross_chain_trade_1.LifiCrossChainTrade.getGasData(from, to, bestRoute, feeInfo, options.providerAddress, options.receiverAddress)
            : null;
        const { onChainType, bridgeType } = this.parseTradeTypes(bestRoute.steps);
        const trade = new lifi_cross_chain_trade_1.LifiCrossChainTrade({
            from,
            to,
            route: bestRoute,
            gasData,
            toTokenAmountMin: web3_pure_1.Web3Pure.fromWei(bestRoute.toAmountMin, to.decimals),
            feeInfo,
            priceImpact,
            onChainSubtype: onChainType,
            bridgeType: bridgeType || bridge_type_1.BRIDGE_TYPE.LIFI,
            slippage: options.slippageTolerance
        }, options.providerAddress, await this.getRoutePath(from, to, bestRoute));
        try {
            this.checkMinError(from);
        }
        catch (err) {
            return {
                trade,
                error: err,
                tradeType: this.type
            };
        }
        return {
            trade,
            tradeType: this.type
        };
    }
    checkMinError(from) {
        const fromUsdAmount = from.price.multipliedBy(from.tokenAmount);
        if (fromUsdAmount.lt(this.MIN_AMOUNT_USD)) {
            if (from.price.gt(0)) {
                const minTokenAmount = this.MIN_AMOUNT_USD.multipliedBy(from.tokenAmount).dividedBy(fromUsdAmount);
                throw new errors_1.MinAmountError(minTokenAmount, from.symbol);
            }
            throw new errors_1.MinAmountError(this.MIN_AMOUNT_USD, 'USDC');
        }
    }
    async getFeeInfo(fromBlockchain, providerAddress, percentFeeToken, useProxy) {
        return proxy_cross_chain_evm_trade_1.ProxyCrossChainEvmTrade.getFeeInfo(fromBlockchain, providerAddress, percentFeeToken, useProxy);
    }
    parseTradeTypes(bestRouteSteps) {
        if (!bestRouteSteps[0]) {
            return {
                onChainType: { from: undefined, to: undefined },
                bridgeType: undefined
            };
        }
        const steps = bestRouteSteps[0].includedSteps;
        if (!steps[0]) {
            return {
                onChainType: { from: undefined, to: undefined },
                bridgeType: undefined
            };
        }
        const sourceDex = steps[0].action.fromChainId === steps[0].action.toChainId
            ? steps?.[0].toolDetails.name.toLowerCase()
            : undefined;
        const targetDex = steps
            ?.slice(1)
            ?.find(provider => provider.action.fromChainId === provider.action.toChainId)
            ?.toolDetails.name.toLowerCase();
        let subType = bestRouteSteps
            ?.find(provider => provider.action.fromChainId !== provider.action.toChainId)
            ?.tool.toLowerCase();
        subType = subType === 'amarok' ? bridge_type_1.BRIDGE_TYPE.AMAROK : subType;
        const onChainType = {
            from: sourceDex ? lifi_providers_1.lifiProviders[sourceDex] : undefined,
            to: targetDex ? lifi_providers_1.lifiProviders[targetDex] : undefined
        };
        const bridgeType = bridge_type_1.bridges.find(bridge => bridge.toLowerCase() === subType);
        return {
            onChainType,
            bridgeType
        };
    }
    checkBridgeTypes(notAllowedBridgeTypes) {
        const lifiBridgeTypesArray = Object.values(lifi_bridge_types_1.LIFI_BRIDGE_TYPES);
        return notAllowedBridgeTypes.every(bridgeType => lifiBridgeTypesArray.includes(bridgeType));
    }
    async getRoutePath(from, to, route) {
        const lifiSteps = route.steps[0].includedSteps;
        const crossChainStep = lifiSteps.find(el => el.type === 'cross');
        const fromTransit = crossChainStep.action?.fromAddress || crossChainStep.action.fromToken.address;
        const toTransit = crossChainStep.action?.toAddress || crossChainStep.action.toToken.address;
        const fromTokenAmount = await tokens_1.TokenAmount.createToken({
            address: fromTransit,
            blockchain: from.blockchain,
            weiAmount: new bignumber_js_1.default(crossChainStep.action.fromAmount)
        });
        const toTokenAmount = await tokens_1.TokenAmount.createToken({
            address: toTransit,
            blockchain: to.blockchain,
            weiAmount: new bignumber_js_1.default(crossChainStep.estimate.toAmount)
        });
        // @TODO Add dex true provider and path
        const routePath = [];
        if (lifiSteps?.[0]?.type === 'swap') {
            routePath.push({
                type: 'on-chain',
                path: [from, fromTokenAmount],
                provider: on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.LIFI
            });
        }
        routePath.push({
            type: 'cross-chain',
            path: [fromTokenAmount, toTokenAmount],
            provider: cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.LIFI
        });
        if (lifiSteps?.[2]?.type === 'swap') {
            routePath.push({
                type: 'on-chain',
                path: [toTokenAmount, to],
                provider: on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.LIFI
            });
        }
        return routePath;
    }
}
exports.LifiCrossChainProvider = LifiCrossChainProvider;
//# sourceMappingURL=lifi-cross-chain-provider.js.map