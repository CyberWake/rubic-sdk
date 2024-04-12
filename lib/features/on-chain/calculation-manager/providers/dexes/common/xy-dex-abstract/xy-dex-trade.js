"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XyDexTrade = void 0;
const errors_1 = require("../../../../../../../common/errors");
const decorators_1 = require("../../../../../../../common/utils/decorators");
const errors_2 = require("../../../../../../../common/utils/errors");
const blockchain_id_1 = require("../../../../../../../core/blockchain/utils/blockchains-info/constants/blockchain-id");
const evm_web3_pure_1 = require("../../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const injector_1 = require("../../../../../../../core/injector/injector");
const xy_api_params_1 = require("../../../../../../common/providers/xy/constants/xy-api-params");
const xy_utils_1 = require("../../../../../../common/providers/xy/utils/xy-utils");
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const evm_on_chain_trade_1 = require("../../../common/on-chain-trade/evm-on-chain-trade/evm-on-chain-trade");
class XyDexTrade extends evm_on_chain_trade_1.EvmOnChainTrade {
    /** @internal */
    static async getGasLimit(tradeStruct) {
        const fromBlockchain = tradeStruct.from.blockchain;
        const walletAddress = injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(fromBlockchain).address;
        if (!walletAddress) {
            return null;
        }
        try {
            const transactionConfig = await new XyDexTrade(tradeStruct, evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS).encode({ fromAddress: walletAddress });
            const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(fromBlockchain);
            const gasLimit = (await web3Public.batchEstimatedGas(walletAddress, [transactionConfig]))[0];
            if (!gasLimit?.isFinite()) {
                return null;
            }
            return gasLimit;
        }
        catch (_err) {
            return null;
        }
    }
    /** @internal */
    static async checkIfNeedApproveAndThrowError(from, fromAddress, useProxy) {
        const needApprove = await new XyDexTrade({
            from,
            useProxy
        }, evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS).needApprove(fromAddress);
        if (needApprove) {
            throw new errors_1.RubicSdkError('Approve is needed');
        }
    }
    constructor(tradeStruct, providerAddress) {
        super(tradeStruct, providerAddress);
        this.type = on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.XY_DEX;
        this.dexContractAddress = tradeStruct.contractAddress;
        this.provider = tradeStruct.provider;
    }
    async encodeDirect(options) {
        await this.checkFromAddress(options.fromAddress, true);
        await this.checkReceiverAddress(options.receiverAddress);
        try {
            return await this.getTradeData(options.receiverAddress, options.directTransaction);
            // const gasPriceInfo = await getGasPriceInfo(this.from.blockchain);
            //
            // const { gas, gasPrice } = getGasFeeInfo(apiTradeData.routers[0]!.estimatedGas, gasPriceInfo);
            //
            // return {
            //     ...apiTradeData.tx,
            //     gas,
            //     gasPrice
            // };
        }
        catch (err) {
            throw (0, errors_2.parseError)(err, err?.response?.data?.description || err.message);
        }
    }
    async getTradeData(receiverAddress, directTransaction) {
        if (directTransaction) {
            return {
                data: directTransaction.data,
                to: directTransaction.to,
                value: directTransaction.value
            };
        }
        const receiver = receiverAddress || this.walletAddress;
        const chainId = blockchain_id_1.blockchainId[this.from.blockchain];
        const srcQuoteTokenAddress = this.from.isNative ? xy_api_params_1.XY_NATIVE_ADDRESS : this.from.address;
        const dstQuoteTokenAddress = this.to.isNative ? xy_api_params_1.XY_NATIVE_ADDRESS : this.to.address;
        const quoteTradeParams = {
            srcChainId: chainId,
            srcQuoteTokenAddress,
            srcQuoteTokenAmount: this.from.stringWeiAmount,
            dstChainId: chainId,
            dstQuoteTokenAddress,
            slippage: this.slippageTolerance * 100,
            receiver,
            srcSwapProvider: this.provider
        };
        const tradeData = await this.getResponseFromApiToTransactionRequest(quoteTradeParams);
        if (!tradeData.success) {
            (0, xy_utils_1.xyAnalyzeStatusCode)(tradeData.errorCode, tradeData.errorMsg);
        }
        this.checkAmountChange(tradeData.tx, tradeData.route.dstQuoteTokenAmount, this.to.stringWeiAmount);
        return tradeData.tx;
    }
    async getResponseFromApiToTransactionRequest(params) {
        return injector_1.Injector.httpClient.get(`${xy_api_params_1.XY_API_ENDPOINT}/buildTx`, {
            params: { ...params }
        });
    }
}
exports.XyDexTrade = XyDexTrade;
__decorate([
    (0, decorators_1.Cache)({
        maxAge: 15000
    })
], XyDexTrade.prototype, "getResponseFromApiToTransactionRequest", null);
//# sourceMappingURL=xy-dex-trade.js.map