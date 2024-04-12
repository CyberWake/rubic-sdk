"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayerZeroBridgeTrade = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const utils_1 = require("ethers/lib/utils");
const blockchain_name_1 = require("../../../../../core/blockchain/models/blockchain-name");
const evm_web3_pure_1 = require("../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const web3_pure_1 = require("../../../../../core/blockchain/web3-pure/web3-pure");
const injector_1 = require("../../../../../core/injector/injector");
const cross_chain_trade_type_1 = require("../../models/cross-chain-trade-type");
const evm_cross_chain_trade_1 = require("../common/emv-cross-chain-trade/evm-cross-chain-trade");
const bridge_type_1 = require("../common/models/bridge-type");
const convert_gas_price_1 = require("../../utils/convert-gas-price");
const algb_token_addresses_1 = require("./constants/algb-token-addresses");
const layerzero_bridge_address_1 = require("./constants/layerzero-bridge-address");
const layzerzero_chain_ids_1 = require("./constants/layzerzero-chain-ids");
const layerzero_oft_abi_1 = require("./models/layerzero-oft-abi");
class LayerZeroBridgeTrade extends evm_cross_chain_trade_1.EvmCrossChainTrade {
    /** @internal */
    static async getGasData(from, to, options) {
        const fromBlockchain = from.blockchain;
        const walletAddress = injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(fromBlockchain).address;
        if (!walletAddress) {
            return null;
        }
        try {
            const { contractAddress, contractAbi, methodName, methodArguments, value } = await new LayerZeroBridgeTrade({
                from,
                to,
                gasData: {
                    gasLimit: new bignumber_js_1.default(0),
                    gasPrice: new bignumber_js_1.default(0)
                }
            }, evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS, []).getContractParams(options);
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
    get toBlockchain() {
        return this.to.blockchain;
    }
    get fromContractAddress() {
        return layerzero_bridge_address_1.layerZeroProxyOFT[this.fromBlockchain];
    }
    get methodName() {
        return 'sendFrom';
    }
    constructor(crossChainTrade, providerAddress, routePath) {
        super(providerAddress, routePath);
        this.onChainSubtype = { from: undefined, to: undefined };
        this.type = cross_chain_trade_type_1.CROSS_CHAIN_TRADE_TYPE.LAYERZERO;
        this.isAggregator = false;
        this.bridgeType = bridge_type_1.BRIDGE_TYPE.LAYERZERO;
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
            const tx = await this.web3Private.trySendTransaction(to, {
                data,
                value,
                gas: gasLimit,
                gasPriceOptions
            });
            onTransactionHash(tx.transactionHash);
            return transactionHash;
        }
        catch (err) {
            throw err;
        }
    }
    async getContractParams(options) {
        const account = this.web3Private.address;
        const fee = await this.estimateSendFee(options);
        const methodArguments = [
            account,
            layzerzero_chain_ids_1.layerZeroChainIds[this.toBlockchain],
            options.receiverAddress || account,
            this.from.stringWeiAmount,
            options.receiverAddress || account,
            '0x0000000000000000000000000000000000000000',
            '0x'
        ];
        return {
            contractAddress: this.fromBlockchain === blockchain_name_1.BLOCKCHAIN_NAME.POLYGON
                ? layerzero_bridge_address_1.layerZeroProxyOFT[blockchain_name_1.BLOCKCHAIN_NAME.POLYGON]
                : algb_token_addresses_1.ALGB_TOKEN[this.fromBlockchain],
            contractAbi: layerzero_oft_abi_1.layerZeroOFTABI,
            methodName: this.methodName,
            methodArguments,
            value: fee || '0x'
        };
    }
    async estimateSendFee(options) {
        const adapterParams = (0, utils_1.solidityPack)(['uint16', 'uint256'], [1, this.toBlockchain === blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM ? 2000000 : 200000]);
        const params = {
            contractAddress: this.fromBlockchain === blockchain_name_1.BLOCKCHAIN_NAME.POLYGON
                ? layerzero_bridge_address_1.layerZeroProxyOFT[blockchain_name_1.BLOCKCHAIN_NAME.POLYGON]
                : algb_token_addresses_1.ALGB_TOKEN[this.fromBlockchain],
            contractAbi: layerzero_oft_abi_1.layerZeroOFTABI,
            methodName: 'estimateSendFee',
            methodArguments: [
                layzerzero_chain_ids_1.layerZeroChainIds[this.toBlockchain],
                options.receiverAddress || this.web3Private.address,
                this.from.stringWeiAmount,
                false,
                adapterParams
            ],
            value: '0'
        };
        const gasFee = await this.fromWeb3Public.callContractMethod(params.contractAddress, params.contractAbi, params.methodName, params.methodArguments);
        return gasFee[0];
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
exports.LayerZeroBridgeTrade = LayerZeroBridgeTrade;
//# sourceMappingURL=layerzero-bridge-trade.js.map