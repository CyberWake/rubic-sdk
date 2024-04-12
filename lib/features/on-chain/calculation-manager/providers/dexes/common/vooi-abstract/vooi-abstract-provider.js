"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VooiAbstractProvider = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../../../common/errors");
const tokens_1 = require("../../../../../../../common/tokens");
const options_1 = require("../../../../../../../common/utils/options");
const injector_1 = require("../../../../../../../core/injector/injector");
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const evm_provider_default_options_1 = require("../on-chain-provider/evm-on-chain-provider/constants/evm-provider-default-options");
const evm_on_chain_provider_1 = require("../on-chain-provider/evm-on-chain-provider/evm-on-chain-provider");
const get_from_to_tokens_amounts_by_exact_1 = require("../utils/get-from-to-tokens-amounts-by-exact");
const omni_pool_abi_1 = require("./constants/omni-pool-abi");
class VooiAbstractProvider extends evm_on_chain_provider_1.EvmOnChainProvider {
    constructor() {
        super(...arguments);
        this.defaultOptions = {
            ...evm_provider_default_options_1.evmProviderDefaultOptions,
            deadlineMinutes: (0, options_1.deadlineMinutesTimestamp)(10)
        };
    }
    get type() {
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.VOOI;
    }
    async calculate(fromToken, toToken, options) {
        const fromPoolId = this.vooiPoolIdMapping[fromToken.address.toLowerCase()];
        const toPoolId = this.vooiPoolIdMapping[toToken.address.toLowerCase()];
        if (fromPoolId === undefined || toPoolId === undefined) {
            throw new errors_1.RubicSdkError('Vooi DEX supports only USDC.e, USDT, DAI token');
        }
        const fullOptions = (0, options_1.combineOptions)(options, this.defaultOptions);
        let weiAmountWithoutFee = fromToken.weiAmount;
        let proxyFeeInfo;
        if (fullOptions.useProxy) {
            const proxyContractInfo = await this.handleProxyContract(new tokens_1.PriceTokenAmount({
                ...fromToken.asStruct,
                weiAmount: fromToken.weiAmount
            }), fullOptions);
            weiAmountWithoutFee = proxyContractInfo.fromWithoutFee.weiAmount;
            proxyFeeInfo = proxyContractInfo.proxyFeeInfo;
        }
        // let gasPriceInfo: GasPriceInfo | undefined;
        // if (fullOptions.gasCalculation !== 'disabled') {
        //     try {
        //         gasPriceInfo = await this.getGasPriceInfo();
        //     } catch {}
        // }
        const output = await this.getRoute(fromPoolId, toPoolId, weiAmountWithoutFee.toFixed());
        if (!output) {
            throw new errors_1.RubicSdkError('Can not estimate the route');
        }
        const { from, to, fromWithoutFee } = (0, get_from_to_tokens_amounts_by_exact_1.getFromToTokensAmountsByExact)(fromToken, toToken, 'input', fromToken.weiAmount, weiAmountWithoutFee, output);
        const tradeStruct = {
            from,
            to,
            fromPoolId,
            toPoolId,
            gasFeeInfo: null,
            slippageTolerance: fullOptions.slippageTolerance,
            deadlineMinutes: fullOptions.deadlineMinutes,
            useProxy: fullOptions.useProxy,
            proxyFeeInfo,
            fromWithoutFee,
            withDeflation: fullOptions.withDeflation,
            usedForCrossChain: fullOptions.usedForCrossChain,
            path: [from, to]
        };
        return this.createTradeInstance(tradeStruct, fullOptions.providerAddress);
        // if (fullOptions.gasCalculation === 'disabled') {
        //     return new VooiTrade(tradeStruct, fullOptions.providerAddress);
        // }
        // const gasFeeInfo = getGasFeeInfo(estimatedGas, gasPriceInfo!);
        // return new VooiTrade({ ...tradeStruct, gasFeeInfo }, fullOptions.providerAddress);
    }
    async getRoute(fromId, toId, fromAmount) {
        const web3 = injector_1.Injector.web3PublicService.getWeb3Public(this.blockchain);
        const result = await web3.callContractMethod(this.omniPoolAddress, omni_pool_abi_1.omniPoolAbi, 'quoteFrom', [fromId, toId, fromAmount]);
        return new bignumber_js_1.default(result.actualToAmount);
    }
}
exports.VooiAbstractProvider = VooiAbstractProvider;
//# sourceMappingURL=vooi-abstract-provider.js.map