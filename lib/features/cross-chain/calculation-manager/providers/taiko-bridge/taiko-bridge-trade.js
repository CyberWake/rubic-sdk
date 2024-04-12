"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaikoBridgeTrade = void 0;
const blockchain_name_1 = require("../../../../../core/blockchain/models/blockchain-name");
const blockchain_id_1 = require("../../../../../core/blockchain/utils/blockchains-info/constants/blockchain-id");
const evm_web3_pure_1 = require("../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const web3_pure_1 = require("../../../../../core/blockchain/web3-pure/web3-pure");
const injector_1 = require("../../../../../core/injector/injector");
const cross_chain_trade_type_1 = require("../../models/cross-chain-trade-type");
const evm_cross_chain_trade_1 = require("../common/emv-cross-chain-trade/evm-cross-chain-trade");
const bridge_type_1 = require("../common/models/bridge-type");
const convert_gas_price_1 = require("../../utils/convert-gas-price");
const taiko_bridge_contract_address_1 = require("./constants/taiko-bridge-contract-address");
const taiko_gateway_abi_1 = require("./constants/taiko-gateway-abi");
class TaikoBridgeTrade extends evm_cross_chain_trade_1.EvmCrossChainTrade {
    /** @internal */
    static async getGasData(from, to) {
        const fromBlockchain = from.blockchain;
        const walletAddress = injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(fromBlockchain).address;
        if (!walletAddress) {
            return null;
        }
        try {
            const { contractAddress, contractAbi, methodName, methodArguments, value } = await new TaikoBridgeTrade({
                from,
                to,
                gasData: null
            }, evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS, []).getContractParams();
            const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(fromBlockchain);
            const [gasLimit, gasDetails] = await Promise.all([
                web3Public.getEstimatedGas(contractAbi, contractAddress, methodName, methodArguments, walletAddress, value),
                (0, convert_gas_price_1.convertGasDataToBN)(await injector_1.Injector.gasPriceApi.getGasPrice(from.blockchain))
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
    get fromBlockchain() {
        return this.from.blockchain;
    }
    get fromContractAddress() {
        return this.from.isNative
            ? taiko_bridge_contract_address_1.taikoBridgeContractAddress[this.fromBlockchain].nativeProvider
            : taiko_bridge_contract_address_1.taikoBridgeContractAddress[this.fromBlockchain].erc20Provider;
    }
    get methodName() {
        return this.onChainTrade
            ? 'swapAndStartBridgeTokensViaGenericCrossChain'
            : 'startBridgeTokensViaGenericCrossChain';
    }
    constructor(crossChainTrade, providerAddress, routePath) {
        super(providerAddress, routePath);
        this.onChainSubtype = { from: undefined, to: undefined };
        this.type = cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.TAIKO_BRIDGE;
        this.isAggregator = false;
        this.bridgeType = bridge_type_1.BRIDGE_TYPE.TAIKO_BRIDGE;
        this.feeInfo = {};
        this.onChainTrade = null;
        this.from = crossChainTrade.from;
        this.to = crossChainTrade.to;
        this.gasData = crossChainTrade.gasData;
        this.toTokenAmountMin = crossChainTrade.to.tokenAmount;
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
            const params = await this.getContractParams();
            const { data, to, value } = evm_web3_pure_1.EvmWeb3Pure.encodeMethodCall(params.contractAddress, params.contractAbi, params.methodName, params.methodArguments, params.value);
            await this.web3Private
                .trySendTransaction(to, {
                data,
                value,
                gas: gasLimit,
                gasPriceOptions
            })
                .then(tx => {
                this.id = tx?.logs[this.from.isNative ? 0 : 2]?.topics[1];
                onTransactionHash(tx.transactionHash);
            });
            return transactionHash;
        }
        catch (err) {
            throw err;
        }
    }
    async getContractParams() {
        let methodArguments;
        let fee;
        const account = this.web3Private.address;
        if (this.fromBlockchain === blockchain_name_1.BLOCKCHAIN_NAME.HOLESKY) {
            if (this.from.isNative) {
                methodArguments = [
                    {
                        id: 0,
                        from: account,
                        srcChainId: blockchain_id_1.blockchainId[blockchain_name_1.BLOCKCHAIN_NAME.HOLESKY],
                        destChainId: blockchain_id_1.blockchainId[blockchain_name_1.BLOCKCHAIN_NAME.TAIKO],
                        owner: account,
                        to: account,
                        refundTo: account,
                        value: this.from.stringWeiAmount,
                        fee: '9000000',
                        gasLimit: '140000',
                        data: '0x',
                        memo: ''
                    }
                ];
                fee = '9000000';
            }
            else {
                methodArguments = [
                    {
                        destChainId: blockchain_id_1.blockchainId[blockchain_name_1.BLOCKCHAIN_NAME.TAIKO],
                        to: account,
                        token: this.from.address,
                        amount: this.from.stringWeiAmount,
                        gasLimit: '140000',
                        fee: '11459820715200000',
                        refundTo: account,
                        memo: ''
                    }
                ];
                fee = '11459820715200000';
            }
        }
        else {
            if (this.from.isNative) {
                methodArguments = [
                    {
                        id: 0,
                        from: account,
                        srcChainId: blockchain_id_1.blockchainId[blockchain_name_1.BLOCKCHAIN_NAME.TAIKO],
                        destChainId: blockchain_id_1.blockchainId[blockchain_name_1.BLOCKCHAIN_NAME.HOLESKY],
                        owner: account,
                        to: account,
                        refundTo: account,
                        value: this.from.stringWeiAmount,
                        fee: '34774829357400000',
                        gasLimit: '140000',
                        data: '0x',
                        memo: ''
                    }
                ];
                fee = '34774829357400000';
            }
            else {
                methodArguments = [
                    {
                        destChainId: blockchain_id_1.blockchainId[blockchain_name_1.BLOCKCHAIN_NAME.HOLESKY],
                        to: account,
                        token: this.from.address,
                        amount: this.from.stringWeiAmount,
                        gasLimit: '140000',
                        fee: '88242155100000',
                        refundTo: account,
                        memo: ''
                    }
                ];
                fee = '88242155100000';
            }
        }
        return {
            contractAddress: this.from.isNative
                ? taiko_bridge_contract_address_1.taikoBridgeContractAddress[this.fromBlockchain].nativeProvider
                : taiko_bridge_contract_address_1.taikoBridgeContractAddress[this.fromBlockchain].erc20Provider,
            contractAbi: this.from.isNative ? taiko_gateway_abi_1.taikoNativeBridgeABI : taiko_gateway_abi_1.taikoERC20BridgeABI,
            methodName: this.from.isNative ? 'sendMessage' : 'sendToken',
            methodArguments,
            value: this.from.isNative ? this.from.weiAmount.plus(fee).toFixed() : fee
        };
    }
    getTradeAmountRatio(fromUsd) {
        return fromUsd.dividedBy(this.to.tokenAmount);
    }
    getUsdPrice() {
        return this.from.price.multipliedBy(this.from.tokenAmount);
    }
    getTradeInfo() {
        return {
            estimatedGas: this.estimatedGas,
            feeInfo: this.feeInfo,
            priceImpact: null,
            slippage: 0,
            routePath: this.routePath
        };
    }
}
exports.TaikoBridgeTrade = TaikoBridgeTrade;
//# sourceMappingURL=taiko-bridge-trade.js.map