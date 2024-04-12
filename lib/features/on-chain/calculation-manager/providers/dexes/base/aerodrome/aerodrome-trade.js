"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AerodromeTrade = void 0;
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const aerodrome_abi_1 = require("./aerodrome-abi");
const constants_1 = require("./constants");
const uniswap_v2_abstract_trade_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-trade");
class AerodromeTrade extends uniswap_v2_abstract_trade_1.UniswapV2AbstractTrade {
    constructor() {
        super(...arguments);
        this.dexContractAddress = constants_1.AERODROME_CONTRACT_ADDRESS;
    }
    static get type() {
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.AERODROME;
    }
    getCallParameters(receiverAddress) {
        const { amountIn, amountOut } = this.getAmountInAndAmountOut();
        const amountParameters = this.from.isNative ? [amountOut] : [amountIn, amountOut];
        const path = this.routPoolInfo;
        return [
            ...amountParameters,
            path,
            receiverAddress || this.walletAddress,
            this.deadlineMinutesTimestamp
        ];
    }
}
exports.AerodromeTrade = AerodromeTrade;
AerodromeTrade.contractAbi = aerodrome_abi_1.AERODROME_ABI;
//# sourceMappingURL=aerodrome-trade.js.map