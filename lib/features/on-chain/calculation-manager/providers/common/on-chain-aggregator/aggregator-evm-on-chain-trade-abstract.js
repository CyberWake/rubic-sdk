"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregatorEvmOnChainTrade = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const token_utils_1 = require("../../../../../../common/utils/token-utils");
const evm_on_chain_trade_1 = require("../on-chain-trade/evm-on-chain-trade/evm-on-chain-trade");
class AggregatorEvmOnChainTrade extends evm_on_chain_trade_1.EvmOnChainTrade {
    async getTxConfigAndCheckAmount(receiverAddress, fromAddress, directTransaction) {
        if (directTransaction) {
            return directTransaction;
        }
        const { tx, toAmount } = await this.getToAmountAndTxData(receiverAddress, fromAddress);
        const gasLimit = tx.gas && parseInt(tx.gas, 16).toString();
        const gasPrice = tx.gasPrice && parseInt(tx.gasPrice, 16).toString();
        const evmEncodeConfig = {
            data: tx.data,
            to: tx.to,
            value: tx.value,
            gas: gasLimit,
            gasPrice
        };
        const newToTokenAmountMin = token_utils_1.TokenUtils.getMinWeiAmountString(new bignumber_js_1.default(toAmount), this.slippageTolerance);
        this.checkAmountChange(evmEncodeConfig, newToTokenAmountMin, this.toTokenAmountMin.stringWeiAmount);
        return evmEncodeConfig;
    }
}
exports.AggregatorEvmOnChainTrade = AggregatorEvmOnChainTrade;
//# sourceMappingURL=aggregator-evm-on-chain-trade-abstract.js.map