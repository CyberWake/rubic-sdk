"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DlnEvmOnChainTrade = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../../../common/errors");
const updated_rates_error_1 = require("../../../../../../../common/errors/cross-chain/updated-rates-error");
const tokens_1 = require("../../../../../../../common/tokens");
const evm_web3_pure_1 = require("../../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const injector_1 = require("../../../../../../../core/injector/injector");
const dln_api_service_1 = require("../../../../../../common/providers/dln/dln-api-service");
const check_unsupported_receiver_address_1 = require("../../../../../../common/utils/check-unsupported-receiver-address");
const rubic_proxy_contract_address_1 = require("../../../../../../cross-chain/calculation-manager/providers/common/constants/rubic-proxy-contract-address");
const dln_on_chain_factory_1 = require("../dln-on-chain-factory");
const aggregator_evm_on_chain_trade_abstract_1 = require("../../../common/on-chain-aggregator/aggregator-evm-on-chain-trade-abstract");
class DlnEvmOnChainTrade extends aggregator_evm_on_chain_trade_abstract_1.AggregatorEvmOnChainTrade {
    static async getGasLimit(tradeStruct) {
        const fromBlockchain = tradeStruct.from.blockchain;
        const walletAddress = injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(fromBlockchain).address;
        if (!walletAddress) {
            return null;
        }
        const trade = dln_on_chain_factory_1.DlnOnChainFactory.createTrade(fromBlockchain, tradeStruct, evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS);
        try {
            const transactionConfig = await trade.encode({ fromAddress: walletAddress });
            const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(fromBlockchain);
            const gasLimit = (await web3Public.batchEstimatedGas(walletAddress, [transactionConfig]))[0];
            if (gasLimit?.isFinite()) {
                return gasLimit;
            }
        }
        catch { }
        try {
            const transactionData = await trade.getTxConfigAndCheckAmount();
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
    get toTokenAmountMin() {
        return this._toTokenAmountMin;
    }
    constructor(tradeStruct, providerAddress) {
        super(tradeStruct, providerAddress);
        this._toTokenAmountMin = new tokens_1.PriceTokenAmount({
            ...this.to.asStruct,
            tokenAmount: tradeStruct.toTokenWeiAmountMin
        });
        this.type = tradeStruct.type;
        this.providerGateway = tradeStruct.providerGateway;
        this.transactionRequest = tradeStruct.transactionRequest;
    }
    async encodeDirect(options) {
        await this.checkFromAddress(options.fromAddress, true);
        try {
            const transactionData = await this.getTxConfigAndCheckAmount(options.receiverAddress, options.fromAddress, options.directTransaction);
            const { gas, gasPrice } = this.getGasParams(options, {
                gasLimit: transactionData.gas,
                gasPrice: transactionData.gasPrice
            });
            return {
                to: transactionData.to,
                data: transactionData.data,
                value: this.fromWithoutFee.isNative ? this.fromWithoutFee.stringWeiAmount : '0',
                gas,
                gasPrice
            };
        }
        catch (err) {
            if ([400, 500, 503].includes(err.code)) {
                throw new errors_1.SwapRequestError();
            }
            if (err instanceof updated_rates_error_1.UpdatedRatesError || err instanceof errors_1.RubicSdkError) {
                throw err;
            }
            throw new errors_1.RubicSdkError('Can not encode trade');
        }
    }
    async getToAmountAndTxData(receiverAddress, _fromAddress) {
        const params = {
            ...this.transactionRequest,
            tokenOutRecipient: receiverAddress || this.web3Private.address
        };
        try {
            const { tx, tokenOut } = await dln_api_service_1.DlnApiService.fetchOnChainSwapData(params);
            return {
                tx,
                toAmount: tokenOut.amount
            };
        }
        catch (err) {
            if ('statusCode' in err && 'message' in err) {
                throw new errors_1.RubicSdkError(err.message);
            }
            throw err;
        }
    }
    async encode(options) {
        await this.checkFromAddress(options.fromAddress, true);
        (0, check_unsupported_receiver_address_1.checkUnsupportedReceiverAddress)(options?.receiverAddress, options?.fromAddress || this.walletAddress);
        if (this.useProxy) {
            return this.encodeProxy(options);
        }
        return this.encodeDirect(options);
    }
}
exports.DlnEvmOnChainTrade = DlnEvmOnChainTrade;
//# sourceMappingURL=dln-evm-on-chain-trade.js.map