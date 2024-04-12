"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrbiterBridgeProvider = void 0;
const errors_1 = require("../../../../../common/errors");
const tokens_1 = require("../../../../../common/tokens");
const injector_1 = require("../../../../../core/injector/injector");
const check_unsupported_receiver_address_1 = require("../../../../common/utils/check-unsupported-receiver-address");
const get_from_without_fee_1 = require("../../../../common/utils/get-from-without-fee");
const cross_chain_trade_type_1 = require("../../models/cross-chain-trade-type");
const cross_chain_provider_1 = require("../common/cross-chain-provider");
const proxy_cross_chain_evm_trade_1 = require("../common/proxy-cross-chain-evm-facade/proxy-cross-chain-evm-trade");
const orbiter_supported_blockchains_1 = require("./models/orbiter-supported-blockchains");
const orbiter_bridge_trade_1 = require("./orbiter-bridge-trade");
const orbiter_api_service_1 = require("./services/orbiter-api-service");
const orbiter_utils_1 = require("./services/orbiter-utils");
class OrbiterBridgeProvider extends cross_chain_provider_1.CrossChainProvider {
    constructor() {
        super(...arguments);
        this.type = cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.ORBITER_BRIDGE;
        this.orbiterQuoteConfigs = [];
    }
    isSupportedBlockchain(blockchain) {
        return orbiter_supported_blockchains_1.orbiterSupportedBlockchains.some(supportedBlockchain => supportedBlockchain === blockchain);
    }
    async calculate(from, toToken, options) {
        const fromBlockchain = from.blockchain;
        const useProxy = options?.useProxy?.[this.type] ?? true;
        try {
            const walletAddress = injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(fromBlockchain).address;
            (0, check_unsupported_receiver_address_1.checkUnsupportedReceiverAddress)(options?.receiverAddress, walletAddress);
            this.orbiterQuoteConfigs = await orbiter_api_service_1.OrbiterApiService.getQuoteConfigs();
            const feeInfo = await this.getFeeInfo(fromBlockchain, options.providerAddress, from, useProxy);
            const fromWithoutFee = (0, get_from_without_fee_1.getFromWithoutFee)(from, feeInfo.rubicProxy?.platformFee?.percent);
            const quoteConfig = orbiter_utils_1.OrbiterUtils.getQuoteConfig({
                from,
                to: toToken,
                configs: this.orbiterQuoteConfigs
            });
            if (!orbiter_utils_1.OrbiterUtils.isAmountCorrect(from.tokenAmount, quoteConfig)) {
                throw new errors_1.RubicSdkError(`
                    [ORBITER] Amount is out of range. 
                    Min amount - ${quoteConfig.minAmt} ${from.symbol}.
                    Max amount - ${quoteConfig.maxAmt} ${from.symbol}.
                `);
            }
            const toAmount = await orbiter_api_service_1.OrbiterApiService.calculateAmount(fromWithoutFee, quoteConfig);
            const to = new tokens_1.PriceTokenAmount({
                ...toToken.asStruct,
                tokenAmount: toAmount
            });
            const gasData = options.gasCalculation === 'enabled'
                ? await orbiter_bridge_trade_1.OrbiterBridgeTrade.getGasData({
                    feeInfo,
                    fromToken: from,
                    toToken: to,
                    receiverAddress: options.receiverAddress,
                    providerAddress: options.providerAddress,
                    quoteConfig
                })
                : null;
            const trade = new orbiter_bridge_trade_1.OrbiterBridgeTrade({
                crossChainTrade: {
                    feeInfo,
                    from,
                    gasData,
                    to,
                    priceImpact: from.calculatePriceImpactPercent(to),
                    quoteConfig
                },
                providerAddress: options.providerAddress,
                routePath: await this.getRoutePath(from, to)
            });
            return { trade, tradeType: this.type };
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
    async getRoutePath(fromToken, toToken) {
        return [{ type: 'cross-chain', provider: this.type, path: [fromToken, toToken] }];
    }
    async getFeeInfo(fromBlockchain, providerAddress, percentFeeToken, useProxy) {
        return proxy_cross_chain_evm_trade_1.ProxyCrossChainEvmTrade.getFeeInfo(fromBlockchain, providerAddress, percentFeeToken, useProxy);
    }
}
exports.OrbiterBridgeProvider = OrbiterBridgeProvider;
//# sourceMappingURL=orbiter-bridge-provider.js.map