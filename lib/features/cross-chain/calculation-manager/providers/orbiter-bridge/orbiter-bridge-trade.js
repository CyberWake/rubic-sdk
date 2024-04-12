"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrbiterBridgeTrade = void 0;
const errors_1 = require("../../../../../common/errors");
const erc_20_token_abi_1 = require("../../../../../core/blockchain/web3-public-service/web3-public/evm-web3-public/constants/erc-20-token-abi");
const evm_web3_pure_1 = require("../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const web3_pure_1 = require("../../../../../core/blockchain/web3-pure/web3-pure");
const injector_1 = require("../../../../../core/injector/injector");
const cross_chain_trade_type_1 = require("../../models/cross-chain-trade-type");
const convert_gas_price_1 = require("../../utils/convert-gas-price");
const rubic_proxy_contract_address_1 = require("../common/constants/rubic-proxy-contract-address");
const evm_cross_chain_trade_1 = require("../common/emv-cross-chain-trade/evm-cross-chain-trade");
const bridge_type_1 = require("../common/models/bridge-type");
const orbiter_contract_addresses_1 = require("./models/orbiter-contract-addresses");
const orbiter_utils_1 = require("./services/orbiter-utils");
class OrbiterBridgeTrade extends evm_cross_chain_trade_1.EvmCrossChainTrade {
    /** @internal */
    static async getGasData({ fromToken, toToken, feeInfo, 
    // receiverAddress,
    providerAddress, quoteConfig }) {
        const fromBlockchain = fromToken.blockchain;
        const walletAddress = injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(fromBlockchain).address;
        if (!walletAddress) {
            return null;
        }
        try {
            let gasLimit;
            let gasDetails;
            const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(fromBlockchain);
            const tradeParams = {
                crossChainTrade: {
                    from: fromToken,
                    to: toToken,
                    feeInfo,
                    gasData: null,
                    priceImpact: fromToken.calculatePriceImpactPercent(toToken) || 0,
                    quoteConfig
                },
                routePath: [],
                providerAddress
            };
            if (feeInfo.rubicProxy?.fixedFee?.amount.gt(0)) {
                // const { contractAddress, contractAbi, methodName, methodArguments, value } =
                //     await new OrbiterBridgeTrade(tradeParams).getContractParams({
                //         receiverAddress
                //     });
                // const [proxyGasLimit, proxyGasDetails] = await Promise.all([
                //     web3Public.getEstimatedGas(
                //         contractAbi,
                //         contractAddress,
                //         methodName,
                //         methodArguments,
                //         walletAddress,
                //         value
                //     ),
                //     convertGasDataToBN(await Injector.gasPriceApi.getGasPrice(fromBlockchain))
                // ]);
                // gasLimit = proxyGasLimit;
                // gasDetails = proxyGasDetails;
            }
            else {
                const { data, value, to } = await new OrbiterBridgeTrade(tradeParams).callOrbiterContract();
                const defaultGasLimit = await web3Public.getEstimatedGasByData(walletAddress, to, {
                    data,
                    value
                });
                const defaultGasDetails = (0, convert_gas_price_1.convertGasDataToBN)(await injector_1.Injector.gasPriceApi.getGasPrice(fromBlockchain));
                gasLimit = defaultGasLimit;
                gasDetails = defaultGasDetails;
            }
            //@ts-ignore
            if (!gasLimit?.isFinite()) {
                return null;
            }
            const increasedGasLimit = web3_pure_1.Web3Pure.calculateGasMargin(gasLimit, 1.2);
            return {
                gasLimit: increasedGasLimit,
                //@ts-ignore
                ...gasDetails
            };
        }
        catch (err) {
            return null;
        }
    }
    get fromBlockchain() {
        return this.from.blockchain;
    }
    get fromContractAddress() {
        return this.isProxyTrade
            ? rubic_proxy_contract_address_1.rubicProxyContractAddress[this.fromBlockchain].gateway
            : orbiter_contract_addresses_1.orbiterContractAddresses[this.fromBlockchain];
    }
    get methodName() {
        return 'startBridgeTokensViaGenericCrossChain';
    }
    constructor(params) {
        super(params.providerAddress, params.routePath);
        /**ABSTRACT PROPS */
        this.type = cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.ORBITER_BRIDGE;
        this.isAggregator = false;
        this.onChainSubtype = { from: undefined, to: undefined };
        this.bridgeType = bridge_type_1.BRIDGE_TYPE.ORBITER_BRIDGE;
        this.to = params.crossChainTrade.to;
        this.from = params.crossChainTrade.from;
        this.toTokenAmountMin = params.crossChainTrade.to.tokenAmount;
        this.feeInfo = params.crossChainTrade.feeInfo;
        this.gasData = params.crossChainTrade.gasData;
        this.priceImpact = params.crossChainTrade.priceImpact;
        this.quoteConfig = params.crossChainTrade.quoteConfig;
    }
    async swapDirect(options = {}) {
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
            const { data, to, value } = await this.callOrbiterContract(options.directTransaction);
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
    /*
     *@TODO Handle proxy contracts when orbiter adds reciver-address support
     */
    async getContractParams() {
        throw new errors_1.RubicSdkError("Orbiter doesn't support proxy contracts!");
        // const receiverAddress = options?.receiverAddress || this.walletAddress;
        // const {
        //     data,
        //     value: providerValue,
        //     to: providerRouter
        // } = await this.callOrbiterContract(options.directTransaction);
        // const bridgeData = ProxyCrossChainEvmTrade.getBridgeData(options, {
        //     walletAddress: receiverAddress,
        //     fromTokenAmount: this.from,
        //     toTokenAmount: this.to,
        //     srcChainTrade: null,
        //     providerAddress: this.providerAddress,
        //     type: `native:${this.bridgeType}`,
        //     fromAddress: this.walletAddress
        // });
        // const extraNativeFee = this.quoteConfig.tradeFee;
        // const providerData = await ProxyCrossChainEvmTrade.getGenericProviderData(
        //     providerRouter,
        //     data!,
        //     this.from.blockchain,
        //     providerRouter,
        //     extraNativeFee
        // );
        // const methodArguments = [bridgeData, providerData];
        // const value = this.getSwapValue(providerValue);
        // const transactionConfiguration = EvmWeb3Pure.encodeMethodCall(
        //     rubicProxyContractAddress[this.from.blockchain].router,
        //     evmCommonCrossChainAbi,
        //     this.methodName,
        //     methodArguments,
        //     value
        // );
        // const sendingToken = this.from.isNative ? [] : [this.from.address];
        // const sendingAmount = this.from.isNative ? [] : [this.from.stringWeiAmount];
        // return {
        //     contractAddress: rubicProxyContractAddress[this.from.blockchain].gateway,
        //     contractAbi: gatewayRubicCrossChainAbi,
        //     methodName: 'startViaRubic',
        //     methodArguments: [sendingToken, sendingAmount, transactionConfiguration.data],
        //     value
        // };
    }
    async callOrbiterContract(transactionConfig) {
        if (transactionConfig) {
            return {
                data: transactionConfig.data,
                to: transactionConfig.to,
                value: transactionConfig.value
            };
        }
        const contractAddress = this.quoteConfig.endpoint;
        const value = orbiter_utils_1.OrbiterUtils.getTransferAmount(this.from, this.quoteConfig);
        if (this.from.isNative) {
            return {
                data: '0x',
                to: contractAddress,
                value
            };
        }
        const config = evm_web3_pure_1.EvmWeb3Pure.encodeMethodCall(this.from.address, erc_20_token_abi_1.ERC20_TOKEN_ABI, 'transfer', [contractAddress, value], '0');
        return {
            to: config.to,
            value: config.value,
            data: config.data
        };
    }
    getTradeInfo() {
        return {
            estimatedGas: this.estimatedGas,
            feeInfo: this.feeInfo,
            priceImpact: this.priceImpact,
            slippage: 0,
            routePath: this.routePath
        };
    }
}
exports.OrbiterBridgeTrade = OrbiterBridgeTrade;
//# sourceMappingURL=orbiter-bridge-trade.js.map