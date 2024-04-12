"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StargateCrossChainProvider = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../common/errors");
const tokens_1 = require("../../../../../common/tokens");
const native_tokens_1 = require("../../../../../common/tokens/constants/native-tokens");
const blockchain_1 = require("../../../../../common/utils/blockchain");
const errors_2 = require("../../../../../common/utils/errors");
const blockchain_name_1 = require("../../../../../core/blockchain/models/blockchain-name");
const chain_type_1 = require("../../../../../core/blockchain/models/chain-type");
const evm_web3_pure_1 = require("../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const web3_pure_1 = require("../../../../../core/blockchain/web3-pure/web3-pure");
const injector_1 = require("../../../../../core/injector/injector");
const get_from_without_fee_1 = require("../../../../common/utils/get-from-without-fee");
const cross_chain_trade_type_1 = require("../../models/cross-chain-trade-type");
const cross_chain_provider_1 = require("../common/cross-chain-provider");
const proxy_cross_chain_evm_trade_1 = require("../common/proxy-cross-chain-evm-facade/proxy-cross-chain-evm-trade");
const fee_library_abi_1 = require("./constants/fee-library-abi");
const relayers_addresses_1 = require("./constants/relayers-addresses");
const stargate_bridge_token_1 = require("./constants/stargate-bridge-token");
const stargate_factory_abi_1 = require("./constants/stargate-factory-abi");
const stargate_fee_library_contract_address_1 = require("./constants/stargate-fee-library-contract-address");
const stargate_pool_abi_1 = require("./constants/stargate-pool-abi");
const stargate_pool_id_1 = require("./constants/stargate-pool-id");
const stargate_pool_mapping_1 = require("./constants/stargate-pool-mapping");
const stargate_pools_decimals_1 = require("./constants/stargate-pools-decimals");
const stargate_blockchain_supported_pool_1 = require("./constants/stargate-blockchain-supported-pool");
const stargate_chain_id_1 = require("./constants/stargate-chain-id");
const stargate_contract_address_1 = require("./constants/stargate-contract-address");
const stargate_cross_chain_supported_blockchain_1 = require("./constants/stargate-cross-chain-supported-blockchain");
const stargate_router_abi_1 = require("./constants/stargate-router-abi");
const stargate_cross_chain_trade_1 = require("./stargate-cross-chain-trade");
class StargateCrossChainProvider extends cross_chain_provider_1.CrossChainProvider {
    constructor() {
        super(...arguments);
        this.type = cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.STARGATE;
    }
    isSupportedBlockchain(blockchain) {
        return stargate_cross_chain_supported_blockchain_1.stargateCrossChainSupportedBlockchains.some(supportedBlockchain => supportedBlockchain === blockchain);
    }
    static hasDirectRoute(from, to) {
        const fromBlockchain = from.blockchain;
        const toBlockchain = to.blockchain;
        const swapToMetisBlockchain = toBlockchain === blockchain_name_1.BLOCKCHAIN_NAME.METIS;
        const swapFromMetisBlockchain = fromBlockchain === blockchain_name_1.BLOCKCHAIN_NAME.METIS;
        const fromSymbol = StargateCrossChainProvider.getSymbol(from.symbol, fromBlockchain, swapToMetisBlockchain);
        const toSymbol = StargateCrossChainProvider.getSymbol(to.symbol, toBlockchain, swapFromMetisBlockchain);
        const srcPoolId = stargate_pool_id_1.stargatePoolId[fromSymbol];
        const srcSupportedPools = stargate_blockchain_supported_pool_1.stargateBlockchainSupportedPools[fromBlockchain];
        if (!srcPoolId || !srcSupportedPools.includes(srcPoolId)) {
            return false;
        }
        const dstPoolId = stargate_pool_id_1.stargatePoolId[toSymbol];
        if (srcPoolId === dstPoolId && srcPoolId === 13) {
            return true;
        }
        const dstSupportedPools = stargate_blockchain_supported_pool_1.stargateBlockchainSupportedPools[toBlockchain];
        if (!dstSupportedPools.includes(dstPoolId)) {
            throw new errors_1.RubicSdkError('Tokens are not supported.');
        }
        const poolPathExists = stargate_pool_mapping_1.stargatePoolMapping[fromBlockchain]?.[fromSymbol]?.[toBlockchain]?.includes(toSymbol);
        return Boolean(poolPathExists);
    }
    // eslint-disable-next-line complexity
    async calculate(fromToken, toToken, options) {
        const from = new tokens_1.PriceTokenAmount({
            ...fromToken.asStruct,
            tokenAmount: fromToken.tokenAmount,
            address: fromToken.isNative && fromToken.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.METIS
                ? '0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000'
                : fromToken.address
        });
        try {
            const fromBlockchain = from.blockchain;
            const toBlockchain = toToken.blockchain;
            const useProxy = options?.useProxy?.[this.type] ?? true;
            if (this.shouldWeStopCalculatingWithMetisToken(fromToken, toToken)) {
                return {
                    trade: null,
                    error: new errors_1.NotSupportedTokensError(),
                    tradeType: this.type
                };
            }
            if (!this.areSupportedBlockchains(fromBlockchain, toBlockchain)) {
                return {
                    trade: null,
                    error: new errors_1.NotSupportedTokensError(),
                    tradeType: this.type
                };
            }
            const wrongFantomUsdc = '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75';
            if ((0, blockchain_1.compareAddresses)(from.address, wrongFantomUsdc) ||
                (0, blockchain_1.compareAddresses)(toToken.address, wrongFantomUsdc)) {
                throw new errors_1.RubicSdkError('Trade to this tokens is not allowed');
            }
            const hasDirectRoute = StargateCrossChainProvider.hasDirectRoute(from, toToken);
            const feeInfo = await this.getFeeInfo(fromBlockchain, options.providerAddress, from, useProxy);
            const fromWithoutFee = (0, get_from_without_fee_1.getFromWithoutFee)(from, feeInfo.rubicProxy?.platformFee?.percent);
            let transitTokenAmount = fromWithoutFee;
            let srcChainTrade = null;
            let transitAmount = fromWithoutFee.tokenAmount;
            if (!hasDirectRoute || (useProxy && hasDirectRoute && from.isNative)) {
                if (!useProxy) {
                    return {
                        trade: null,
                        error: new errors_1.NotSupportedTokensError(),
                        tradeType: this.type
                    };
                }
                const transitToken = await this.getTransitToken(hasDirectRoute, from, toToken);
                if (fromToken.isNative &&
                    !transitToken.isWrapped &&
                    fromBlockchain !== blockchain_name_1.BLOCKCHAIN_NAME.METIS) {
                    return {
                        trade: null,
                        error: new errors_1.NotSupportedTokensError(),
                        tradeType: this.type
                    };
                }
                const trade = await proxy_cross_chain_evm_trade_1.ProxyCrossChainEvmTrade.getOnChainTrade(fromWithoutFee, transitToken, options.slippageTolerance / 2, true);
                if (!trade) {
                    return {
                        trade: null,
                        error: new errors_1.NotSupportedTokensError(),
                        tradeType: this.type
                    };
                }
                srcChainTrade = trade;
                transitTokenAmount = srcChainTrade.to;
                transitAmount = srcChainTrade.toTokenAmountMin.tokenAmount;
            }
            const poolFee = await this.fetchPoolFees(transitTokenAmount, toToken, transitAmount);
            const amountOutMin = transitAmount.minus(poolFee);
            const to = new tokens_1.PriceTokenAmount({
                ...toToken.asStruct,
                tokenAmount: amountOutMin
            });
            const swapInDestination = false;
            const dstChainTrade = swapInDestination
                ? await this.getDstSwap(to, amountOutMin)
                : null;
            const dstSwapData = swapInDestination
                ? (await dstChainTrade.encodeDirect({
                    supportFee: false,
                    fromAddress: options?.fromAddress || evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS
                })).data
                : undefined;
            const layerZeroFeeWei = await this.getLayerZeroFee(transitTokenAmount, to, dstSwapData);
            const layerZeroFeeAmount = web3_pure_1.Web3Pure.fromWei(layerZeroFeeWei, native_tokens_1.nativeTokensList[fromBlockchain].decimals);
            const nativeToken = await tokens_1.PriceToken.createFromToken(native_tokens_1.nativeTokensList[from.blockchain]);
            feeInfo.provider = {
                cryptoFee: {
                    amount: layerZeroFeeAmount,
                    token: nativeToken
                }
            };
            const gasData = options.gasCalculation === 'enabled'
                ? await stargate_cross_chain_trade_1.StargateCrossChainTrade.getGasData(from, to, feeInfo, srcChainTrade, dstChainTrade, options.slippageTolerance, options.providerAddress, options.receiverAddress)
                : null;
            return {
                trade: new stargate_cross_chain_trade_1.StargateCrossChainTrade({
                    from,
                    to,
                    slippageTolerance: options.slippageTolerance,
                    priceImpact: transitTokenAmount.calculatePriceImpactPercent(to),
                    gasData,
                    feeInfo,
                    srcChainTrade,
                    dstChainTrade,
                    cryptoFeeToken: nativeToken
                }, options.providerAddress, await this.getRoutePath(from, to, srcChainTrade)),
                tradeType: this.type
            };
        }
        catch (error) {
            console.error({ 'CALCULATE ERROR': error });
            return {
                trade: null,
                error: (0, errors_2.parseError)(error),
                tradeType: this.type
            };
        }
    }
    async getLayerZeroFee(from, to, dstSwapData) {
        const fromBlockchain = from.blockchain;
        const toBlockchain = to.blockchain;
        const layerZeroTxData = await stargate_cross_chain_trade_1.StargateCrossChainTrade.getLayerZeroSwapData(from, to, to.stringWeiAmount, undefined, dstSwapData);
        const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(from.blockchain);
        const walletAddress = injector_1.Injector.web3PrivateService.getWeb3Private(chain_type_1.CHAIN_TYPE.EVM).address;
        const dstConfig = dstSwapData
            ? ['750000', '0', relayers_addresses_1.relayersAddresses[toBlockchain]]
            : ['0', '0', walletAddress || evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS];
        const layerZeroFee = await web3Public.callContractMethod(stargate_contract_address_1.stargateContractAddress[fromBlockchain], stargate_router_abi_1.stargateRouterAbi, 'quoteLayerZeroFee', [
            stargate_chain_id_1.stargateChainId[toBlockchain],
            1,
            walletAddress || evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS,
            layerZeroTxData.data,
            dstConfig
        ]);
        return new bignumber_js_1.default(`${layerZeroFee['0']}`);
    }
    async getFeeInfo(fromBlockchain, providerAddress, percentFeeToken, useProxy) {
        return proxy_cross_chain_evm_trade_1.ProxyCrossChainEvmTrade.getFeeInfo(fromBlockchain, providerAddress, percentFeeToken, useProxy);
    }
    async fetchPoolFees(fromToken, toToken, transitAmount) {
        const fromBlockchain = fromToken.blockchain;
        const toBlockchain = toToken.blockchain;
        const swapToMetisBlockchain = toBlockchain === blockchain_name_1.BLOCKCHAIN_NAME.METIS;
        const swapFromMetisBlockchain = fromBlockchain === blockchain_name_1.BLOCKCHAIN_NAME.METIS;
        const fromSymbol = StargateCrossChainProvider.getSymbol(fromToken.symbol, fromBlockchain, swapToMetisBlockchain);
        const toSymbol = StargateCrossChainProvider.getSymbol(toToken.symbol, toBlockchain, swapFromMetisBlockchain);
        let srcPoolId = stargate_pool_id_1.stargatePoolId[fromSymbol];
        let dstPoolId = stargate_pool_id_1.stargatePoolId[toSymbol];
        const dstChainId = stargate_chain_id_1.stargateChainId[toBlockchain];
        const sdDecimals = stargate_pools_decimals_1.stargatePoolsDecimals[fromSymbol];
        const amountSD = web3_pure_1.Web3Pure.toWei(transitAmount, sdDecimals);
        // @TODO FIX STARGATE MULTIPLE POOLS
        if (dstPoolId === stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.mUSD] &&
            srcPoolId === stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.USDT]) {
            srcPoolId = stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.mUSD];
        }
        if (srcPoolId === stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.mUSD] &&
            dstPoolId === stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.USDT]) {
            dstPoolId = stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.mUSD];
        }
        try {
            const { 1: eqFee, 2: eqReward, 4: protocolFee } = await injector_1.Injector.web3PublicService
                .getWeb3Public(fromBlockchain)
                .callContractMethod(stargate_fee_library_contract_address_1.stargateFeeLibraryContractAddress[fromBlockchain], fee_library_abi_1.feeLibraryAbi, 'getFees', [srcPoolId, dstPoolId, dstChainId, evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS, amountSD]);
            return web3_pure_1.Web3Pure.fromWei(new bignumber_js_1.default(eqFee).plus(protocolFee).minus(eqReward), sdDecimals);
        }
        catch (err) {
            if (err instanceof Error) {
                throw new errors_1.RubicSdkError('Tokens are not supported.');
            }
            throw new errors_1.RubicSdkError('Unknown error.');
        }
    }
    async getPoolToken(poolId, fromBlockchain) {
        const web3Adapter = injector_1.Injector.web3PublicService.getWeb3Public(fromBlockchain);
        const factoryAddress = await web3Adapter.callContractMethod(stargate_contract_address_1.stargateContractAddress[fromBlockchain], stargate_router_abi_1.stargateRouterAbi, 'factory', []);
        const poolAddress = await web3Adapter.callContractMethod(factoryAddress, stargate_factory_abi_1.stargateFactoryAbi, 'getPool', [poolId]);
        if ((0, blockchain_1.compareAddresses)(poolAddress, evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS)) {
            throw new errors_1.RubicSdkError('No possible pool');
        }
        const tokenAddress = await web3Adapter.callContractMethod(poolAddress, stargate_pool_abi_1.stargatePoolAbi, 'token', []);
        return tokens_1.PriceToken.createToken({
            address: tokenAddress,
            blockchain: fromBlockchain
        });
    }
    async getTransitToken(hasDirectRoute, fromToken, toToken) {
        if (hasDirectRoute && !fromToken.isNative) {
            return fromToken;
        }
        const toBlockchain = toToken.blockchain;
        const toBlockchainDirection = stargate_pool_mapping_1.stargatePoolMapping[toBlockchain];
        const swapFromMetisBlockchain = fromToken.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.METIS;
        if (!toBlockchainDirection) {
            throw new errors_1.RubicSdkError('Tokens are not supported.');
        }
        const toSymbol = StargateCrossChainProvider.getSymbol(toToken.symbol, toBlockchain, swapFromMetisBlockchain);
        const toSymbolDirection = toBlockchainDirection[toSymbol];
        if (!toSymbolDirection) {
            throw new errors_1.RubicSdkError('Tokens are not supported.');
        }
        const fromBlockchain = fromToken.blockchain;
        const fromBlockchainDirection = toSymbolDirection[fromBlockchain];
        if (!fromBlockchainDirection) {
            throw new errors_1.RubicSdkError('Tokens are not supported.');
        }
        const possibleTransitSymbol = Object.values(stargate_bridge_token_1.stargateBridgeToken).find(symbol => symbol === toSymbol);
        if (!possibleTransitSymbol) {
            throw new errors_1.RubicSdkError('Tokens are not supported.');
        }
        try {
            const poolToken = await this.getPoolToken(stargate_pool_id_1.stargatePoolId[possibleTransitSymbol], fromBlockchain);
            return poolToken;
        }
        catch {
            const poolToken = await this.getPoolToken(stargate_pool_id_1.stargatePoolId[fromBlockchainDirection[0]], fromBlockchain);
            return poolToken;
        }
    }
    async getDstSwap(fromToken, tokenAmount) {
        return proxy_cross_chain_evm_trade_1.ProxyCrossChainEvmTrade.getOnChainTrade(new tokens_1.PriceTokenAmount({
            ...fromToken.asStruct,
            tokenAmount
        }), {
            address: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
            blockchain: blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN
        }, 0.1);
    }
    static getSymbol(symbol, blockchain, swapWithMetisBlockchain) {
        if (blockchain === blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM && symbol === 'AETH') {
            return 'ETH';
        }
        if (swapWithMetisBlockchain &&
            (blockchain === blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE ||
                blockchain === blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM ||
                blockchain === blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN) &&
            symbol.toLowerCase() === 'usdt') {
            return 'm.USDT';
        }
        if (blockchain === blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE && symbol === 'USDt') {
            return 'USDT';
        }
        if (blockchain === blockchain_name_1.BLOCKCHAIN_NAME.FANTOM && symbol === 'USDC') {
            return 'FUSDC';
        }
        if (symbol.toUpperCase() === 'METIS') {
            return symbol.toUpperCase();
        }
        return symbol;
    }
    async getRoutePath(from, to, srcOnChainTrade) {
        if (srcOnChainTrade) {
            return [
                {
                    type: 'on-chain',
                    provider: srcOnChainTrade.type,
                    path: [srcOnChainTrade.from, srcOnChainTrade.to]
                },
                {
                    type: 'cross-chain',
                    provider: cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.STARGATE,
                    path: [srcOnChainTrade.to, to]
                }
            ];
        }
        return [
            {
                type: 'cross-chain',
                provider: cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.STARGATE,
                path: [from, to]
            }
        ];
    }
    // Не считаем трейды из Metis (metis/m.usdt) в Avalanche (metis) и в BNB chain (metis) и обратно
    shouldWeStopCalculatingWithMetisToken(fromToken, toToken) {
        return ((fromToken.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.METIS &&
            fromToken.symbol.toLowerCase() !== 'metis' &&
            toToken.symbol.toLowerCase() === 'metis') ||
            (fromToken.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.METIS &&
                (toToken.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN ||
                    toToken.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE) &&
                toToken.symbol.toLowerCase() === 'metis') ||
            (toToken.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.METIS &&
                (fromToken.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN ||
                    fromToken.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE) &&
                fromToken.symbol.toLowerCase() === 'metis'));
    }
}
exports.StargateCrossChainProvider = StargateCrossChainProvider;
//# sourceMappingURL=stargate-cross-chain-provider.js.map