"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFromToTokensAmountsByExact = void 0;
const tokens_1 = require("../../../../../../../common/tokens");
function getFromToTokensAmountsByExact(fromToken, toToken, exact, initialWeiAmount, weiAmountWithoutFee, routeWeiAmount) {
    const fromAmount = exact === 'input' ? initialWeiAmount : routeWeiAmount;
    const toAmount = exact === 'output' ? initialWeiAmount : routeWeiAmount;
    const from = new tokens_1.PriceTokenAmount({
        ...fromToken.asStruct,
        weiAmount: fromAmount
    });
    const to = new tokens_1.PriceTokenAmount({
        ...toToken.asStruct,
        weiAmount: toAmount
    });
    const fromWithoutFee = new tokens_1.PriceTokenAmount({
        ...fromToken.asStruct,
        weiAmount: weiAmountWithoutFee
    });
    return { from, to, fromWithoutFee };
}
exports.getFromToTokensAmountsByExact = getFromToTokensAmountsByExact;
//# sourceMappingURL=get-from-to-tokens-amounts-by-exact.js.map