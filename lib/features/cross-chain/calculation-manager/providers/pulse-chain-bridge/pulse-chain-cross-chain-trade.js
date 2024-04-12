"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PulseChainCrossChainTrade = void 0;
const blockchain_name_1 = require("../../../../../core/blockchain/models/blockchain-name");
const evm_web3_pure_1 = require("../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const web3_pure_1 = require("../../../../../core/blockchain/web3-pure/web3-pure");
const injector_1 = require("../../../../../core/injector/injector");
const cross_chain_trade_type_1 = require("../../models/cross-chain-trade-type");
const rubic_proxy_contract_address_1 = require("../common/constants/rubic-proxy-contract-address");
const evm_common_cross_chain_abi_1 = require("../common/emv-cross-chain-trade/constants/evm-common-cross-chain-abi");
const gateway_rubic_cross_chain_abi_1 = require("../common/emv-cross-chain-trade/constants/gateway-rubic-cross-chain-abi");
const evm_cross_chain_trade_1 = require("../common/emv-cross-chain-trade/evm-cross-chain-trade");
const bridge_type_1 = require("../common/models/bridge-type");
const proxy_cross_chain_evm_trade_1 = require("../common/proxy-cross-chain-evm-facade/proxy-cross-chain-evm-trade");
const bridge_manager_1 = require("./omni-bridge-entities/bridge-manager");
const omni_bridge_1 = require("./omni-bridge-entities/omni-bridge");
const convert_gas_price_1 = require("../../utils/convert-gas-price");
class PulseChainCrossChainTrade extends evm_cross_chain_trade_1.EvmCrossChainTrade {
    /** @internal */
    static async getGasData(from, toToken, onChainTrade, feeInfo, toTokenAmountMin, providerAddress, receiverAddress, routerAddress, tokenRegistered) {
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
                const { contractAddress, contractAbi, methodName, methodArguments, value } = await new PulseChainCrossChainTrade({
                    from,
                    to: toToken,
                    gasData: null,
                    priceImpact: 0,
                    slippage: 0,
                    feeInfo: feeInfo,
                    toTokenAmountMin,
                    onChainTrade: onChainTrade,
                    routerAddress,
                    tokenRegistered
                }, providerAddress || evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS, []).getContractParams({});
                const [proxyGasLimit, proxyGasDetails] = await Promise.all([
                    web3Public.getEstimatedGas(contractAbi, contractAddress, methodName, methodArguments, walletAddress, value),
                    (0, convert_gas_price_1.convertGasDataToBN)(await injector_1.Injector.gasPriceApi.getGasPrice(from.blockchain))
                ]);
                gasLimit = proxyGasLimit;
                gasDetails = proxyGasDetails;
            }
            else {
                const { data, to, value } = new PulseChainCrossChainTrade({
                    from,
                    to: toToken,
                    gasData: null,
                    priceImpact: 0,
                    slippage: 0,
                    feeInfo: feeInfo,
                    toTokenAmountMin,
                    onChainTrade: onChainTrade,
                    routerAddress,
                    tokenRegistered
                }, providerAddress || evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS, []).getTransactionRequest(receiverAddress, onChainTrade ? onChainTrade.to : from, toToken);
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
            : this.routerAddress;
    }
    get methodName() {
        if (this.isErc677 && this.from.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM) {
            return this.onChainTrade
                ? 'swapAndStartBridgeTokensViaTransferAndCall'
                : 'startBridgeTokensViaTransferAndCall';
        }
        return this.onChainTrade
            ? 'swapAndStartBridgeTokensViaGenericCrossChain'
            : 'startBridgeTokensViaGenericCrossChain';
    }
    get isErc677() {
        return !this.isTokenRegistered || omni_bridge_1.OmniBridge.isCustomWrap(this.from);
    }
    constructor(crossChainTrade, providerAddress, routePath) {
        super(providerAddress, routePath);
        this.type = cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.PULSE_CHAIN_BRIDGE;
        this.isAggregator = false;
        this.bridgeType = bridge_type_1.BRIDGE_TYPE.PULSE_CHAIN_BRIDGE;
        this.from = crossChainTrade.from;
        this.to = crossChainTrade.to;
        this.gasData = crossChainTrade.gasData;
        this.slippage = crossChainTrade.slippage;
        this.toTokenAmountMin = web3_pure_1.Web3Pure.fromWei(crossChainTrade.toTokenAmountMin, crossChainTrade.to.decimals);
        this.feeInfo = crossChainTrade.feeInfo;
        this.priceImpact = crossChainTrade.priceImpact;
        this.routerAddress = crossChainTrade.routerAddress;
        this.onChainSubtype = crossChainTrade.onChainTrade
            ? { from: crossChainTrade.onChainTrade.type, to: undefined }
            : { from: undefined, to: undefined };
        this.onChainTrade = crossChainTrade.onChainTrade;
        this.isTokenRegistered = crossChainTrade.tokenRegistered;
    }
    async needApprove() {
        this.checkWalletConnected();
        if (this.from.isNative || (this.isErc677 && !this.isProxyTrade)) {
            return false;
        }
        const allowance = await this.fromWeb3Public.getAllowance(this.from.address, this.walletAddress, this.fromContractAddress);
        return this.from.weiAmount.gt(allowance);
    }
    async swapDirect(options = {}) {
        await this.checkTradeErrors();
        if (!this.isProxyTrade || this.isTokenRegistered) {
            await this.checkAllowanceAndApprove(options);
        }
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
            const { data, to, value } = this.getTransactionRequest(options.receiverAddress || this.walletAddress, this.from, this.to);
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
    async getContractParams(options) {
        const receiverAddress = options?.receiverAddress || this.walletAddress;
        const { data, to, value: providerValue } = this.getTransactionRequest(receiverAddress, this.onChainTrade ? this.onChainTrade.to : this.from, this.to);
        const bridgeData = proxy_cross_chain_evm_trade_1.ProxyCrossChainEvmTrade.getBridgeData(options, {
            walletAddress: this.walletAddress,
            fromTokenAmount: this.from,
            toTokenAmount: this.to,
            srcChainTrade: this.onChainTrade,
            providerAddress: this.providerAddress,
            type: `native:${this.type}`,
            fromAddress: this.walletAddress
        });
        const swapData = this.onChainTrade &&
            (await proxy_cross_chain_evm_trade_1.ProxyCrossChainEvmTrade.getSwapData(options, {
                walletAddress: this.walletAddress,
                contractAddress: rubic_proxy_contract_address_1.rubicProxyContractAddress[this.from.blockchain].router,
                fromTokenAmount: this.from,
                toTokenAmount: this.onChainTrade.to,
                onChainEncodeFn: this.onChainTrade.encode.bind(this.onChainTrade)
            }));
        const providerData = this.isErc677
            ? this.getProviderDataForErc677(this.from, this.to, receiverAddress)
            : await proxy_cross_chain_evm_trade_1.ProxyCrossChainEvmTrade.getGenericProviderData(to, data, this.fromBlockchain, to, '0');
        const methodArguments = swapData
            ? [bridgeData, swapData, providerData]
            : [bridgeData, providerData];
        const value = this.getSwapValue(providerValue);
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
        return fromUsd.dividedBy(this.to.tokenAmount);
    }
    getTradeInfo() {
        return {
            estimatedGas: this.estimatedGas,
            feeInfo: this.feeInfo,
            priceImpact: this.priceImpact ?? null,
            slippage: this.slippage * 100,
            routePath: this.routePath
        };
    }
    getTransactionRequest(receiverAddress, fromToken, toToken) {
        const sourceBridgeManager = bridge_manager_1.BridgeManager.createBridge(fromToken, toToken);
        const tokenAddress = this.getTokenAddress(fromToken);
        if (fromToken.isNative) {
            return sourceBridgeManager.getDataForNativeSwap(receiverAddress, fromToken.stringWeiAmount);
        }
        return sourceBridgeManager.getDataForTokenSwap(receiverAddress, fromToken.stringWeiAmount, this.isErc677, tokenAddress);
    }
    getTokenAddress(token) {
        if (token.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM) {
            return token.isNative ? '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' : token.address;
        }
        return token.isNative ? '0xA1077a294dDE1B09bB078844df40758a5D0f9a27' : token.address;
    }
    getProviderDataForErc677(fromToken, toToken, receiverAddress) {
        const sourceBridgeManager = bridge_manager_1.BridgeManager.createBridge(fromToken, toToken);
        return [sourceBridgeManager.sourceBridgeAddress, receiverAddress];
    }
}
exports.PulseChainCrossChainTrade = PulseChainCrossChainTrade;
//# sourceMappingURL=pulse-chain-cross-chain-trade.js.map