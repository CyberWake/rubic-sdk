"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LifiTrade = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../../common/errors");
const updated_rates_error_1 = require("../../../../../../common/errors/cross-chain/updated-rates-error");
const price_token_amount_1 = require("../../../../../../common/tokens/price-token-amount");
const evm_web3_pure_1 = require("../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const injector_1 = require("../../../../../../core/injector/injector");
const rubic_proxy_contract_address_1 = require("../../../../../cross-chain/calculation-manager/providers/common/constants/rubic-proxy-contract-address");
const aggregator_evm_on_chain_trade_abstract_1 = require("../../common/on-chain-aggregator/aggregator-evm-on-chain-trade-abstract");
class LifiTrade extends aggregator_evm_on_chain_trade_abstract_1.AggregatorEvmOnChainTrade {
    /** @internal */
    static async getGasLimit(lifiTradeStruct) {
        const fromBlockchain = lifiTradeStruct.from.blockchain;
        const walletAddress = injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(fromBlockchain).address;
        if (!walletAddress) {
            return null;
        }
        const lifiTrade = new LifiTrade(lifiTradeStruct, evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS);
        try {
            const transactionConfig = await lifiTrade.encode({ fromAddress: walletAddress });
            const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(fromBlockchain);
            const gasLimit = (await web3Public.batchEstimatedGas(walletAddress, [transactionConfig]))[0];
            if (gasLimit?.isFinite()) {
                return gasLimit;
            }
        }
        catch { }
        try {
            const transactionData = await lifiTrade.getTxConfigAndCheckAmount();
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
        this._toTokenAmountMin = new price_token_amount_1.PriceTokenAmount({
            ...this.to.asStruct,
            weiAmount: tradeStruct.toTokenWeiAmountMin
        });
        this.type = tradeStruct.type;
        this.route = tradeStruct.route;
        this.providerGateway = this.route.steps[0].estimate.approvalAddress;
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
            if (this.isDeflationError()) {
                throw new errors_1.LowSlippageDeflationaryTokenError();
            }
            if (err instanceof updated_rates_error_1.UpdatedRatesError || err instanceof errors_1.RubicSdkError) {
                throw err;
            }
            throw new errors_1.LifiPairIsUnavailableError();
        }
    }
    async getToAmountAndTxData(receiverAddress, fromAddress) {
        const firstStep = this.route.steps[0];
        const step = {
            ...firstStep,
            action: {
                ...firstStep.action,
                fromAddress: fromAddress || this.walletAddress,
                toAddress: receiverAddress || this.walletAddress
            },
            execution: {
                status: 'NOT_STARTED',
                process: [
                    {
                        message: 'Preparing swap.',
                        startedAt: Date.now(),
                        status: 'STARTED',
                        type: 'SWAP'
                    }
                ]
            }
        };
        try {
            const swapResponse = await this.httpClient.post('https://li.quest/v1/advanced/stepTransaction', {
                ...step
            });
            const { transactionRequest, estimate: { toAmount } } = swapResponse;
            return {
                tx: {
                    data: transactionRequest.data,
                    to: transactionRequest.to,
                    value: transactionRequest.value,
                    gas: transactionRequest.gasLimit,
                    gasPrice: transactionRequest.gasPrice
                },
                toAmount
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
exports.LifiTrade = LifiTrade;
//# sourceMappingURL=lifi-trade.js.map