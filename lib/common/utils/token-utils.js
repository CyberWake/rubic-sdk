"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenUtils = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
class TokenUtils {
    static getMinWeiAmount(weiAmount, slippage) {
        return weiAmount.multipliedBy(new bignumber_js_1.default(1).minus(slippage));
    }
    static getMaxWeiAmount(weiAmount, slippage) {
        return weiAmount.multipliedBy(new bignumber_js_1.default(1).plus(slippage));
    }
    static getMinWeiAmountString(weiAmount, slippage) {
        return TokenUtils.getMinWeiAmount(weiAmount, slippage).toFixed(0);
    }
    static getMaxWeiAmountString(weiAmount, slippage) {
        return TokenUtils.getMaxWeiAmount(weiAmount, slippage).toFixed(0);
    }
}
exports.TokenUtils = TokenUtils;
//# sourceMappingURL=token-utils.js.map