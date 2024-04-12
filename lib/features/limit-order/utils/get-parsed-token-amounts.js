"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParsedTokenAmounts = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const tokens_1 = require("../../../common/tokens");
async function getParsedTokenAmounts(fromToken, toToken, fromAmount, toAmount) {
    const fromTokenAmount = await tokens_1.TokenAmount.createToken({
        ...fromToken,
        tokenAmount: new bignumber_js_1.default(fromAmount)
    });
    const toTokenParsed = typeof toToken === 'string'
        ? { address: toToken, blockchain: fromToken.blockchain }
        : toToken;
    const toTokenAmount = await tokens_1.TokenAmount.createToken({
        ...toTokenParsed,
        tokenAmount: new bignumber_js_1.default(toAmount)
    });
    return { fromTokenAmount, toTokenAmount };
}
exports.getParsedTokenAmounts = getParsedTokenAmounts;
//# sourceMappingURL=get-parsed-token-amounts.js.map