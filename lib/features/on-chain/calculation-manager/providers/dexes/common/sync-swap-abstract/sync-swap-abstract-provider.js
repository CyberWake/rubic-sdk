"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncSwapAbstractProvider = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../../../common/errors");
const tokens_1 = require("../../../../../../../common/tokens");
const wrapped_native_tokens_1 = require("../../../../../../../common/tokens/constants/wrapped-native-tokens");
const options_1 = require("../../../../../../../common/utils/options");
const evm_web3_pure_1 = require("../../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const token_native_address_proxy_1 = require("../../../../../../common/utils/token-native-address-proxy");
const rubic_proxy_contract_address_1 = require("../../../../../../cross-chain/calculation-manager/providers/common/constants/rubic-proxy-contract-address");
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const get_gas_fee_info_1 = require("../../../common/utils/get-gas-fee-info");
const evm_provider_default_options_1 = require("../on-chain-provider/evm-on-chain-provider/constants/evm-provider-default-options");
const evm_on_chain_provider_1 = require("../on-chain-provider/evm-on-chain-provider/evm-on-chain-provider");
const sync_swap_abstract_trade_1 = require("./sync-swap-abstract-trade");
const sync_swap_factory_1 = require("./utils/sync-swap-factory");
const sync_swap_path_factory_1 = require("./utils/sync-swap-path-factory");
const sync_swap_router_1 = require("./utils/sync-swap-router");
class SyncSwapAbstractProvider extends evm_on_chain_provider_1.EvmOnChainProvider {
    constructor() {
        super(...arguments);
        this.defaultOptions = evm_provider_default_options_1.evmProviderDefaultOptions;
    }
    get type() {
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.SYNC_SWAP;
    }
    async calculate(from, toToken, options) {
        const fromAddress = options?.useProxy || this.defaultOptions.useProxy
            ? rubic_proxy_contract_address_1.rubicProxyContractAddress[from.blockchain].gateway
            : this.walletAddress;
        const fullOptions = (0, options_1.combineOptions)(options, {
            ...this.defaultOptions,
            fromAddress
        });
        const fromProxy = (0, token_native_address_proxy_1.createTokenNativeAddressProxy)(from, wrapped_native_tokens_1.wrappedNativeTokensList[from.blockchain].address);
        const toProxy = (0, token_native_address_proxy_1.createTokenNativeAddressProxy)(toToken, wrapped_native_tokens_1.wrappedNativeTokensList[from.blockchain].address);
        const { fromWithoutFee, proxyFeeInfo } = await this.handleProxyContract(fromProxy, fullOptions);
        const availablePools = await this.getAvailablePools(fromProxy, toProxy);
        if (!availablePools) {
            throw new errors_1.NotSupportedTokensError();
        }
        const paths = sync_swap_path_factory_1.SyncSwapPathFactory.findAllPossiblePaths(fromProxy.address, toProxy.address, availablePools);
        const filteredPaths = await sync_swap_path_factory_1.SyncSwapPathFactory.getBestPath(paths, fromWithoutFee.stringWeiAmount, this.blockchain);
        const sortedPaths = filteredPaths.filter(item => item.length <= this.maxTransitTokens + 1);
        const bestRoute = await sync_swap_router_1.SyncSwapRouter.findBestAmountsForPathsExactIn(sortedPaths, fromWithoutFee.stringWeiAmount, this.blockchain);
        const to = new tokens_1.PriceTokenAmount({
            ...toToken.asStruct,
            weiAmount: new bignumber_js_1.default(bestRoute.amountOut.toString())
        });
        const transitAddresses = bestRoute.pathsWithAmounts[0].stepsWithAmount.slice(1).map(step => step.tokenIn);
        const transitTokens = await tokens_1.Token.createTokens(transitAddresses, from.blockchain);
        const tradeStruct = {
            from,
            to,
            slippageTolerance: fullOptions.slippageTolerance,
            gasFeeInfo: null,
            useProxy: fullOptions.useProxy,
            proxyFeeInfo,
            fromWithoutFee,
            withDeflation: fullOptions.withDeflation,
            usedForCrossChain: fullOptions.usedForCrossChain,
            path: [from, ...transitTokens, toToken],
            bestPathWithAmounts: bestRoute
        };
        try {
            const gasPriceInfo = await this.getGasPriceInfo();
            const gasLimit = await sync_swap_abstract_trade_1.SyncSwapAbstractTrade.getGasLimit(tradeStruct, this.dexContractAddress, fullOptions.providerAddress);
            const gasFeeInfo = (0, get_gas_fee_info_1.getGasFeeInfo)(gasLimit, gasPriceInfo);
            return new sync_swap_abstract_trade_1.SyncSwapAbstractTrade({ ...tradeStruct, gasFeeInfo }, fullOptions.providerAddress, this.dexContractAddress);
        }
        catch {
            return new sync_swap_abstract_trade_1.SyncSwapAbstractTrade(tradeStruct, fullOptions.providerAddress, this.dexContractAddress);
        }
    }
    async getAvailablePools(from, toToken) {
        return sync_swap_factory_1.SyncSwapFactory.fetchRoutePools(from.address, toToken.address, this.walletAddress || evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS, this.vault, this.factories.map(address => address.toLowerCase()), this.routeTokens.map(address => address.toLowerCase()), this.masterAddress, this.routerHelperContract, this.blockchain);
    }
}
exports.SyncSwapAbstractProvider = SyncSwapAbstractProvider;
//# sourceMappingURL=sync-swap-abstract-provider.js.map