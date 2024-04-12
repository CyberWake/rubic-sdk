"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OdosOnChainProvider = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../../common/errors");
const tokens_1 = require("../../../../../../common/tokens");
const injector_1 = require("../../../../../../core/injector/injector");
const fake_wallet_address_1 = require("../../../../../common/constants/fake-wallet-address");
const on_chain_trade_type_1 = require("../../common/models/on-chain-trade-type");
const aggregator_on_chain_provider_abstract_1 = require("../../common/on-chain-aggregator/aggregator-on-chain-provider-abstract");
const get_gas_fee_info_1 = require("../../common/utils/get-gas-fee-info");
const get_gas_price_info_1 = require("../../common/utils/get-gas-price-info");
const odos_supported_blockchains_1 = require("./models/odos-supported-blockchains");
const odos_on_chain_trade_1 = require("./odos-on-chain-trade");
const odos_on_chain_api_service_1 = require("./services/odos-on-chain-api-service");
const odos_on_chain_parser_1 = require("./services/odos-on-chain-parser");
class OdosOnChainProvider extends aggregator_on_chain_provider_abstract_1.AggregatorOnChainProvider {
    constructor() {
        super(...arguments);
        this.tradeType = on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.ODOS;
    }
    isSupportedBlockchain(blockchainName) {
        return odos_supported_blockchains_1.odosSupportedBlockchains.some(chain => chain === blockchainName);
    }
    async calculate(from, toToken, options) {
        if (!this.isSupportedBlockchain(from.blockchain)) {
            throw new errors_1.RubicSdkError(`Odos doesn't support ${from.blockchain} chain!`);
        }
        const walletAddress = injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(from.blockchain).address;
        try {
            const { fromWithoutFee, proxyFeeInfo } = await this.handleProxyContract(from, options);
            const path = this.getRoutePath(from, toToken);
            const bestRouteRequestBody = odos_on_chain_parser_1.OdosOnChainParser.getBestRouteBody({
                from,
                toToken,
                options,
                swappersBlacklist: [],
                swappersWhitelist: []
            });
            const { pathId, outAmounts, gasEstimate } = await odos_on_chain_api_service_1.OdosOnChainApiService.getBestRoute(bestRouteRequestBody);
            const { transaction: tx } = await odos_on_chain_api_service_1.OdosOnChainApiService.getSwapTx({
                pathId,
                userAddr: options.fromAddress ?? walletAddress ?? fake_wallet_address_1.FAKE_WALLET_ADDRESS
            });
            const providerGateway = tx.to;
            const outputAmount = outAmounts[0];
            const to = new tokens_1.PriceTokenAmount({
                ...toToken.asStruct,
                weiAmount: new bignumber_js_1.default(outputAmount)
            });
            const tradeStruct = {
                from,
                to,
                fromWithoutFee,
                proxyFeeInfo,
                gasFeeInfo: {
                    gasLimit: new bignumber_js_1.default(gasEstimate)
                },
                slippageTolerance: options.slippageTolerance,
                useProxy: options.useProxy,
                withDeflation: options.withDeflation,
                path,
                bestRouteRequestBody
            };
            const gasFeeInfo = options.gasCalculation === 'calculate'
                ? await this.getGasFeeInfo(tradeStruct, providerGateway)
                : null;
            return new odos_on_chain_trade_1.OdosOnChainTrade({
                ...tradeStruct,
                gasFeeInfo
            }, options.providerAddress, providerGateway);
        }
        catch (err) {
            return {
                type: on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.ODOS,
                error: err
            };
        }
    }
    async getGasFeeInfo(tradeStruct, providerGateway) {
        try {
            const gasPriceInfo = await (0, get_gas_price_info_1.getGasPriceInfo)(tradeStruct.from.blockchain);
            const gasLimit = tradeStruct.gasFeeInfo?.gasLimit
                ? tradeStruct.gasFeeInfo?.gasLimit
                : await odos_on_chain_trade_1.OdosOnChainTrade.getGasLimit(tradeStruct, providerGateway);
            return (0, get_gas_fee_info_1.getGasFeeInfo)(gasLimit, gasPriceInfo);
        }
        catch {
            return null;
        }
    }
}
exports.OdosOnChainProvider = OdosOnChainProvider;
//# sourceMappingURL=odos-on-chain-provider.js.map