"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregatorSolanaOnChainTrade = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const token_utils_1 = require("../../../../../../common/utils/token-utils");
const solana_on_chain_trade_1 = require("../on-chain-trade/solana-on-chain-trade/solana-on-chain-trade");
class AggregatorSolanaOnChainTrade extends solana_on_chain_trade_1.SolanaOnChainTrade {
    async getTxConfigAndCheckAmount(receiverAddress, fromAddress, directTransaction) {
        if (directTransaction) {
            return directTransaction;
        }
        const { tx, toAmount } = await this.getToAmountAndTxData(receiverAddress, fromAddress);
        const evmEncodeConfig = {
            data: tx.data,
            to: '',
            value: ''
        };
        const newToTokenAmountMin = token_utils_1.TokenUtils.getMinWeiAmountString(new bignumber_js_1.default(toAmount), this.slippageTolerance);
        this.checkAmountChange(evmEncodeConfig, newToTokenAmountMin, this.toTokenAmountMin.stringWeiAmount);
        return evmEncodeConfig;
    }
}
exports.AggregatorSolanaOnChainTrade = AggregatorSolanaOnChainTrade;
//# sourceMappingURL=aggregator-solana-on-chain-trade-abstract.js.map