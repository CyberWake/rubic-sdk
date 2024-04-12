"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Injector = void 0;
const coingecko_api_1 = require("../coingecko-api/coingecko-api");
const gas_price_api_1 = require("../gas-price-api/gas-price-api");
class Injector {
    static get web3PublicService() {
        return Injector.injector.web3PublicService;
    }
    static get web3PrivateService() {
        return Injector.injector.web3PrivateService;
    }
    static get httpClient() {
        return Injector.injector.httpClient;
    }
    static get coingeckoApi() {
        return Injector.injector.coingeckoApi;
    }
    static get gasPriceApi() {
        return Injector.injector.gasPriceApi;
    }
    static createInjector(web3PublicService, web3PrivateService, httpClient) {
        // eslint-disable-next-line no-new
        new Injector(web3PublicService, web3PrivateService, httpClient);
    }
    constructor(web3PublicService, web3PrivateService, httpClient) {
        this.web3PublicService = web3PublicService;
        this.web3PrivateService = web3PrivateService;
        this.httpClient = httpClient;
        this.coingeckoApi = new coingecko_api_1.CoingeckoApi(httpClient);
        this.gasPriceApi = new gas_price_api_1.GasPriceApi(httpClient);
        Injector.injector = this;
    }
}
exports.Injector = Injector;
//# sourceMappingURL=injector.js.map