"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymbiosisOnChainTrade = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../../common/errors");
const errors_2 = require("../../../../../../common/utils/errors");
const evm_web3_pure_1 = require("../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const injector_1 = require("../../../../../../core/injector/injector");
const symbiosis_api_service_1 = require("../../../../../common/providers/symbiosis/services/symbiosis-api-service");
const symbiosis_parser_1 = require("../../../../../common/providers/symbiosis/services/symbiosis-parser");
const rubic_proxy_contract_address_1 = require("../../../../../cross-chain/calculation-manager/providers/common/constants/rubic-proxy-contract-address");
const on_chain_trade_type_1 = require("../../common/models/on-chain-trade-type");
const aggregator_evm_on_chain_trade_abstract_1 = require("../../common/on-chain-aggregator/aggregator-evm-on-chain-trade-abstract");
class SymbiosisOnChainTrade extends aggregator_evm_on_chain_trade_abstract_1.AggregatorEvmOnChainTrade {
    /* @internal */
    static async getGasLimit(tradeStruct, providerGateway) {
        const fromBlockchain = tradeStruct.from.blockchain;
        const walletAddress = injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(fromBlockchain).address;
        if (!walletAddress) {
            return null;
        }
        const symbiosisTrade = new SymbiosisOnChainTrade(tradeStruct, evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS, providerGateway);
        try {
            const transactionConfig = await symbiosisTrade.encode({ fromAddress: walletAddress });
            const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(fromBlockchain);
            const gasLimit = (await web3Public.batchEstimatedGas(walletAddress, [transactionConfig]))[0];
            if (gasLimit?.isFinite()) {
                return gasLimit;
            }
        }
        catch { }
        try {
            const transactionData = await symbiosisTrade.getTxConfigAndCheckAmount();
            if (transactionData.gas) {
                return new bignumber_js_1.default(transactionData.gas);
            }
        }
        catch { }
        return null;
    }
    get spenderAddress() {
        return this.useProxy
            ? rubic_proxy_contract_address_1.rubicProxyContractAddress[this.from.blockchain].gateway
            : this.providerGateway;
    }
    get dexContractAddress() {
        throw new errors_1.RubicSdkError('Dex address is unknown before swap is started');
    }
    constructor(tradeStruct, providerAddress, providerGateway) {
        super(tradeStruct, providerAddress);
        this.type = on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.SYMBIOSIS_SWAP;
        this.providerGateway = providerGateway;
    }
    async encodeDirect(options) {
        await this.checkFromAddress(options.fromAddress, true);
        await this.checkReceiverAddress(options.receiverAddress);
        try {
            const transactionData = await this.getTxConfigAndCheckAmount(options.receiverAddress, options.fromAddress, options.directTransaction);
            const { gas, gasPrice } = this.getGasParams(options, {
                gasLimit: transactionData.gas,
                gasPrice: transactionData.gasPrice
            });
            const value = this.getSwapValue(transactionData.value);
            return {
                to: transactionData.to,
                data: transactionData.data,
                value,
                gas,
                gasPrice
            };
        }
        catch (err) {
            if ([400, 500, 503].includes(err.code)) {
                throw new errors_1.SwapRequestError();
            }
            if (this.isDeflationError()) {
                throw new errors_1.LowSlippageDeflationaryTokenError();
            }
            throw (0, errors_2.parseError)(err);
        }
    }
    //@TODO - CHECK IF we need to pass fromAddress with proxy or remove it after listing
    async getToAmountAndTxData(receiverAddress, fromAddress) {
        const requestBody = await symbiosis_parser_1.SymbiosisParser.getSwapRequestBody(this.from, this.to, {
            receiverAddress,
            fromAddress,
            slippage: this.slippageTolerance
        });
        const { tx, tokenAmountOut } = await symbiosis_api_service_1.SymbiosisApiService.getOnChainSwapTx(requestBody);
        return {
            tx,
            toAmount: tokenAmountOut.amount
        };
    }
}
exports.SymbiosisOnChainTrade = SymbiosisOnChainTrade;
//# sourceMappingURL=symbiosis-on-chain-trade.js.map