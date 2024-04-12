"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VooiAbstractTrade = void 0;
const options_1 = require("../../../../../../../common/utils/options");
const evm_web3_pure_1 = require("../../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const evm_on_chain_trade_1 = require("../../../common/on-chain-trade/evm-on-chain-trade/evm-on-chain-trade");
const vooi_abi_1 = require("./constants/vooi-abi");
class VooiAbstractTrade extends evm_on_chain_trade_1.EvmOnChainTrade {
    static get type() {
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.VOOI;
    }
    constructor(tradeStruct, providerAddress) {
        super(tradeStruct, providerAddress);
        this.type = on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.VOOI;
        this.fromPoolId = tradeStruct.fromPoolId;
        this.toPoolId = tradeStruct.toPoolId;
        this.deadlineInMinutes = tradeStruct.deadlineMinutes;
    }
    async encodeDirect(options) {
        await this.checkFromAddress(options.fromAddress, true);
        await this.checkReceiverAddress(options.receiverAddress);
        const receiver = options?.receiverAddress || this.walletAddress;
        const gasParams = this.getGasParams(options);
        return evm_web3_pure_1.EvmWeb3Pure.encodeMethodCall(this.dexContractAddress, vooi_abi_1.vooiAbi, 'swap', [
            this.fromPoolId,
            this.toPoolId,
            this.from.stringWeiAmount,
            this.toTokenAmountMin.stringWeiAmount,
            receiver,
            (0, options_1.deadlineMinutesTimestamp)(this.deadlineInMinutes)
        ], this.fromWithoutFee.isNative ? this.fromWithoutFee.stringWeiAmount : '0', gasParams);
    }
}
exports.VooiAbstractTrade = VooiAbstractTrade;
//# sourceMappingURL=vooi-abstract-trade.js.map