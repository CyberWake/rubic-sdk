"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneinchAbstractProvider = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../../../common/errors");
const tokens_1 = require("../../../../../../../common/tokens");
const native_tokens_1 = require("../../../../../../../common/tokens/constants/native-tokens");
const options_1 = require("../../../../../../../common/utils/options");
const token_native_address_proxy_1 = require("../../../../../../common/utils/token-native-address-proxy");
const rubic_proxy_contract_address_1 = require("../../../../../../cross-chain/calculation-manager/providers/common/constants/rubic-proxy-contract-address");
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const get_gas_fee_info_1 = require("../../../common/utils/get-gas-fee-info");
const evm_provider_default_options_1 = require("../on-chain-provider/evm-on-chain-provider/constants/evm-provider-default-options");
const evm_on_chain_provider_1 = require("../on-chain-provider/evm-on-chain-provider/evm-on-chain-provider");
const constants_1 = require("./constants");
const oneinch_trade_1 = require("./oneinch-trade");
const utils_1 = require("./utils");
class OneinchAbstractProvider extends evm_on_chain_provider_1.EvmOnChainProvider {
    constructor() {
        super(...arguments);
        this.defaultOptions = {
            ...evm_provider_default_options_1.evmProviderDefaultOptions,
            disableMultihops: false,
            wrappedAddress: constants_1.oneinchApiParams.nativeAddress
        };
    }
    get type() {
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.ONE_INCH;
    }
    async loadContractAddress() {
        const response = await (0, utils_1.oneInchHttpGetApproveRequest)('approve/spender', this.blockchain);
        return response.address;
    }
    /**
     * Calculates input amount, based on amount, user wants to get.
     * @param from Token to sell.
     * @param to Token to get with output amount.
     * @param options Additional options.
     */
    async calculateExactOutputAmount(from, to, options) {
        return (await this.calculate(to, from, options)).to.tokenAmount;
    }
    async calculate(from, toToken, options) {
        const fromAddress = options?.useProxy || this.defaultOptions.useProxy
            ? rubic_proxy_contract_address_1.rubicProxyContractAddress[from.blockchain].gateway
            : this.walletAddress;
        const fullOptions = (0, options_1.combineOptions)(options, {
            ...this.defaultOptions,
            fromAddress
        });
        const { fromWithoutFee, proxyFeeInfo } = await this.handleProxyContract(from, fullOptions);
        const fromTokenClone = (0, token_native_address_proxy_1.createTokenNativeAddressProxy)(fromWithoutFee, constants_1.oneinchApiParams.nativeAddress);
        const toTokenClone = (0, token_native_address_proxy_1.createTokenNativeAddressProxy)(toToken, constants_1.oneinchApiParams.nativeAddress);
        const [dexContractAddress, { toTokenAmountInWei, estimatedGas, path, data }] = await Promise.all([
            this.loadContractAddress(),
            this.getTradeInfo(fromTokenClone, toTokenClone, fromWithoutFee, fullOptions)
        ]);
        path[0] = from;
        path[path.length - 1] = toToken;
        const to = new tokens_1.PriceTokenAmount({
            ...toToken.asStruct,
            weiAmount: toTokenAmountInWei
        });
        const availableProtocols = this.getAvailableProtocols();
        const oneinchTradeStruct = {
            dexContractAddress,
            from,
            to,
            slippageTolerance: fullOptions.slippageTolerance,
            disableMultihops: fullOptions.disableMultihops,
            path,
            gasFeeInfo: null,
            data,
            useProxy: fullOptions.useProxy,
            proxyFeeInfo,
            fromWithoutFee,
            withDeflation: fullOptions.withDeflation,
            usedForCrossChain: fullOptions.usedForCrossChain,
            availableProtocols
        };
        try {
            const gasPriceInfo = await this.getGasPriceInfo();
            const gasLimit = (await oneinch_trade_1.OneinchTrade.getGasLimit(oneinchTradeStruct)) || estimatedGas;
            const gasFeeInfo = (0, get_gas_fee_info_1.getGasFeeInfo)(gasLimit, gasPriceInfo);
            return new oneinch_trade_1.OneinchTrade({
                ...oneinchTradeStruct,
                gasFeeInfo
            }, fullOptions.providerAddress);
        }
        catch {
            return new oneinch_trade_1.OneinchTrade(oneinchTradeStruct, fullOptions.providerAddress);
        }
    }
    async getTradeInfo(from, toToken, fromWithoutFee, options) {
        const fakeAddress = '0xe388Ed184958062a2ea29B7fD049ca21244AE02e';
        const isDefaultWrappedAddress = options.wrappedAddress === constants_1.oneinchApiParams.nativeAddress;
        const isNative = from.isNative || from.address === constants_1.oneinchApiParams.nativeAddress;
        const fromTokenAddress = isNative && !isDefaultWrappedAddress ? options.wrappedAddress : from.address;
        const toTokenAddress = toToken.address;
        const availableProtocols = this.getAvailableProtocols();
        const quoteTradeParams = {
            params: {
                src: fromTokenAddress,
                dst: toTokenAddress,
                amount: from.stringWeiAmount,
                ...(options.disableMultihops && {
                    connectorTokens: `${fromTokenAddress},${toTokenAddress}`
                }),
                ...(availableProtocols && { protocols: availableProtocols })
            }
        };
        let oneInchTrade;
        let estimatedGas;
        let toTokenAmount;
        let data = null;
        let path = [];
        try {
            if (!options.fromAddress) {
                throw new Error('Address is not set');
            }
            if (options.gasCalculation !== 'disabled') {
                await oneinch_trade_1.OneinchTrade.checkIfNeedApproveAndThrowError(from, toToken, fromWithoutFee, options.fromAddress, options.useProxy);
            }
            const swapTradeParams = {
                params: {
                    ...quoteTradeParams.params,
                    slippage: (options.slippageTolerance * 100).toString(),
                    from: this.walletAddress || fakeAddress,
                    disableEstimate: options.gasCalculation === 'disabled'
                }
            };
            oneInchTrade = await (0, utils_1.oneInchHttpGetRequest)('swap', this.blockchain, swapTradeParams);
            estimatedGas = new bignumber_js_1.default(oneInchTrade.tx.gas);
            toTokenAmount = oneInchTrade.toAmount;
            data = oneInchTrade.tx.data;
        }
        catch (_err) {
            oneInchTrade = await (0, utils_1.oneInchHttpGetRequest)('quote', this.blockchain, quoteTradeParams);
            if (oneInchTrade.hasOwnProperty('errors') || !oneInchTrade.toAmount) {
                throw new errors_1.RubicSdkError('1inch quote error');
            }
            estimatedGas = new bignumber_js_1.default(oneInchTrade.gas);
            toTokenAmount = oneInchTrade.toAmount;
        }
        if (oneInchTrade?.protocols?.length) {
            path = await this.extractPath(from, toToken, oneInchTrade);
        }
        return { toTokenAmountInWei: new bignumber_js_1.default(toTokenAmount), estimatedGas, path, data };
    }
    /**
     * Extracts tokens path from oneInch api response.
     * @returns Promise<Token[]> Tokens array, used in the route.
     */
    async extractPath(fromToken, toToken, oneInchTrade) {
        const addressesPath = oneInchTrade.protocols[0].map(protocol => {
            if (!protocol?.[0]) {
                throw new errors_1.RubicSdkError('Protocol array must not be empty');
            }
            return protocol[0].toTokenAddress;
        });
        addressesPath.pop();
        const tokensPathWithoutNative = await tokens_1.Token.createTokens(addressesPath.filter(tokenAddress => tokenAddress !== constants_1.oneinchApiParams.nativeAddress), this.blockchain);
        let tokensPathWithoutNativeIndex = 0;
        const tokensPath = addressesPath.map(tokenAddress => {
            if (tokenAddress === constants_1.oneinchApiParams.nativeAddress) {
                return native_tokens_1.nativeTokensList[this.blockchain];
            }
            const token = tokensPathWithoutNative[tokensPathWithoutNativeIndex];
            if (!token) {
                throw new errors_1.RubicSdkError('Token has to be defined');
            }
            tokensPathWithoutNativeIndex++;
            return token;
        });
        return [fromToken, ...tokensPath, toToken];
    }
    getAvailableProtocols() {
        return undefined;
    }
}
exports.OneinchAbstractProvider = OneinchAbstractProvider;
//# sourceMappingURL=oneinch-abstract-provider.js.map