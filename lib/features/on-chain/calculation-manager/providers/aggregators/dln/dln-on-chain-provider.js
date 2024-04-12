"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DlnOnChainProvider = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../../common/errors");
const tokens_1 = require("../../../../../../common/tokens");
const options_1 = require("../../../../../../common/utils/options");
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const blockchain_id_1 = require("../../../../../../core/blockchain/utils/blockchains-info/constants/blockchain-id");
const web3_pure_1 = require("../../../../../../core/blockchain/web3-pure/web3-pure");
const dln_api_service_1 = require("../../../../../common/providers/dln/dln-api-service");
const dln_utils_1 = require("../../../../../common/providers/dln/dln-utils");
const dln_on_chain_supported_blockchains_1 = require("./constants/dln-on-chain-supported-blockchains");
const dln_on_chain_factory_1 = require("./dln-on-chain-factory");
const on_chain_trade_type_1 = require("../../common/models/on-chain-trade-type");
const evm_provider_default_options_1 = require("../../dexes/common/on-chain-provider/evm-on-chain-provider/constants/evm-provider-default-options");
const aggregator_on_chain_provider_abstract_1 = require("../../common/on-chain-aggregator/aggregator-on-chain-provider-abstract");
class DlnOnChainProvider extends aggregator_on_chain_provider_abstract_1.AggregatorOnChainProvider {
    constructor() {
        super(...arguments);
        this.tradeType = on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.DLN;
        this.defaultOptions = {
            ...evm_provider_default_options_1.evmProviderDefaultOptions,
            gasCalculation: 'calculate'
        };
    }
    isSupportedBlockchain(blockchain) {
        return dln_on_chain_supported_blockchains_1.dlnOnChainSupportedBlockchains.some(supportedNetwork => supportedNetwork === blockchain);
    }
    async calculate(from, toToken, options) {
        if (!this.isSupportedBlockchain(from.blockchain)) {
            throw new errors_1.RubicSdkError('Blockchain is not supported');
        }
        if (options.withDeflation.from.isDeflation || options.withDeflation.to.isDeflation) {
            throw new errors_1.RubicSdkError('[RUBIC_SDK] DLN does not work if source token is deflation.');
        }
        const fullOptions = (0, options_1.combineOptions)(options, {
            ...this.defaultOptions,
            disabledProviders: [...options.disabledProviders, on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.DODO]
        });
        const { fromWithoutFee, proxyFeeInfo } = await this.handleProxyContract(from, fullOptions);
        const fromChainId = blockchain_id_1.blockchainId[from.blockchain];
        const fakeReceiver = dln_utils_1.DlnUtils.getFakeReceiver(toToken.blockchain);
        const slippage = new bignumber_js_1.default(options.slippageTolerance).multipliedBy(100).toNumber();
        const requestParams = {
            ...this.getAffiliateFee(from.blockchain),
            chainId: fromChainId,
            tokenIn: dln_utils_1.DlnUtils.getSupportedAddress(from),
            tokenInAmount: fromWithoutFee.stringWeiAmount,
            slippage,
            tokenOut: dln_utils_1.DlnUtils.getSupportedAddress(toToken),
            tokenOutRecipient: fakeReceiver
        };
        const debridgeResponse = await dln_api_service_1.DlnApiService.fetchOnChainSwapData(requestParams);
        const to = new tokens_1.PriceTokenAmount({
            ...toToken.asStruct,
            tokenAmount: web3_pure_1.Web3Pure.fromWei(debridgeResponse.tokenOut.amount, debridgeResponse.tokenOut.decimals)
        });
        const toTokenAmountMin = web3_pure_1.Web3Pure.fromWei(debridgeResponse.tokenOut.minAmount, debridgeResponse.tokenOut.decimals);
        const path = this.getRoutePath(from, to);
        const tradeStruct = {
            from,
            to,
            gasFeeInfo: null,
            slippageTolerance: fullOptions.slippageTolerance,
            type: this.tradeType,
            path,
            toTokenWeiAmountMin: toTokenAmountMin,
            useProxy: fullOptions.useProxy,
            proxyFeeInfo,
            fromWithoutFee,
            withDeflation: fullOptions.withDeflation,
            transactionRequest: requestParams,
            providerGateway: debridgeResponse.tx.to || ''
        };
        if (fullOptions.gasCalculation === 'calculate') {
            tradeStruct.gasFeeInfo = await this.getGasFeeInfo(tradeStruct);
        }
        return dln_on_chain_factory_1.DlnOnChainFactory.createTrade(from.blockchain, tradeStruct, options.providerAddress);
    }
    async getGasFeeInfo(_tradeStruct, _providerGateway) {
        return null;
    }
    getAffiliateFee(fromBlockchain) {
        if (fromBlockchain === blockchain_name_1.BLOCKCHAIN_NAME.SOLANA) {
            return {
                affiliateFeeRecipient: '6pvJfh73w1HT3b9eKRMX3EfrKH5AihVqRhasyhN5qtfP',
                affiliateFeePercent: 0.1
            };
        }
        return {};
    }
}
exports.DlnOnChainProvider = DlnOnChainProvider;
//# sourceMappingURL=dln-on-chain-provider.js.map