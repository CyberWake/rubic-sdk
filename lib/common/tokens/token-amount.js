"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenAmount = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const token_1 = require("./token");
const web3_pure_1 = require("../../core/blockchain/web3-pure/web3-pure");
/**
 * Contains token structure with price and amount.
 */
class TokenAmount extends token_1.Token {
    /**
     * Creates PriceTokenAmount based on token's address and blockchain.
     * @param tokenAmountBaseStruct Base token structure with amount.
     */
    static async createToken(tokenAmountBaseStruct) {
        const token = await super.createToken(tokenAmountBaseStruct);
        return new TokenAmount({
            ...tokenAmountBaseStruct,
            ...token
        });
    }
    /**
     * Gets set amount in wei.
     */
    get weiAmount() {
        return new bignumber_js_1.default(this._weiAmount);
    }
    /**
     * Gets set amount in wei and converted to string.
     */
    get stringWeiAmount() {
        return this._weiAmount.toFixed(0);
    }
    /**
     * Gets set amount with decimals.
     */
    get tokenAmount() {
        return new bignumber_js_1.default(this._weiAmount).div(new bignumber_js_1.default(10).pow(this.decimals));
    }
    /**
     * Serializes priceTokenAmount to struct object.
     */
    get asStruct() {
        return {
            ...this,
            weiAmount: this.weiAmount
        };
    }
    constructor(tokenStruct) {
        super(tokenStruct);
        if ('weiAmount' in tokenStruct) {
            this._weiAmount = new bignumber_js_1.default(tokenStruct.weiAmount);
        }
        else {
            this._weiAmount = new bignumber_js_1.default(web3_pure_1.Web3Pure.toWei(tokenStruct.tokenAmount, tokenStruct.decimals));
        }
    }
    /**
     * Returns wei amount decreased by (1 - slippage) times.
     * @param slippage Slippage in range from 0 to 1.
     */
    weiAmountMinusSlippage(slippage) {
        return new bignumber_js_1.default(this._weiAmount).multipliedBy(new bignumber_js_1.default(1).minus(slippage));
    }
    /**
     * Returns wei amount increased by (1 - slippage) times.
     * @param slippage Slippage in range from 0 to 1.
     */
    weiAmountPlusSlippage(slippage) {
        return new bignumber_js_1.default(this._weiAmount).multipliedBy(new bignumber_js_1.default(1).plus(slippage));
    }
    clone(tokenStruct) {
        return new TokenAmount({ ...this.asStruct, ...tokenStruct });
    }
}
exports.TokenAmount = TokenAmount;
//# sourceMappingURL=token-amount.js.map