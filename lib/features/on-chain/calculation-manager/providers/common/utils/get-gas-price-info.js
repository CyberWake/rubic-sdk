"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGasPriceInfo = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const web3_pure_1 = require("../../../../../../core/blockchain/web3-pure/web3-pure");
const injector_1 = require("../../../../../../core/injector/injector");
async function getGasPriceInfo(blockchain) {
    const [{ gasPrice, maxFeePerGas }, nativeCoinPrice] = await Promise.all([
        injector_1.Injector.gasPriceApi.getGasPrice(blockchain),
        injector_1.Injector.coingeckoApi.getNativeCoinPrice(blockchain).catch(() => new bignumber_js_1.default(0))
    ]);
    const gasPriceInEth = web3_pure_1.Web3Pure.fromWei(maxFeePerGas || gasPrice || 0);
    const gasPriceInUsd = gasPriceInEth.multipliedBy(nativeCoinPrice);
    return {
        gasPrice: web3_pure_1.Web3Pure.fromWei(gasPrice || 0),
        gasPriceInEth,
        gasPriceInUsd,
        maxFeePerGas: web3_pure_1.Web3Pure.fromWei(maxFeePerGas || 0)
    };
}
exports.getGasPriceInfo = getGasPriceInfo;
//# sourceMappingURL=get-gas-price-info.js.map