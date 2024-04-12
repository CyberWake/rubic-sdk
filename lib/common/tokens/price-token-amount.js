"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceTokenAmount = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const price_token_1 = require("./price-token");
const web3_pure_1 = require("../../core/blockchain/web3-pure/web3-pure");
const token_utils_1 = require("../utils/token-utils");
/**
 * Contains token structure with price and amount.
 */
class PriceTokenAmount extends price_token_1.PriceToken {
    /**
     * Creates PriceTokenAmount based on token's address and blockchain.
     * @param tokenAmountBaseStruct Base token structure with amount.
     */
    static async createToken(tokenAmountBaseStruct) {
        const token = await super.createToken(tokenAmountBaseStruct);
        return new PriceTokenAmount({
            ...tokenAmountBaseStruct,
            ...token.asStruct
        });
    }
    /**
     * Creates PriceTokenAmount, fetching token's price.
     * @param tokenAmount Token structure with amount.
     */
    static async createFromToken(tokenAmount) {
        const priceToken = await super.createFromToken(tokenAmount);
        return new PriceTokenAmount({
            ...tokenAmount,
            price: priceToken.price
        });
    }
    /**
     * Gets set amount in wei.
     */
    get weiAmount() {
        return this._weiAmount;
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
    get asStructWithAmount() {
        return {
            ...this,
            price: this.price,
            weiAmount: this.weiAmount
        };
    }
    constructor(tokenStruct) {
        super(tokenStruct);
        if ('weiAmount' in tokenStruct) {
            this._weiAmount = tokenStruct.weiAmount;
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
        return token_utils_1.TokenUtils.getMinWeiAmount(this._weiAmount, slippage);
    }
    /**
     * Returns wei amount increased by (1 - slippage) times.
     * @param slippage Slippage in range from 0 to 1.
     */
    weiAmountPlusSlippage(slippage) {
        return token_utils_1.TokenUtils.getMaxWeiAmount(this._weiAmount, slippage);
    }
    async cloneAndCreate(tokenStruct) {
        const priceToken = await price_token_1.PriceToken.prototype.cloneAndCreate.call(this, tokenStruct);
        return new PriceTokenAmount({
            ...priceToken.asStruct,
            weiAmount: this.weiAmount,
            ...tokenStruct
        });
    }
    clone(tokenStruct) {
        return new PriceTokenAmount({ ...this, ...tokenStruct });
    }
    /**
     * Calculates trade price impact percent if instance token is selling token, and parameter is buying token.
     * If selling usd amount is less than buying usd amount, returns 0.
     * @param toToken Token to buy.
     */
    calculatePriceImpactPercent(toToken) {
        if (!this.price?.isFinite() ||
            !toToken.price?.isFinite() ||
            !this.tokenAmount?.isFinite() ||
            !toToken.tokenAmount?.isFinite() ||
            !this.price?.gt(0) ||
            !toToken.price?.gt(0)) {
            return null;
        }
        const fromTokenCost = this.tokenAmount.multipliedBy(this.price);
        const toTokenCost = toToken.tokenAmount.multipliedBy(toToken.price);
        const impact = fromTokenCost
            .minus(toTokenCost)
            .dividedBy(fromTokenCost)
            .multipliedBy(100)
            .dp(2, bignumber_js_1.default.ROUND_HALF_UP)
            .toNumber();
        return impact > 0 ? impact : 0;
    }
}
exports.PriceTokenAmount = PriceTokenAmount;
//# sourceMappingURL=price-token-amount.js.map