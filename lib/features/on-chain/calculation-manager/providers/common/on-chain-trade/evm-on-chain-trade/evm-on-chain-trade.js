"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvmOnChainTrade = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../../../common/errors");
const native_tokens_1 = require("../../../../../../../common/tokens/constants/native-tokens");
const errors_2 = require("../../../../../../../common/utils/errors");
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const evm_web3_pure_1 = require("../../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const web3_pure_1 = require("../../../../../../../core/blockchain/web3-pure/web3-pure");
const injector_1 = require("../../../../../../../core/injector/injector");
const rubic_proxy_contract_address_1 = require("../../../../../../cross-chain/calculation-manager/providers/common/constants/rubic-proxy-contract-address");
const evm_common_cross_chain_abi_1 = require("../../../../../../cross-chain/calculation-manager/providers/common/emv-cross-chain-trade/constants/evm-common-cross-chain-abi");
const gateway_rubic_cross_chain_abi_1 = require("../../../../../../cross-chain/calculation-manager/providers/common/emv-cross-chain-trade/constants/gateway-rubic-cross-chain-abi");
const proxy_cross_chain_evm_trade_1 = require("../../../../../../cross-chain/calculation-manager/providers/common/proxy-cross-chain-evm-facade/proxy-cross-chain-evm-trade");
const on_chain_trade_1 = require("../on-chain-trade");
const web3_utils_1 = require("web3-utils");
class EvmOnChainTrade extends on_chain_trade_1.OnChainTrade {
    get spenderAddress() {
        return this.useProxy || this.usedForCrossChain
            ? rubic_proxy_contract_address_1.rubicProxyContractAddress[this.from.blockchain].gateway
            : this.dexContractAddress;
    }
    get web3Public() {
        return injector_1.Injector.web3PublicService.getWeb3Public(this.from.blockchain);
    }
    get web3Private() {
        return injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(this.from.blockchain);
    }
    constructor(evmOnChainTradeStruct, providerAddress) {
        super(providerAddress);
        this.from = evmOnChainTradeStruct.from;
        this.to = evmOnChainTradeStruct.to;
        this.slippageTolerance = evmOnChainTradeStruct.slippageTolerance;
        this.path = evmOnChainTradeStruct.path;
        this.gasFeeInfo = evmOnChainTradeStruct.gasFeeInfo;
        this.useProxy = evmOnChainTradeStruct.useProxy;
        this.fromWithoutFee = evmOnChainTradeStruct.fromWithoutFee;
        this.usedForCrossChain = evmOnChainTradeStruct.usedForCrossChain || false;
        this.feeInfo = {
            rubicProxy: {
                ...(evmOnChainTradeStruct.proxyFeeInfo?.fixedFeeToken && {
                    fixedFee: {
                        amount: evmOnChainTradeStruct.proxyFeeInfo?.fixedFeeToken.tokenAmount ||
                            new bignumber_js_1.default(0),
                        token: evmOnChainTradeStruct.proxyFeeInfo?.fixedFeeToken
                    }
                }),
                ...(evmOnChainTradeStruct.proxyFeeInfo?.platformFee && {
                    platformFee: {
                        percent: evmOnChainTradeStruct.proxyFeeInfo?.platformFee.percent || 0,
                        token: evmOnChainTradeStruct.proxyFeeInfo?.platformFee.token
                    }
                })
            }
        };
        this.withDeflation = evmOnChainTradeStruct.withDeflation;
    }
    async approve(options, checkNeedApprove = true, amount = 'infinity') {
        if (checkNeedApprove) {
            const needApprove = await this.needApprove();
            if (!needApprove) {
                throw new errors_1.UnnecessaryApproveError();
            }
        }
        this.checkWalletConnected();
        await this.checkBlockchainCorrect();
        const approveAmount = this.from.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.GNOSIS ||
            this.from.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.CRONOS
            ? this.from.weiAmount
            : amount;
        const fromTokenAddress = this.from.isNative && this.from.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.METIS
            ? '0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000'
            : this.from.address;
        return this.web3Private.approveTokens(fromTokenAddress, this.spenderAddress, approveAmount, options);
    }
    async encodeApprove(tokenAddress, spenderAddress, value, options = {}) {
        return this.web3Private.encodeApprove(tokenAddress, spenderAddress, value, options);
    }
    async checkAllowanceAndApprove(options) {
        const needApprove = await this.needApprove();
        if (!needApprove) {
            return;
        }
        const approveOptions = {
            onTransactionHash: options?.onApprove,
            gas: options?.approveGasLimit || undefined,
            gasPriceOptions: options?.gasPriceOptions || undefined
        };
        await this.approve(approveOptions, false);
    }
    /**
     * Calculates value for swap transaction.
     * @param providerValue Value, returned from cross-chain provider.
     */
    getSwapValue(providerValue) {
        const nativeToken = native_tokens_1.nativeTokensList[this.from.blockchain];
        const fixedFeeValue = web3_pure_1.Web3Pure.toWei(this.feeInfo.rubicProxy?.fixedFee?.amount || 0, nativeToken.decimals);
        let fromValue;
        if (this.from.isNative) {
            if (providerValue) {
                fromValue = new bignumber_js_1.default(providerValue).dividedBy(1 - (this.feeInfo.rubicProxy?.platformFee?.percent || 0) / 100);
            }
            else {
                fromValue = this.from.weiAmount;
            }
        }
        else {
            fromValue = new bignumber_js_1.default(providerValue || 0);
        }
        return new bignumber_js_1.default(fromValue).plus(fixedFeeValue).toFixed(0, 0);
    }
    async swap(options = {}) {
        await this.checkWalletState();
        await this.checkAllowanceAndApprove(options);
        const { onConfirm, directTransaction } = options;
        let transactionHash;
        const onTransactionHash = (hash) => {
            if (onConfirm) {
                onConfirm(hash);
            }
            transactionHash = hash;
        };
        const fromAddress = this.walletAddress;
        const receiverAddress = options.receiverAddress || this.walletAddress;
        try {
            const transactionConfig = await this.encode({
                fromAddress,
                receiverAddress,
                ...(directTransaction && { directTransaction }),
                ...(options?.referrer && { referrer: options?.referrer })
            });
            let method = 'trySendTransaction';
            if (options?.testMode) {
                console.info(transactionConfig, options.gasLimit);
                method = 'sendTransaction';
            }
            await this.web3Private[method](transactionConfig.to, {
                onTransactionHash,
                data: transactionConfig.data,
                value: transactionConfig.value,
                gas: options.gasLimit,
                gasPriceOptions: options.gasPriceOptions
            });
            return transactionHash;
        }
        catch (err) {
            if (err instanceof errors_1.FailedToCheckForTransactionReceiptError) {
                return transactionHash;
            }
            throw (0, errors_2.parseError)(err);
        }
    }
    async encode(options) {
        await this.checkFromAddress(options.fromAddress, true);
        await this.checkReceiverAddress(options.receiverAddress);
        if (this.useProxy) {
            return this.encodeProxy(options);
        }
        return this.encodeDirect(options);
    }
    /**
     * Encodes trade to swap it through on-chain proxy.
     */
    async encodeProxy(options) {
        const { contractAddress, contractAbi, methodName, methodArguments, value } = await this.getProxyContractParams(options);
        const gasParams = this.getGasParams(options);
        return evm_web3_pure_1.EvmWeb3Pure.encodeMethodCall(contractAddress, contractAbi, methodName, methodArguments, value, gasParams);
    }
    async getProxyContractParams(options) {
        const swapData = await this.getSwapData(options);
        const receiverAddress = options.receiverAddress || options.fromAddress;
        const methodArguments = [
            evm_web3_pure_1.EvmWeb3Pure.randomHex(32),
            this.providerAddress,
            EvmOnChainTrade.getReferrerAddress(options.referrer),
            receiverAddress,
            this.toTokenAmountMin.stringWeiAmount,
            swapData
        ];
        const nativeToken = native_tokens_1.nativeTokensList[this.from.blockchain];
        const proxyFee = new bignumber_js_1.default(this.feeInfo.rubicProxy?.fixedFee?.amount || '0');
        const value = web3_pure_1.Web3Pure.toWei(proxyFee.plus(this.from.isNative ? this.from.tokenAmount : '0'), nativeToken.decimals);
        const txConfig = evm_web3_pure_1.EvmWeb3Pure.encodeMethodCall(rubic_proxy_contract_address_1.rubicProxyContractAddress[this.from.blockchain].router, evm_common_cross_chain_abi_1.evmCommonCrossChainAbi, 'swapTokensGeneric', methodArguments, value);
        const sendingToken = this.from.isNative ? [] : [this.from.address];
        const sendingAmount = this.from.isNative ? [] : [this.from.stringWeiAmount];
        return {
            contractAddress: rubic_proxy_contract_address_1.rubicProxyContractAddress[this.from.blockchain].gateway,
            contractAbi: gateway_rubic_cross_chain_abi_1.gatewayRubicCrossChainAbi,
            methodName: 'startViaRubic',
            methodArguments: [sendingToken, sendingAmount, txConfig.data],
            value
        };
    }
    static getReferrerAddress(referrer) {
        if (referrer) {
            return '0x' + (0, web3_utils_1.utf8ToHex)(referrer).slice(2, 42).padStart(40, '0');
        }
        return '0x0000000000000000000000000000000000000000';
    }
    isDeflationError() {
        return ((this.withDeflation.from.isDeflation || this.withDeflation.to.isDeflation) &&
            this.slippageTolerance < 0.12);
    }
    getGasParams(options, calculatedGasFee = {
        gasLimit: this.gasFeeInfo?.gasLimit?.toFixed(),
        gasPrice: this.gasFeeInfo?.gasPrice?.toFixed()
    }) {
        return {
            gas: options.gasLimit || calculatedGasFee.gasLimit,
            gasPrice: options.gasPrice || calculatedGasFee.gasPrice,
            maxPriorityFeePerGas: options.maxPriorityFeePerGas || calculatedGasFee.maxPriorityFeePerGas,
            maxFeePerGas: options.maxFeePerGas || calculatedGasFee.maxFeePerGas
        };
    }
    async getSwapData(options) {
        const directTransactionConfig = await this.encodeDirect({
            ...options,
            fromAddress: rubic_proxy_contract_address_1.rubicProxyContractAddress[this.from.blockchain].router,
            supportFee: false,
            receiverAddress: rubic_proxy_contract_address_1.rubicProxyContractAddress[this.from.blockchain].router
        });
        const availableDexs = (await proxy_cross_chain_evm_trade_1.ProxyCrossChainEvmTrade.getWhitelistedDexes(this.from.blockchain)).map(address => address.toLowerCase());
        const routerAddress = directTransactionConfig.to;
        const method = directTransactionConfig.data.slice(0, 10);
        if (!availableDexs.includes(routerAddress.toLowerCase())) {
            throw new errors_1.NotWhitelistedProviderError(routerAddress, undefined, 'dex');
        }
        await proxy_cross_chain_evm_trade_1.ProxyCrossChainEvmTrade.checkDexWhiteList(this.from.blockchain, routerAddress, method);
        return [
            [
                routerAddress,
                routerAddress,
                this.from.address,
                this.to.address,
                this.from.stringWeiAmount,
                directTransactionConfig.data,
                true
            ]
        ];
    }
}
exports.EvmOnChainTrade = EvmOnChainTrade;
//# sourceMappingURL=evm-on-chain-trade.js.map