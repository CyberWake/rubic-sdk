"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollBridgeTrade = void 0;
const sdk_1 = require("@arbitrum/sdk");
const providers_1 = require("@ethersproject/providers");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../common/errors");
const blockchain_name_1 = require("../../../../../core/blockchain/models/blockchain-name");
const blockchain_id_1 = require("../../../../../core/blockchain/utils/blockchains-info/constants/blockchain-id");
const evm_web3_pure_1 = require("../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const web3_pure_1 = require("../../../../../core/blockchain/web3-pure/web3-pure");
const injector_1 = require("../../../../../core/injector/injector");
const cross_chain_trade_type_1 = require("../../models/cross-chain-trade-type");
const outbox_abi_1 = require("../arbitrum-rbc-bridge/constants/outbox-abi");
const retryable_factory_abi_1 = require("../arbitrum-rbc-bridge/constants/retryable-factory-abi");
const evm_cross_chain_trade_1 = require("../common/emv-cross-chain-trade/evm-cross-chain-trade");
const bridge_type_1 = require("../common/models/bridge-type");
const l1_erc20_scroll_gateway_abi_1 = require("./constants/l1-erc20-scroll-gateway-abi");
const l2_erc20_scroll_gateway_abi_1 = require("./constants/l2-erc20-scroll-gateway-abi");
const scroll_bridge_contract_address_1 = require("./constants/scroll-bridge-contract-address");
const convert_gas_price_1 = require("../../utils/convert-gas-price");
class ScrollBridgeTrade extends evm_cross_chain_trade_1.EvmCrossChainTrade {
    /** @internal */
    static async getGasData(from, to) {
        const fromBlockchain = from.blockchain;
        const walletAddress = injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(fromBlockchain).address;
        if (!walletAddress) {
            return null;
        }
        try {
            const { contractAddress, contractAbi, methodName, methodArguments, value } = await new ScrollBridgeTrade({
                from,
                to,
                gasData: null
            }, evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS, []).getContractParams({});
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
        return scroll_bridge_contract_address_1.scrollBridgeContractAddress[this.fromBlockchain].providerGateway;
    }
    get methodName() {
        return this.onChainTrade
            ? 'swapAndStartBridgeTokensViaGenericCrossChain'
            : 'startBridgeTokensViaGenericCrossChain';
    }
    constructor(crossChainTrade, providerAddress, routePath) {
        super(providerAddress, routePath);
        this.onChainSubtype = { from: undefined, to: undefined };
        this.type = cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.SCROLL_BRIDGE;
        this.isAggregator = false;
        this.bridgeType = bridge_type_1.BRIDGE_TYPE.SCROLL_BRIDGE;
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
            const params = await this.getContractParams(options);
            const { data, to, value } = evm_web3_pure_1.EvmWeb3Pure.encodeMethodCall(params.contractAddress, params.contractAbi, params.methodName, params.methodArguments, params.value);
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
        if (this.fromBlockchain === blockchain_name_1.BLOCKCHAIN_NAME.GOERLI) {
            const methodArguments = [
                ...(this.from.isNative ? [] : [this.from.address]),
                ...(options?.receiverAddress ? [options.receiverAddress] : []),
                this.from.stringWeiAmount,
                '40000'
            ];
            const fee = web3_pure_1.Web3Pure.toWei(0.005);
            return {
                contractAddress: scroll_bridge_contract_address_1.scrollBridgeContractAddress[this.fromBlockchain].providerGateway,
                contractAbi: l1_erc20_scroll_gateway_abi_1.l1Erc20ScrollGatewayAbi,
                methodName: this.from.isNative ? 'depositETH' : 'depositERC20',
                methodArguments,
                value: this.from.isNative
                    ? this.from.weiAmount.plus(fee).toFixed()
                    : this.from.stringWeiAmount
            };
        }
        const methodArguments = [
            ...(this.from.isNative ? [] : [this.from.address]),
            ...(options?.receiverAddress ? [options.receiverAddress] : []),
            this.from.stringWeiAmount,
            '160000'
        ];
        const fee = web3_pure_1.Web3Pure.toWei(0.005);
        return {
            contractAddress: scroll_bridge_contract_address_1.scrollBridgeContractAddress[this.fromBlockchain].providerGateway,
            contractAbi: l2_erc20_scroll_gateway_abi_1.l2Erc20ScrollGatewayAbi,
            methodName: this.from.isNative ? 'withdrawETH' : 'withdrawERC20',
            methodArguments,
            value: this.from.isNative
                ? this.from.weiAmount.plus(fee).toFixed()
                : this.from.stringWeiAmount
        };
    }
    getTradeAmountRatio(_fromUsd) {
        return new bignumber_js_1.default(1);
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
    static async claimTargetTokens(sourceTransaction, options) {
        const web3Private = injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM);
        await web3Private.checkBlockchainCorrect(blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM);
        const rpcProviders = injector_1.Injector.web3PublicService.rpcProvider;
        const l1Provider = new providers_1.JsonRpcProvider(rpcProviders[blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM].rpcList[0], blockchain_id_1.blockchainId[blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]);
        const l2Provider = new providers_1.JsonRpcProvider(rpcProviders[blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM].rpcList[0], blockchain_id_1.blockchainId[blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM]);
        const targetReceipt = await l2Provider.getTransactionReceipt(sourceTransaction);
        const l2TxReceipt = new sdk_1.L2TransactionReceipt(targetReceipt);
        const [event] = l2TxReceipt.getL2ToL1Events();
        if (!event) {
            throw new errors_1.RubicSdkError('Transaction is not ready');
        }
        const messageReader = new sdk_1.L2ToL1MessageReader(l1Provider, event);
        const proof = await messageReader.getOutboxProof(l2Provider);
        const l2network = await (0, sdk_1.getL2Network)(blockchain_id_1.blockchainId[blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM]);
        const { onConfirm, gasLimit, gasPriceOptions } = options;
        const onTransactionHash = (hash) => {
            if (onConfirm) {
                onConfirm(hash);
            }
        };
        return web3Private.tryExecuteContractMethod(l2network.ethBridge.outbox, outbox_abi_1.outboxAbi, 'executeTransaction', [
            proof,
            event.position.toString(),
            event.caller,
            event.destination,
            event.arbBlockNum.toString(),
            event.ethBlockNum.toString(),
            event.timestamp.toString(),
            event.callvalue.toString(),
            event.data
        ], {
            onTransactionHash,
            gas: gasLimit,
            gasPriceOptions
        });
    }
    static async redeemTokens(sourceTransactionHash, options) {
        const rpcProviders = injector_1.Injector.web3PublicService.rpcProvider;
        const l1Provider = new providers_1.JsonRpcProvider(rpcProviders[blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM].rpcList[0], blockchain_id_1.blockchainId[blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]);
        const l2Provider = new providers_1.JsonRpcProvider(rpcProviders[blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM].rpcList[0], blockchain_id_1.blockchainId[blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM]);
        const receipt = await l1Provider.getTransactionReceipt(sourceTransactionHash);
        const messages = await new sdk_1.L1TransactionReceipt(receipt).getL1ToL2Messages(l2Provider);
        const creationIdMessage = messages.find(el => el.retryableCreationId);
        if (!creationIdMessage) {
            throw new errors_1.RubicSdkError('Can not find creation id message.');
        }
        const { retryableCreationId } = creationIdMessage;
        const web3Private = injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM);
        await web3Private.checkBlockchainCorrect(blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM);
        const { onConfirm, gasLimit, gasPriceOptions } = options;
        const onTransactionHash = (hash) => {
            if (onConfirm) {
                onConfirm(hash);
            }
        };
        return web3Private.tryExecuteContractMethod('0x000000000000000000000000000000000000006E', retryable_factory_abi_1.retryableFactoryAbi, 'redeem', [retryableCreationId], {
            onTransactionHash,
            gas: gasLimit,
            gasPriceOptions
        });
    }
}
exports.ScrollBridgeTrade = ScrollBridgeTrade;
//# sourceMappingURL=scroll-bridge-trade.js.map