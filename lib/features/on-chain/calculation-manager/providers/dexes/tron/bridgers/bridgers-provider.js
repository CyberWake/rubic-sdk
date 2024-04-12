"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BridgersProvider = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../../../common/errors");
const tokens_1 = require("../../../../../../../common/tokens");
const native_tokens_1 = require("../../../../../../../common/tokens/constants/native-tokens");
const options_1 = require("../../../../../../../common/utils/options");
const bridgers_native_address_1 = require("../../../../../../common/providers/bridgers/constants/bridgers-native-address");
const to_bridgers_blockchain_1 = require("../../../../../../common/providers/bridgers/constants/to-bridgers-blockchain");
const token_native_address_proxy_1 = require("../../../../../../common/utils/token-native-address-proxy");
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const on_chain_provider_1 = require("../../common/on-chain-provider/on-chain-provider");
const tron_provider_default_options_1 = require("../../common/on-chain-provider/tron-on-chain-provider/constants/tron-provider-default-options");
const tron_on_chain_provider_1 = require("../../common/on-chain-provider/tron-on-chain-provider/tron-on-chain-provider");
const bridgers_trade_1 = require("./bridgers-trade");
class BridgersProvider extends tron_on_chain_provider_1.TronOnChainProvider {
    constructor() {
        super(...arguments);
        this.defaultOptions = tron_provider_default_options_1.tronProviderDefaultOptions;
    }
    get type() {
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.BRIDGERS;
    }
    async calculate(from, toToken, options) {
        const fullOptions = (0, options_1.combineOptions)(options, this.defaultOptions);
        const fromTokenAddress = (0, token_native_address_proxy_1.createTokenNativeAddressProxy)(from, bridgers_native_address_1.bridgersNativeAddress, false).address;
        const toTokenAddress = (0, token_native_address_proxy_1.createTokenNativeAddressProxy)(toToken, bridgers_native_address_1.bridgersNativeAddress, false).address;
        const quoteRequest = {
            fromTokenAddress,
            toTokenAddress,
            fromTokenAmount: from.stringWeiAmount,
            fromTokenChain: to_bridgers_blockchain_1.toBridgersBlockchain[from.blockchain],
            toTokenChain: to_bridgers_blockchain_1.toBridgersBlockchain[toToken.blockchain]
        };
        const quoteResponse = await this.httpClient.post('https://sswap.swft.pro/api/sswap/quote', quoteRequest);
        const transactionData = quoteResponse.data?.txData;
        if (quoteResponse.resCode !== 100 || !transactionData) {
            throw on_chain_provider_1.OnChainProvider.parseError(new errors_1.BridgersPairIsUnavailableError());
        }
        if (from.tokenAmount.lt(transactionData.depositMin)) {
            throw new errors_1.MinAmountError(new bignumber_js_1.default(transactionData.depositMin), from.symbol);
        }
        if (from.tokenAmount.gt(transactionData.depositMax)) {
            throw new errors_1.MaxAmountError(new bignumber_js_1.default(transactionData.depositMax), from.symbol);
        }
        const to = new tokens_1.PriceTokenAmount({
            ...toToken.asStruct,
            tokenAmount: new bignumber_js_1.default(transactionData.toTokenAmount)
        });
        const cryptoFeeToken = new tokens_1.TokenAmount({
            ...native_tokens_1.nativeTokensList[from.blockchain],
            tokenAmount: new bignumber_js_1.default(transactionData.chainFee)
        });
        const platformFeePercent = transactionData.fee * 100;
        const platformFee = {
            percent: platformFeePercent,
            token: await tokens_1.PriceTokenAmount.createToken({
                ...from,
                tokenAmount: from.tokenAmount.multipliedBy(platformFeePercent / 100)
            })
        };
        return new bridgers_trade_1.BridgersTrade({
            from,
            to,
            slippageTolerance: fullOptions.slippageTolerance,
            contractAddress: transactionData.contractAddress,
            cryptoFeeToken,
            platformFee
        }, fullOptions.providerAddress);
    }
}
exports.BridgersProvider = BridgersProvider;
//# sourceMappingURL=bridgers-provider.js.map