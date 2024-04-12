"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceToken = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const token_1 = require("./token");
const injector_1 = require("../../core/injector/injector");
/**
 * Contains token structure with price in usd per 1 unit.
 */
class PriceToken extends token_1.Token {
    /**
     * Creates PriceToken based on token's address and blockchain.
     * @param tokenBaseStruct Base token structure.
     */
    static async createToken(tokenBaseStruct) {
        const { coingeckoApi } = injector_1.Injector;
        const tokenPromise = super.createToken(tokenBaseStruct);
        const pricePromise = coingeckoApi
            .getTokenPrice(tokenBaseStruct)
            .catch(_err => new bignumber_js_1.default(NaN));
        const results = await Promise.all([tokenPromise, pricePromise]);
        return new PriceToken({ ...results[0], price: results[1] });
    }
    /**
     * Creates PriceToken, fetching token's price.
     * @param token Token structure.
     */
    static async createFromToken(token) {
        const { coingeckoApi } = injector_1.Injector;
        const price = await coingeckoApi.getTokenPrice(token).catch(_err => new bignumber_js_1.default(NaN));
        return new PriceToken({ ...token, price });
    }
    get price() {
        return this._price;
    }
    /**
     * Serializes priceToken and its price to struct object.
     */
    get asStruct() {
        return {
            ...this,
            price: this.price
        };
    }
    constructor(tokenStruct) {
        super(tokenStruct);
        this._price = tokenStruct.price;
    }
    /**
     * Fetches current token price and saves it into token.
     */
    async getAndUpdateTokenPrice() {
        await this.updateTokenPrice();
        return this.price;
    }
    async updateTokenPrice() {
        const { coingeckoApi } = injector_1.Injector;
        this._price = await coingeckoApi.getTokenPrice({ ...this }).catch(_err => this._price);
    }
    /**
     * Clones token with fetching new price.
     */
    async cloneAndCreate(tokenStruct) {
        const { coingeckoApi } = injector_1.Injector;
        const price = await coingeckoApi.getTokenPrice(this).catch(_err => this._price);
        return new PriceToken({ ...this.asStruct, price, ...tokenStruct });
    }
    clone(tokenStruct) {
        return new PriceToken({ ...this, ...tokenStruct });
    }
}
exports.PriceToken = PriceToken;
//# sourceMappingURL=price-token.js.map