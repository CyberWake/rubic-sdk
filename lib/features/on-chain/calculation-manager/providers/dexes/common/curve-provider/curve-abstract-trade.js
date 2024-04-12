"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurveAbstractTrade = void 0;
const errors_1 = require("../../../../../../../common/errors");
const errors_2 = require("../../../../../../../common/utils/errors");
const evm_web3_pure_1 = require("../../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const evm_on_chain_trade_1 = require("../../../common/on-chain-trade/evm-on-chain-trade/evm-on-chain-trade");
const registry_exchange_abi_1 = require("./constants/registry-exchange-abi");
const curve_abstract_provider_1 = require("./curve-abstract-provider");
class CurveAbstractTrade extends evm_on_chain_trade_1.EvmOnChainTrade {
    get type() {
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.CURVE;
    }
    get nativeValueToSend() {
        if (this.from.isNative) {
            return this.from.stringWeiAmount;
        }
        return '0';
    }
    constructor(tradeStruct, providerAddress) {
        super(tradeStruct, providerAddress);
        this.dexContractAddress = tradeStruct.registryExchangeAddress;
        this.poolAddress = tradeStruct.poolAddress;
    }
    async encodeDirect(options) {
        await this.checkFromAddress(options.fromAddress, true);
        await this.checkReceiverAddress(options.receiverAddress);
        if (options.supportFee === undefined) {
            if (await this.needApprove(options.fromAddress)) {
                throw new errors_1.RubicSdkError('To use `encode` function, token must be approved for wallet');
            }
            try {
                await this.checkBalance();
            }
            catch (_err) {
                throw new errors_1.RubicSdkError('To use `encode` function, wallet must have enough balance or you must provider `supportFee` parameter in options.');
            }
        }
        try {
            const gasParams = this.getGasParams(options);
            const exchangeParams = [
                this.poolAddress,
                this.from.isNative ? curve_abstract_provider_1.CurveAbstractProvider.nativeAddress : this.from.address,
                this.to.isNative ? curve_abstract_provider_1.CurveAbstractProvider.nativeAddress : this.to.address,
                this.fromWithoutFee.stringWeiAmount,
                this.toTokenAmountMin.stringWeiAmount
            ];
            if (options.receiverAddress) {
                exchangeParams.push(options.receiverAddress);
            }
            return evm_web3_pure_1.EvmWeb3Pure.encodeMethodCall(this.dexContractAddress, registry_exchange_abi_1.registryExchangeAbi, 'exchange', exchangeParams, this.nativeValueToSend, gasParams);
        }
        catch (err) {
            if (this.isDeflationError()) {
                throw new errors_1.LowSlippageDeflationaryTokenError();
            }
            throw (0, errors_2.parseError)(err);
        }
    }
}
exports.CurveAbstractTrade = CurveAbstractTrade;
//# sourceMappingURL=curve-abstract-trade.js.map