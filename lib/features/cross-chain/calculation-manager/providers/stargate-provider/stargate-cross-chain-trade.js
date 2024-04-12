"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StargateCrossChainTrade = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const native_tokens_1 = require("../../../../../common/tokens/constants/native-tokens");
const blockchain_name_1 = require("../../../../../core/blockchain/models/blockchain-name");
const chain_type_1 = require("../../../../../core/blockchain/models/chain-type");
const evm_web3_pure_1 = require("../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const web3_pure_1 = require("../../../../../core/blockchain/web3-pure/web3-pure");
const injector_1 = require("../../../../../core/injector/injector");
const check_unsupported_receiver_address_1 = require("../../../../common/utils/check-unsupported-receiver-address");
const cross_chain_trade_type_1 = require("../../models/cross-chain-trade-type");
const rubic_proxy_contract_address_1 = require("../common/constants/rubic-proxy-contract-address");
const gateway_rubic_cross_chain_abi_1 = require("../common/emv-cross-chain-trade/constants/gateway-rubic-cross-chain-abi");
const evm_cross_chain_trade_1 = require("../common/emv-cross-chain-trade/evm-cross-chain-trade");
const bridge_type_1 = require("../common/models/bridge-type");
const proxy_cross_chain_evm_trade_1 = require("../common/proxy-cross-chain-evm-facade/proxy-cross-chain-evm-trade");
const relayers_addresses_1 = require("./constants/relayers-addresses");
const stargate_bridge_token_1 = require("./constants/stargate-bridge-token");
const stargate_pool_id_1 = require("./constants/stargate-pool-id");
const stargate_pools_decimals_1 = require("./constants/stargate-pools-decimals");
const stargate_cross_chain_provider_1 = require("./stargate-cross-chain-provider");
const convert_gas_price_1 = require("../../utils/convert-gas-price");
const evm_common_cross_chain_abi_1 = require("../common/emv-cross-chain-trade/constants/evm-common-cross-chain-abi");
const stargate_chain_id_1 = require("./constants/stargate-chain-id");
const stargate_contract_address_1 = require("./constants/stargate-contract-address");
const stargate_router_abi_1 = require("./constants/stargate-router-abi");
const stargate_router_eth_abi_1 = require("./constants/stargate-router-eth-abi");
class StargateCrossChainTrade extends evm_cross_chain_trade_1.EvmCrossChainTrade {
    get methodName() {
        return this.onChainTrade
            ? 'swapAndStartBridgeTokensViaStargate'
            : 'startBridgeTokensViaStargate';
    }
    /**  @internal */
    static async getGasData(from, toToken, feeInfo, srcChainTrade, dstChainTrade, slippageTolerance, providerAddress, receiverAddress) {
        const fromBlockchain = from.blockchain;
        const walletAddress = injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(fromBlockchain).address;
        if (!walletAddress) {
            return null;
        }
        try {
            let gasLimit;
            let gasDetails;
            const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(fromBlockchain);
            if (feeInfo.rubicProxy?.fixedFee?.amount.gt(0)) {
                const { contractAddress, contractAbi, methodName, methodArguments, value } = await new StargateCrossChainTrade({
                    from,
                    to: toToken,
                    slippageTolerance,
                    priceImpact: null,
                    gasData: {
                        gasLimit: new bignumber_js_1.default(0),
                        gasPrice: new bignumber_js_1.default(0)
                    },
                    feeInfo,
                    srcChainTrade,
                    dstChainTrade,
                    cryptoFeeToken: null
                }, providerAddress || evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS, []).getContractParams({});
                const [proxyGasLimit, proxyGasDetails] = await Promise.all([
                    web3Public.getEstimatedGas(contractAbi, contractAddress, methodName, methodArguments, walletAddress, value),
                    (0, convert_gas_price_1.convertGasDataToBN)(await injector_1.Injector.gasPriceApi.getGasPrice(fromBlockchain))
                ]);
                gasLimit = proxyGasLimit;
                gasDetails = proxyGasDetails;
            }
            else {
                const toTokenAmountMin = toToken.tokenAmount.multipliedBy(1 - (srcChainTrade ? slippageTolerance / 2 : slippageTolerance));
                const { data, to } = await StargateCrossChainTrade.getLayerZeroSwapData(from, toToken, web3_pure_1.Web3Pure.toWei(toTokenAmountMin, toToken.decimals), receiverAddress);
                const lzFeeWei = web3_pure_1.Web3Pure.toWei(feeInfo.provider.cryptoFee.amount, native_tokens_1.nativeTokensList[from.blockchain].decimals);
                const value = from.isNative ? from.weiAmount.plus(lzFeeWei).toFixed() : lzFeeWei;
                const defaultGasLimit = await web3Public.getEstimatedGasByData(walletAddress, to, {
                    data,
                    value
                });
                const defaultGasDetails = (0, convert_gas_price_1.convertGasDataToBN)(await injector_1.Injector.gasPriceApi.getGasPrice(from.blockchain));
                gasLimit = defaultGasLimit;
                gasDetails = defaultGasDetails;
            }
            if (!gasLimit?.isFinite()) {
                return null;
            }
            const increasedGasLimit = web3_pure_1.Web3Pure.calculateGasMargin(gasLimit, 1.2);
            return {
                gasLimit: increasedGasLimit,
                ...gasDetails
            };
        }
        catch (_err) {
            return null;
        }
    }
    get fromBlockchain() {
        return this.from.blockchain;
    }
    get fromContractAddress() {
        return this.isProxyTrade
            ? rubic_proxy_contract_address_1.rubicProxyContractAddress[this.fromBlockchain].gateway
            : stargate_contract_address_1.stargateContractAddress[this.fromBlockchain];
    }
    constructor(crossChainTrade, providerAddress, routePath) {
        super(providerAddress, routePath);
        this.type = cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.STARGATE;
        this.isAggregator = false;
        this.bridgeType = bridge_type_1.BRIDGE_TYPE.STARGATE;
        this.from = crossChainTrade.from;
        this.to = crossChainTrade.to;
        this.slippageTolerance = crossChainTrade.slippageTolerance;
        this.priceImpact = crossChainTrade.priceImpact;
        this.gasData = crossChainTrade.gasData;
        this.feeInfo = crossChainTrade.feeInfo;
        this.onChainTrade = crossChainTrade.srcChainTrade;
        this.dstChainTrade = crossChainTrade.dstChainTrade;
        this.toTokenAmountMin = this.to.tokenAmount.multipliedBy(1 -
            (crossChainTrade.srcChainTrade
                ? this.slippageTolerance / 2
                : this.slippageTolerance));
        this.onChainSubtype = {
            from: this.onChainTrade?.type,
            to: this.dstChainTrade?.type
        };
        this.cryptoFeeToken = crossChainTrade.cryptoFeeToken;
    }
    async swapDirect(options = {}) {
        this.checkWalletConnected();
        (0, check_unsupported_receiver_address_1.checkUnsupportedReceiverAddress)(options?.receiverAddress, this.walletAddress);
        await this.checkTradeErrors();
        await this.checkAllowanceAndApprove(options);
        const { onConfirm, gasLimit, gasPriceOptions } = options;
        let transactionHash;
        const onTransactionHash = (hash) => {
            if (onConfirm) {
                onConfirm(hash);
            }
            transactionHash = hash;
        };
        // eslint-disable-next-line no-useless-catch
        try {
            const { data, to } = await StargateCrossChainTrade.getLayerZeroSwapData(this.from, this.to, web3_pure_1.Web3Pure.toWei(this.toTokenAmountMin, this.to.decimals), options?.receiverAddress);
            const lzFeeWei = web3_pure_1.Web3Pure.toWei(this.feeInfo.provider.cryptoFee.amount, native_tokens_1.nativeTokensList[this.from.blockchain].decimals);
            const value = this.from.isNative
                ? this.from.weiAmount.plus(lzFeeWei).toFixed()
                : lzFeeWei;
            await this.web3Private.trySendTransaction(to, {
                data,
                value,
                onTransactionHash,
                gas: gasLimit,
                gasPriceOptions
            });
            return transactionHash;
        }
        catch (err) {
            throw err;
        }
    }
    static async getLayerZeroSwapData(from, to, tokenAmountMin = to.stringWeiAmount, receiverAddress, dstData) {
        const walletAddress = injector_1.Injector.web3PrivateService.getWeb3Private(chain_type_1.CHAIN_TYPE.EVM).address ||
            evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS;
        const fromBlockchain = from.blockchain;
        const toBlockchain = to.blockchain;
        const dstRelayer = relayers_addresses_1.relayersAddresses[toBlockchain];
        const destinationAddress = dstData ? dstRelayer : receiverAddress || walletAddress;
        const isEthTrade = from.isNative && to.isNative;
        const stargateRouterAddress = isEthTrade
            ? stargate_contract_address_1.stargateEthContractAddress[fromBlockchain]
            : stargate_contract_address_1.stargateContractAddress[fromBlockchain];
        const dstChainId = stargate_chain_id_1.stargateChainId[toBlockchain];
        const swapToMetisBlockchain = toBlockchain === blockchain_name_1.BLOCKCHAIN_NAME.METIS;
        const swapFromMetisBlockchain = fromBlockchain === blockchain_name_1.BLOCKCHAIN_NAME.METIS;
        const fromSymbol = stargate_cross_chain_provider_1.StargateCrossChainProvider.getSymbol(from.symbol, fromBlockchain, swapToMetisBlockchain);
        const toSymbol = stargate_cross_chain_provider_1.StargateCrossChainProvider.getSymbol(to.symbol, toBlockchain, swapFromMetisBlockchain);
        let srcPoolId = stargate_pool_id_1.stargatePoolId[fromSymbol];
        let dstPoolId = stargate_pool_id_1.stargatePoolId[toSymbol];
        // @TODO FIX STARGATE MULTIPLE POOLS
        if (dstPoolId === stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.mUSD] &&
            srcPoolId === stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.USDT]) {
            srcPoolId = stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.mUSD];
        }
        if (srcPoolId === stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.mUSD] &&
            dstPoolId === stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.USDT]) {
            dstPoolId = stargate_pool_id_1.stargatePoolId[stargate_bridge_token_1.stargateBridgeToken.mUSD];
        }
        const dstConfig = dstData
            ? ['750000', '0', relayers_addresses_1.relayersAddresses[toBlockchain]]
            : ['0', '0', walletAddress];
        const methodArguments = isEthTrade
            ? [dstChainId, walletAddress, walletAddress, from.stringWeiAmount, tokenAmountMin]
            : [
                dstChainId,
                srcPoolId,
                dstPoolId,
                walletAddress,
                from.stringWeiAmount,
                tokenAmountMin,
                dstConfig,
                destinationAddress,
                dstData || '0x'
            ];
        const methodName = isEthTrade ? 'swapETH' : 'swap';
        const abi = isEthTrade ? stargate_router_eth_abi_1.stargateRouterEthAbi : stargate_router_abi_1.stargateRouterAbi;
        return evm_web3_pure_1.EvmWeb3Pure.encodeMethodCall(stargateRouterAddress, abi, methodName, methodArguments);
    }
    async getContractParams(options) {
        const dstSwapData = this.dstChainTrade
            ? (await this.dstChainTrade.encodeDirect({
                supportFee: false,
                fromAddress: options?.fromAddress || evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS
            })).data
            : undefined;
        const fromToken = (this.onChainTrade ? this.onChainTrade.toTokenAmountMin : this.from);
        const lzTxConfig = await StargateCrossChainTrade.getLayerZeroSwapData(fromToken, this.to, web3_pure_1.Web3Pure.toWei(this.toTokenAmountMin, this.to.decimals), options?.receiverAddress, dstSwapData);
        const bridgeData = proxy_cross_chain_evm_trade_1.ProxyCrossChainEvmTrade.getBridgeData(options, {
            walletAddress: this.walletAddress,
            fromTokenAmount: this.from,
            toTokenAmount: this.to,
            srcChainTrade: this.onChainTrade,
            providerAddress: this.providerAddress,
            type: `native:${this.type}`,
            fromAddress: this.walletAddress,
            dstChainTrade: this.dstChainTrade || undefined
        });
        const swapData = this.onChainTrade &&
            (await proxy_cross_chain_evm_trade_1.ProxyCrossChainEvmTrade.getSwapData(options, {
                walletAddress: this.walletAddress,
                contractAddress: rubic_proxy_contract_address_1.rubicProxyContractAddress[this.from.blockchain].router,
                fromTokenAmount: this.from,
                toTokenAmount: this.onChainTrade.to,
                onChainEncodeFn: this.onChainTrade.encode.bind(this.onChainTrade)
            }));
        let dstSwapConfiguration;
        if (dstSwapData) {
            const txId = bridgeData[0];
            const reveivedToken = '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d';
            dstSwapConfiguration = evm_web3_pure_1.EvmWeb3Pure.encodeParameters(['bytes32', 'bytes', 'address', 'address'], [txId, dstSwapData, reveivedToken, options.receiverAddress || this.walletAddress]);
        }
        const providerData = this.getProviderData(lzTxConfig.data, dstSwapConfiguration, options.receiverAddress);
        const methodArguments = swapData
            ? [bridgeData, swapData, providerData]
            : [bridgeData, providerData];
        const lzWeiFee = web3_pure_1.Web3Pure.toWei(this.feeInfo.provider.cryptoFee.amount, native_tokens_1.nativeTokensList[this.from.blockchain].decimals);
        const totalValue = this.from.isNative
            ? this.from.weiAmount.plus(lzWeiFee).toFixed()
            : lzWeiFee;
        const value = this.getSwapValue(totalValue);
        const transactionConfiguration = evm_web3_pure_1.EvmWeb3Pure.encodeMethodCall(rubic_proxy_contract_address_1.rubicProxyContractAddress[this.from.blockchain].router, evm_common_cross_chain_abi_1.evmCommonCrossChainAbi, this.methodName, methodArguments, value);
        const sendingToken = this.from.isNative ? [] : [this.from.address];
        const sendingAmount = this.from.isNative ? [] : [this.from.stringWeiAmount];
        return {
            contractAddress: rubic_proxy_contract_address_1.rubicProxyContractAddress[this.from.blockchain].gateway,
            contractAbi: gateway_rubic_cross_chain_abi_1.gatewayRubicCrossChainAbi,
            methodName: 'startViaRubic',
            methodArguments: [sendingToken, sendingAmount, transactionConfiguration.data],
            value
        };
    }
    getTradeAmountRatio(fromUsd) {
        const usdCryptoFee = this.cryptoFeeToken?.price.multipliedBy(this.feeInfo.provider?.cryptoFee?.amount || 0);
        if (usdCryptoFee && usdCryptoFee.gt(0)) {
            return fromUsd
                .plus(usdCryptoFee.isNaN() ? 0 : usdCryptoFee)
                .dividedBy(this.to.tokenAmount);
        }
        return fromUsd.dividedBy(this.to.tokenAmount);
    }
    getTradeInfo() {
        return {
            estimatedGas: this.estimatedGas,
            feeInfo: this.feeInfo,
            priceImpact: this.priceImpact ?? null,
            slippage: this.slippageTolerance * 100,
            routePath: this.routePath
        };
    }
    async checkProviderIsWhitelisted(_providerRouter, _providerGateway) {
        return undefined;
    }
    getProviderData(_sourceData, dstSwapData, receiverAddress) {
        const swapFromMetisBlockchain = this.fromBlockchain === blockchain_name_1.BLOCKCHAIN_NAME.METIS;
        const toSymbol = stargate_cross_chain_provider_1.StargateCrossChainProvider.getSymbol(this.to.symbol, this.to.blockchain, swapFromMetisBlockchain);
        const pool = stargate_pool_id_1.stargatePoolId[toSymbol];
        const targetPoolDecimals = stargate_pools_decimals_1.stargatePoolsDecimals[this.to.symbol] ||
            stargate_pools_decimals_1.stargatePoolsDecimals[toSymbol];
        const amount = web3_pure_1.Web3Pure.toWei(this.toTokenAmountMin, targetPoolDecimals);
        const fee = web3_pure_1.Web3Pure.toWei(this.feeInfo.provider.cryptoFee.amount, native_tokens_1.nativeTokensList[this.from.blockchain].decimals);
        const destinationAddress = receiverAddress || this.walletAddress;
        return [
            pool,
            amount,
            dstSwapData ? '750000' : '0',
            fee,
            this.walletAddress,
            dstSwapData
                ? relayers_addresses_1.relayersAddresses[this.to.blockchain]
                : destinationAddress,
            dstSwapData || '0x'
        ];
    }
}
exports.StargateCrossChainTrade = StargateCrossChainTrade;
//# sourceMappingURL=stargate-cross-chain-trade.js.map