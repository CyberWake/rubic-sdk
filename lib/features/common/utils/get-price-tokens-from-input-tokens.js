"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPriceTokensFromInputTokens = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const tokens_1 = require("../../../common/tokens");
async function getPriceTokensFromInputTokens(from, fromAmount, to) {
    let fromPriceTokenPromise;
    if (from instanceof tokens_1.PriceToken) {
        fromPriceTokenPromise = new Promise(resolve => resolve(from));
    }
    else if (from instanceof tokens_1.Token) {
        fromPriceTokenPromise = tokens_1.PriceToken.createFromToken(from);
    }
    else {
        fromPriceTokenPromise = tokens_1.PriceToken.createToken(from);
    }
    let toPriceTokenPromise;
    if (to instanceof tokens_1.PriceToken) {
        toPriceTokenPromise = new Promise(resolve => resolve(to));
    }
    else if (to instanceof tokens_1.Token) {
        toPriceTokenPromise = tokens_1.PriceToken.createFromToken(to);
    }
    else if (typeof to === 'object') {
        toPriceTokenPromise = tokens_1.PriceToken.createToken(to);
    }
    else {
        toPriceTokenPromise = tokens_1.PriceToken.createToken({
            address: to,
            blockchain: from.blockchain
        });
    }
    const [fromPriceToken, toPriceToken] = await Promise.all([
        fromPriceTokenPromise,
        toPriceTokenPromise
    ]);
    const fromPriceTokenAmount = new tokens_1.PriceTokenAmount({
        ...fromPriceToken.asStruct,
        tokenAmount: new bignumber_js_1.default(fromAmount)
    });
    return {
        from: fromPriceTokenAmount,
        to: toPriceToken
    };
}
exports.getPriceTokensFromInputTokens = getPriceTokensFromInputTokens;
//# sourceMappingURL=get-price-tokens-from-input-tokens.js.map