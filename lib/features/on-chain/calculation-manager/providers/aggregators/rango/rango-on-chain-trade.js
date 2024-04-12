"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangoOnChainTrade = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../../../common/errors");
const tokens_1 = require("../../../../../../common/tokens");
const errors_2 = require("../../../../../../common/utils/errors");
const evm_web3_pure_1 = require("../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const injector_1 = require("../../../../../../core/injector/injector");
const rango_parser_1 = require("../../../../../common/providers/rango/services/rango-parser");
const rubic_proxy_contract_address_1 = require("../../../../../cross-chain/calculation-manager/providers/common/constants/rubic-proxy-contract-address");
const on_chain_trade_type_1 = require("../../common/models/on-chain-trade-type");
const aggregator_evm_on_chain_trade_abstract_1 = require("../../common/on-chain-aggregator/aggregator-evm-on-chain-trade-abstract");
const rango_on_chain_disabled_providers_1 = require("./models/rango-on-chain-disabled-providers");
const rango_on_chain_api_service_1 = require("./services/rango-on-chain-api-service");
class RangoOnChainTrade extends aggregator_evm_on_chain_trade_abstract_1.AggregatorEvmOnChainTrade {
    /* @internal */
    static async getGasLimit(tradeStruct, providerGateway) {
        const fromBlockchain = tradeStruct.from.blockchain;
        const walletAddress = injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(fromBlockchain).address;
        if (!walletAddress) {
            return null;
        }
        const rangoTrade = new RangoOnChainTrade(tradeStruct, evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS, providerGateway);
        try {
            const transactionConfig = await rangoTrade.encode({ fromAddress: walletAddress });
            const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(fromBlockchain);
            const gasLimit = (await web3Public.batchEstimatedGas(walletAddress, [transactionConfig]))[0];
            if (gasLimit?.isFinite()) {
                return gasLimit;
            }
        }
        catch { }
        try {
            const transactionData = await rangoTrade.getTxConfigAndCheckAmount();
            if (transactionData.gas) {
                return new bignumber_js_1.default(transactionData.gas);
            }
        }
        catch { }
        return null;
    }
    get toTokenAmountMin() {
        return this._toTokenAmountMin;
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
        this.type = on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.RANGO;
        this._toTokenAmountMin = new tokens_1.PriceTokenAmount({
            ...this.to.asStruct,
            weiAmount: tradeStruct.toTokenWeiAmountMin
        });
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
            throw (0, errors_2.parseError)(err);
        }
    }
    async getToAmountAndTxData(receiverAddress, fromAddress) {
        const params = await rango_parser_1.RangoCommonParser.getSwapQueryParams(this.from, this.to, {
            slippageTolerance: this.slippageTolerance,
            receiverAddress: receiverAddress || this.walletAddress,
            swapperGroups: rango_on_chain_disabled_providers_1.rangoOnChainDisabledProviders,
            fromAddress
        });
        const { tx: transaction, route } = await rango_on_chain_api_service_1.RangoOnChainApiService.getSwapTransaction(params);
        const { outputAmount: toAmount } = route;
        return {
            tx: {
                data: transaction.txData,
                to: transaction.txTo,
                value: transaction.value,
                gas: transaction.gasLimit ?? undefined,
                gasPrice: transaction.gasPrice ?? undefined
            },
            toAmount
        };
    }
}
exports.RangoOnChainTrade = RangoOnChainTrade;
//# sourceMappingURL=rango-on-chain-trade.js.map