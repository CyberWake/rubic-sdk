"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DlnSolanaOnChainTrade = void 0;
const errors_1 = require("../../../../../../../common/errors");
const updated_rates_error_1 = require("../../../../../../../common/errors/cross-chain/updated-rates-error");
const tokens_1 = require("../../../../../../../common/tokens");
const dln_api_service_1 = require("../../../../../../common/providers/dln/dln-api-service");
const check_unsupported_receiver_address_1 = require("../../../../../../common/utils/check-unsupported-receiver-address");
const rubic_proxy_contract_address_1 = require("../../../../../../cross-chain/calculation-manager/providers/common/constants/rubic-proxy-contract-address");
const aggregator_solana_on_chain_trade_abstract_1 = require("../../../common/on-chain-aggregator/aggregator-solana-on-chain-trade-abstract");
class DlnSolanaOnChainTrade extends aggregator_solana_on_chain_trade_abstract_1.AggregatorSolanaOnChainTrade {
    static async getGasLimit(_tradeStruct) {
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
        (0, check_unsupported_receiver_address_1.checkUnsupportedReceiverAddress)(options?.receiverAddress, options?.fromAddress || this.walletAddress);
        try {
            const transactionData = await this.getTxConfigAndCheckAmount(options.receiverAddress, options.fromAddress, options.directTransaction);
            return {
                data: transactionData.data,
                to: '',
                value: ''
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
                tx: {
                    data: tx.data,
                    value: '',
                    to: ''
                },
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
}
exports.DlnSolanaOnChainTrade = DlnSolanaOnChainTrade;
//# sourceMappingURL=dln-solana-on-chain-trade.js.map