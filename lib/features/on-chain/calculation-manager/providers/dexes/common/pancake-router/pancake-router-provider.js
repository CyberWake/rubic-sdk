"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PancakeRouterProvider = void 0;
const sdk_1 = require("@pancakeswap/sdk");
const evm_1 = require("@pancakeswap/smart-router/evm");
const swap_sdk_core_1 = require("@pancakeswap/swap-sdk-core");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const graphql_request_1 = require("graphql-request");
const errors_1 = require("../../../../../../../common/errors");
const tokens_1 = require("../../../../../../../common/tokens");
const options_1 = require("../../../../../../../common/utils/options");
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const blockchain_id_1 = require("../../../../../../../core/blockchain/utils/blockchains-info/constants/blockchain-id");
const evm_web3_pure_1 = require("../../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const injector_1 = require("../../../../../../../core/injector/injector");
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const get_gas_fee_info_1 = require("../../../common/utils/get-gas-fee-info");
const evm_provider_default_options_1 = require("../on-chain-provider/evm-on-chain-provider/constants/evm-provider-default-options");
const evm_on_chain_provider_1 = require("../on-chain-provider/evm-on-chain-provider/evm-on-chain-provider");
const pancake_router_trade_1 = require("./pancake-router-trade");
const viem_1 = require("viem");
class PancakeRouterProvider extends evm_on_chain_provider_1.EvmOnChainProvider {
    constructor() {
        super(...arguments);
        this.defaultOptions = {
            ...evm_provider_default_options_1.evmProviderDefaultOptions,
            deadlineMinutes: 20,
            disableMultihops: false
        };
    }
    get type() {
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.PANCAKE_SWAP;
    }
    async calculate(from, to, options) {
        const fullOptions = (0, options_1.combineOptions)(options, this.defaultOptions);
        let proxyFeeInfo;
        let weiAmountWithoutFee = from.stringWeiAmount;
        if (fullOptions.useProxy) {
            const proxyContractInfo = await this.handleProxyContract(new tokens_1.PriceTokenAmount({
                ...from.asStruct,
                weiAmount: from.weiAmount
            }), fullOptions);
            proxyFeeInfo = proxyContractInfo.proxyFeeInfo;
            weiAmountWithoutFee = proxyContractInfo.fromWithoutFee.stringWeiAmount;
        }
        const fromChainId = blockchain_id_1.blockchainId[from.blockchain];
        const currencyA = from.isNative
            ? sdk_1.Native.onChain(fromChainId)
            : new sdk_1.Token(fromChainId, from.address, from.decimals, from.symbol, from.name);
        const toChainId = blockchain_id_1.blockchainId[to.blockchain];
        const currencyB = to.isNative
            ? sdk_1.Native.onChain(toChainId)
            : new sdk_1.Token(toChainId, to.address, to.decimals, to.symbol, to.name);
        const fromCurrency = swap_sdk_core_1.CurrencyAmount.fromRawAmount(currencyA, weiAmountWithoutFee);
        const quoteProvider = evm_1.SmartRouter.createQuoteProvider({
            // @ts-ignore
            onChainProvider: () => this.createPublicClient()
        });
        const pools = await this.getPools(currencyA, currencyB);
        const trade = await evm_1.SmartRouter.getBestTrade(fromCurrency, currencyB, sdk_1.TradeType.EXACT_INPUT, {
            gasPriceWei: () => this.createPublicClient().getGasPrice(),
            maxHops: this.maxHops,
            maxSplits: this.maxSplits,
            poolProvider: evm_1.SmartRouter.createStaticPoolProvider(pools),
            quoteProvider,
            quoterOptimization: true
        });
        if (!trade) {
            throw new errors_1.RubicSdkError('');
        }
        const toAmount = trade.outputAmount.toFixed();
        const toToken = new tokens_1.PriceTokenAmount({
            ...to.asStruct,
            tokenAmount: new bignumber_js_1.default(toAmount)
        });
        const path = await this.getPath(from, to, trade.routes?.[0]?.path || []);
        const tradeStruct = {
            from,
            to: toToken,
            path,
            slippageTolerance: fullOptions.slippageTolerance,
            gasFeeInfo: null,
            useProxy: fullOptions.useProxy,
            proxyFeeInfo,
            fromWithoutFee: from,
            withDeflation: fullOptions.withDeflation,
            usedForCrossChain: fullOptions.usedForCrossChain,
            trade,
            dexContractAddress: this.dexAddress
        };
        if (options?.gasCalculation === 'calculate') {
            try {
                const gasPriceInfo = await this.getGasPriceInfo();
                const gasLimit = await pancake_router_trade_1.PancakeRouterTrade.getGasLimit(tradeStruct, fullOptions.providerAddress);
                tradeStruct.gasFeeInfo = (0, get_gas_fee_info_1.getGasFeeInfo)(gasLimit, gasPriceInfo);
            }
            catch { }
        }
        return new pancake_router_trade_1.PancakeRouterTrade(tradeStruct, fullOptions.providerAddress);
    }
    async getPools(currencyA, currencyB) {
        const v3SubgraphClient = new graphql_request_1.GraphQLClient(this.v3subgraphAddress);
        const v2SubgraphClient = new graphql_request_1.GraphQLClient(this.v2subgraphAddress);
        const pairs = evm_1.SmartRouter.getPairCombinations(currencyA, currencyB);
        const allPools = await Promise.allSettled([
            // // @ts-ignore
            evm_1.SmartRouter.getStablePoolsOnChain(pairs, () => this.createPublicClient()),
            evm_1.SmartRouter.getV2CandidatePools({
                // @ts-ignore
                onChainProvider: () => this.createPublicClient(),
                // @ts-ignore
                v2SubgraphProvider: () => v2SubgraphClient,
                // @ts-ignore
                v3SubgraphProvider: () => v3SubgraphClient,
                currencyA,
                currencyB
            }),
            evm_1.SmartRouter.getV3CandidatePools({
                // @ts-ignore
                onChainProvider: () => this.createPublicClient(),
                // @ts-ignore
                subgraphProvider: () => v3SubgraphClient,
                currencyA,
                currencyB,
                subgraphCacheFallback: false
            })
        ]);
        const fulfilledPools = allPools.reduce((acc, pool) => {
            if (pool.status === 'fulfilled') {
                return [...acc, ...pool.value];
            }
            return acc;
        }, []);
        return fulfilledPools.flat();
    }
    createPublicClient() {
        const transportUrl = injector_1.Injector.web3PublicService.rpcProvider[this.blockchain]?.rpcList[0];
        if (this.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.POLYGON_ZKEVM) {
            return (0, viem_1.createPublicClient)({
                chain: {
                    ...this.chain,
                    contracts: {
                        multicall3: {
                            address: '0xcA11bde05977b3631167028862bE2a173976CA11',
                            blockCreated: 57746
                        }
                    }
                },
                transport: (0, viem_1.http)(transportUrl),
                batch: {
                    multicall: {
                        batchSize: 512
                    }
                }
            });
        }
        return (0, viem_1.createPublicClient)({
            chain: this.chain,
            transport: (0, viem_1.http)(transportUrl),
            batch: {
                multicall: {
                    batchSize: 1024 * 200
                }
            }
        });
    }
    async getPath(fromToken, toToken, route) {
        const path = [fromToken];
        if (route.length > 2) {
            const addresses = route
                .slice(1, -1)
                .map(token => ('address' in token && token.address) || evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS);
            const tokens = await tokens_1.Token.createTokens(addresses, fromToken.blockchain);
            path.push(...tokens);
        }
        path.push(toToken);
        return path;
    }
}
exports.PancakeRouterProvider = PancakeRouterProvider;
//# sourceMappingURL=pancake-router-provider.js.map