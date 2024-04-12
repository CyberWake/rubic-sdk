"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangenowCrossChainTrade = void 0;
const errors_1 = require("../../../../../common/errors");
const options_1 = require("../../../../../common/utils/options");
const blockchains_info_1 = require("../../../../../core/blockchain/utils/blockchains-info/blockchains-info");
const erc_20_token_abi_1 = require("../../../../../core/blockchain/web3-public-service/web3-public/evm-web3-public/constants/erc-20-token-abi");
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
const convert_gas_price_1 = require("../../utils/convert-gas-price");
const changenow_cross_chain_api_service_1 = require("./services/changenow-cross-chain-api-service");
class ChangenowCrossChainTrade extends evm_cross_chain_trade_1.EvmCrossChainTrade {
    /** @internal */
    static async getGasData(changenowTrade, providerAddress, receiverAddress) {
        const fromBlockchain = changenowTrade.from.blockchain;
        const walletAddress = blockchains_info_1.BlockchainsInfo.isEvmBlockchainName(fromBlockchain) &&
            injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(fromBlockchain).address;
        if (!walletAddress) {
            return null;
        }
        try {
            const { contractAddress, contractAbi, methodName, methodArguments, value } = await new ChangenowCrossChainTrade(changenowTrade, providerAddress || evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS, []).getContractParams({ receiverAddress: receiverAddress || walletAddress }, true);
            const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(fromBlockchain);
            const [gasLimit, gasDetails] = await Promise.all([
                web3Public.getEstimatedGas(contractAbi, contractAddress, methodName, methodArguments, walletAddress, value),
                (0, convert_gas_price_1.convertGasDataToBN)(await injector_1.Injector.gasPriceApi.getGasPrice(fromBlockchain))
            ]);
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
    get methodName() {
        return this.onChainTrade
            ? 'swapAndStartBridgeTokensViaTransfer'
            : 'startBridgeTokensViaTransfer';
    }
    get transitToken() {
        return this.onChainTrade ? this.onChainTrade.toTokenAmountMin : this.from;
    }
    get fromContractAddress() {
        if (this.isProxyTrade) {
            return rubic_proxy_contract_address_1.rubicProxyContractAddress[this.from.blockchain].gateway;
        }
        throw new errors_1.RubicSdkError('No contract address for changenow provider');
    }
    get web3Private() {
        if (!blockchains_info_1.BlockchainsInfo.isEvmBlockchainName(this.from.blockchain)) {
            throw new errors_1.RubicSdkError('Cannot retrieve web3 private');
        }
        return injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(this.from.blockchain);
    }
    get estimatedGas() {
        if (!this.gasData) {
            return null;
        }
        if (this.gasData.baseFee && this.gasData.maxPriorityFeePerGas) {
            return web3_pure_1.Web3Pure.fromWei(this.gasData.baseFee).plus(web3_pure_1.Web3Pure.fromWei(this.gasData.maxPriorityFeePerGas));
        }
        if (this.gasData.gasPrice) {
            return web3_pure_1.Web3Pure.fromWei(this.gasData.gasPrice).multipliedBy(this.gasData.gasLimit);
        }
        return null;
    }
    constructor(crossChainTrade, providerAddress, routePath) {
        super(providerAddress, routePath);
        this.type = cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.CHANGENOW;
        this.isAggregator = false;
        this.bridgeType = bridge_type_1.BRIDGE_TYPE.CHANGENOW;
        this.from = crossChainTrade.from;
        this.to = crossChainTrade.to;
        this.toTokenAmountMin = crossChainTrade.toTokenAmountMin;
        this.fromCurrency = crossChainTrade.fromCurrency;
        this.toCurrency = crossChainTrade.toCurrency;
        this.feeInfo = crossChainTrade.feeInfo;
        this.gasData = crossChainTrade.gasData;
        this.priceImpact = this.from.calculatePriceImpactPercent(this.to);
        this.onChainSubtype = crossChainTrade.onChainTrade
            ? { from: crossChainTrade.onChainTrade.type, to: undefined }
            : { from: undefined, to: undefined };
        this.onChainTrade = crossChainTrade.onChainTrade;
    }
    async swapDirect(options = {}) {
        if (!blockchains_info_1.BlockchainsInfo.isEvmBlockchainName(this.from.blockchain)) {
            throw new errors_1.RubicSdkError("For non-evm chains use 'getChangenowPostTrade' method");
        }
        await this.checkTradeErrors();
        await this.checkReceiverAddress(options.receiverAddress, !blockchains_info_1.BlockchainsInfo.isEvmBlockchainName(this.to.blockchain), cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.CHANGENOW);
        const { onConfirm, gasLimit, gasPriceOptions } = options;
        let transactionHash;
        const onTransactionHash = (hash) => {
            if (onConfirm) {
                onConfirm(hash);
            }
            transactionHash = hash;
        };
        try {
            const { payinAddress } = await this.getPaymentInfo(this.transitToken.tokenAmount, options.receiverAddress ? options.receiverAddress : this.walletAddress, false, options.directTransaction);
            if (this.from.isNative) {
                await this.web3Private.trySendTransaction(payinAddress, {
                    value: this.from.weiAmount,
                    onTransactionHash,
                    gasPriceOptions
                });
            }
            else {
                await this.web3Private.tryExecuteContractMethod(this.from.address, erc_20_token_abi_1.ERC20_TOKEN_ABI, 'transfer', [payinAddress, this.from.stringWeiAmount], {
                    onTransactionHash,
                    gas: gasLimit,
                    gasPriceOptions
                });
            }
            return transactionHash;
        }
        catch (err) {
            if (err instanceof errors_1.FailedToCheckForTransactionReceiptError) {
                return transactionHash;
            }
            throw err;
        }
    }
    async getChangenowPostTrade(receiverAddress) {
        const paymentInfo = await this.getPaymentInfo(this.from.tokenAmount, receiverAddress);
        const extraField = paymentInfo.payinExtraIdName
            ? {
                name: paymentInfo.payinExtraIdName,
                value: paymentInfo.payinExtraId
            }
            : null;
        return {
            id: paymentInfo.id,
            depositAddress: paymentInfo.payinAddress,
            ...(extraField && { extraField })
        };
    }
    async getPaymentInfo(fromAmount, receiverAddress, skipAmountChangeCheck = false, directTransaction) {
        if (directTransaction && this.payinAddress && this.id) {
            return { id: this.id, payinAddress: this.payinAddress };
        }
        const params = {
            fromCurrency: this.fromCurrency.ticker,
            toCurrency: this.toCurrency.ticker,
            fromNetwork: this.fromCurrency.network,
            toNetwork: this.toCurrency.network,
            fromAmount: fromAmount.toFixed(),
            address: receiverAddress,
            flow: 'standard'
        };
        const res = await changenow_cross_chain_api_service_1.ChangeNowCrossChainApiService.getSwapTx(params);
        const toAmountWei = web3_pure_1.Web3Pure.toWei(res.toAmount, this.to.decimals);
        this.payinAddress = res.payinAddress;
        this.id = res.id;
        if (!skipAmountChangeCheck) {
            // Mock EvmConfig cause CN doesn't provide tx-data
            this.checkAmountChange({ data: '', to: '', value: '' }, toAmountWei, this.to.stringWeiAmount);
        }
        return res;
    }
    async getContractParams(options, skipAmountChangeCheck) {
        const paymentInfo = await this.getPaymentInfo(this.transitToken.tokenAmount, options?.receiverAddress || this.walletAddress, skipAmountChangeCheck, options.directTransaction);
        const toToken = this.to.clone({ address: evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS });
        const bridgeData = proxy_cross_chain_evm_trade_1.ProxyCrossChainEvmTrade.getBridgeData({
            ...options,
            receiverAddress: this.walletAddress
        }, {
            walletAddress: this.walletAddress,
            fromTokenAmount: this.from,
            toTokenAmount: toToken,
            srcChainTrade: this.onChainTrade,
            providerAddress: this.providerAddress,
            type: `native:${this.bridgeType}`,
            fromAddress: this.walletAddress
        });
        const providerData = [paymentInfo.payinAddress];
        const swapData = this.onChainTrade &&
            (await proxy_cross_chain_evm_trade_1.ProxyCrossChainEvmTrade.getSwapData(options, {
                walletAddress: this.walletAddress,
                contractAddress: rubic_proxy_contract_address_1.rubicProxyContractAddress[this.from.blockchain].router,
                fromTokenAmount: this.from,
                toTokenAmount: this.onChainTrade.to,
                onChainEncodeFn: this.onChainTrade.encode.bind(this.onChainTrade)
            }));
        const methodArguments = swapData
            ? [bridgeData, swapData, providerData]
            : [bridgeData, providerData];
        const value = this.getSwapValue();
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
            slippage: this.onChainTrade?.slippageTolerance
                ? this.onChainTrade.slippageTolerance * 100
                : 0,
            routePath: this.routePath
        };
    }
    async encode(options) {
        if (!blockchains_info_1.BlockchainsInfo.isEvmBlockchainName(this.from.blockchain)) {
            throw new errors_1.RubicSdkError('Cannot encode trade for non-evm blockchain');
        }
        await this.checkFromAddress(options.fromAddress, true, cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.CHANGENOW);
        await this.checkReceiverAddress(options.receiverAddress, !blockchains_info_1.BlockchainsInfo.isEvmBlockchainName(this.to.blockchain), cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.CHANGENOW);
        const { gasLimit } = options;
        const { contractAddress, contractAbi, methodName, methodArguments, value } = await this.getContractParams({
            fromAddress: options.fromAddress,
            receiverAddress: options.receiverAddress || options.fromAddress
        }, true);
        return evm_web3_pure_1.EvmWeb3Pure.encodeMethodCall(contractAddress, contractAbi, methodName, methodArguments, value, {
            gas: gasLimit || this.gasData?.gasLimit.toFixed(0),
            ...(0, options_1.getGasOptions)(options)
        });
    }
    encodeApprove() {
        throw new errors_1.RubicSdkError('Cannot encode approve for changenow');
    }
    async needApprove() {
        if (this.isProxyTrade) {
            return super.needApprove();
        }
        return false;
    }
}
exports.ChangenowCrossChainTrade = ChangenowCrossChainTrade;
//# sourceMappingURL=changenow-cross-chain-trade.js.map