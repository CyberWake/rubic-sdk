"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MuteSwapTrade = void 0;
const injector_1 = require("../../../../../../../core/injector/injector");
const on_chain_trade_type_1 = require("../../../common/models/on-chain-trade-type");
const uniswap_v2_abstract_trade_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-trade");
const constants_1 = require("./constants");
const mute_swap_abi_1 = require("./mute-swap-abi");
class MuteSwapTrade extends uniswap_v2_abstract_trade_1.UniswapV2AbstractTrade {
    constructor() {
        super(...arguments);
        this.dexContractAddress = constants_1.MUTE_SWAP_CONTRACT_ADDRESS;
    }
    static callForRoutes(blockchain, exact, routesMethodArguments) {
        const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(blockchain);
        const methodName = exact === 'input' ? 'getAmountsOut' : 'getAmountsIn';
        const args = routesMethodArguments.map(arg => [arg[0], arg[1], arg[1].map(() => false)]);
        return web3Public.multicallContractMethod(this.getDexContractAddress(blockchain), this.contractAbi, methodName, args);
    }
    static get type() {
        return on_chain_trade_type_1.ON_CHAIN_TRADE_TYPE.MUTE_SWAP;
    }
    getCallParameters(receiverAddress) {
        const { amountIn, amountOut } = this.getAmountInAndAmountOut();
        const amountParameters = this.from.isNative ? [amountOut] : [amountIn, amountOut];
        return [
            ...amountParameters,
            this.wrappedPath.map(t => t.address),
            receiverAddress || this.walletAddress,
            this.deadlineMinutesTimestamp,
            this.wrappedPath.map(() => false)
        ];
    }
}
exports.MuteSwapTrade = MuteSwapTrade;
MuteSwapTrade.contractAbi = mute_swap_abi_1.muteSwapAbi;
//# sourceMappingURL=mute-swap-trade.js.map