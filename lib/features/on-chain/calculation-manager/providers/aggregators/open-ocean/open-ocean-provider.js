"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenOceanProvider = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../../common/errors");
const tokens_1 = require("../../../../../../common/tokens");
const native_tokens_1 = require("../../../../../../common/tokens/constants/native-tokens");
const p_timeout_1 = __importDefault(require("../../../../../../common/utils/p-timeout"));
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const web3_pure_1 = require("../../../../../../core/blockchain/web3-pure/web3-pure");
const injector_1 = require("../../../../../../core/injector/injector");
const get_open_ocean_api_url_1 = require("./constants/get-open-ocean-api-url");
const open_ocean_blockchain_1 = require("./constants/open-ocean-blockchain");
const open_ocean_on_chain_supported_blockchain_1 = require("./constants/open-ocean-on-chain-supported-blockchain");
const open_ocean_trade_1 = require("./open-ocean-trade");
const on_chain_trade_type_1 = require("../../common/models/on-chain-trade-type");
const get_gas_fee_info_1 = require("../../common/utils/get-gas-fee-info");
const get_gas_price_info_1 = require("../../common/utils/get-gas-price-info");
const aggregator_on_chain_provider_abstract_1 = require("../../common/on-chain-aggregator/aggregator-on-chain-provider-abstract");
const arbitrum_gas_price_1 = require("./constants/arbitrum-gas-price");
class OpenOceanProvider extends aggregator_on_chain_provider_abstract_1.AggregatorOnChainProvider {
    constructor() {
        super(...arguments);
        this.tradeType = on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.OPEN_OCEAN;
    }
    isSupportedBlockchain(blockchain) {
        return open_ocean_on_chain_supported_blockchain_1.openoceanOnChainSupportedBlockchains.some(item => item === blockchain);
    }
    async calculate(from, toToken, options) {
        try {
            if (!this.isSupportedBlockchain(from.blockchain)) {
                throw new errors_1.RubicSdkError(`Open Ocean doesn't support ${from.blockchain} chain!`);
            }
            await this.checkIsSupportedTokens(from, toToken);
            const { fromWithoutFee, proxyFeeInfo } = await this.handleProxyContract(from, options);
            const blockchain = from.blockchain;
            const gasPrice = await injector_1.Injector.web3PublicService
                .getWeb3Public(blockchain)
                .getGasPrice();
            const isArbitrum = blockchain === blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM;
            const apiUrl = get_open_ocean_api_url_1.openOceanApiUrl.quote(open_ocean_blockchain_1.openOceanBlockchainName[blockchain]);
            const quoteResponse = await (0, p_timeout_1.default)(injector_1.Injector.httpClient.get(apiUrl, {
                headers: { apikey: 'sndfje3u4b3fnNSDNFUSDNVSunw345842hrnfd3b4nt4' },
                params: {
                    chain: open_ocean_blockchain_1.openOceanBlockchainName[blockchain],
                    inTokenAddress: this.getTokenAddress(fromWithoutFee),
                    outTokenAddress: this.getTokenAddress(toToken),
                    amount: fromWithoutFee.tokenAmount.toString(),
                    slippage: options.slippageTolerance * 100,
                    gasPrice: isArbitrum
                        ? arbitrum_gas_price_1.ARBITRUM_GAS_PRICE
                        : web3_pure_1.Web3Pure.fromWei(gasPrice, native_tokens_1.nativeTokensList[from.blockchain].decimals)
                            .multipliedBy(10 ** 9)
                            .toString()
                }
            }), 7000);
            if ([500, 400].includes(quoteResponse.code)) {
                return {
                    type: on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.OPEN_OCEAN,
                    error: new errors_1.RubicSdkError(quoteResponse.error)
                };
            }
            const to = new tokens_1.PriceTokenAmount({
                ...toToken.asStruct,
                weiAmount: new bignumber_js_1.default(quoteResponse.data.outAmount)
            });
            const toTokenWeiAmountMin = new bignumber_js_1.default(quoteResponse.data.outAmount).multipliedBy(1 - options.slippageTolerance);
            const openOceanTradeStruct = {
                from,
                to,
                gasFeeInfo: {
                    gasLimit: new bignumber_js_1.default(quoteResponse.data.estimatedGas)
                },
                slippageTolerance: options.slippageTolerance,
                path: [from, to],
                toTokenWeiAmountMin,
                useProxy: options.useProxy,
                proxyFeeInfo,
                fromWithoutFee,
                withDeflation: options.withDeflation
            };
            const gasFeeInfo = options.gasCalculation === 'calculate'
                ? await this.getGasFeeInfo(openOceanTradeStruct)
                : null;
            return new open_ocean_trade_1.OpenOceanTrade({
                ...openOceanTradeStruct,
                gasFeeInfo
            }, options.providerAddress);
        }
        catch (error) {
            return {
                type: on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.OPEN_OCEAN,
                error
            };
        }
    }
    getTokenAddress(token) {
        if (token.isNative) {
            if (token.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.METIS) {
                return '0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000';
            }
            return OpenOceanProvider.nativeAddress;
        }
        return token.address;
    }
    async getGasFeeInfo(tradeStruct) {
        try {
            const gasPriceInfo = await (0, get_gas_price_info_1.getGasPriceInfo)(tradeStruct.from.blockchain);
            const gasLimit = tradeStruct?.gasFeeInfo?.gasLimit ||
                (await open_ocean_trade_1.OpenOceanTrade.getGasLimit(tradeStruct));
            return (0, get_gas_fee_info_1.getGasFeeInfo)(gasLimit, gasPriceInfo);
        }
        catch {
            return null;
        }
    }
    async checkIsSupportedTokens(from, to) {
        const apiUrl = get_open_ocean_api_url_1.openOceanApiUrl.tokenList(open_ocean_blockchain_1.openOceanBlockchainName[from.blockchain]);
        const tokenListResponse = await injector_1.Injector.httpClient.get(apiUrl, { headers: { apikey: 'sndfje3u4b3fnNSDNFUSDNVSunw345842hrnfd3b4nt4' } });
        const tokens = tokenListResponse?.data?.map(token => token.address.toLocaleLowerCase());
        const isSupportedTokens = Boolean(tokens.length) &&
            (from.isNative || tokens.includes(from.address.toLocaleLowerCase())) &&
            (to.isNative || tokens.includes(to.address.toLocaleLowerCase()));
        if (!isSupportedTokens) {
            throw new errors_1.RubicSdkError('Unsupported token pair');
        }
    }
}
exports.OpenOceanProvider = OpenOceanProvider;
OpenOceanProvider.nativeAddress = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
//# sourceMappingURL=open-ocean-provider.js.map