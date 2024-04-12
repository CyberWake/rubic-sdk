import { Web3PrivateService } from "../blockchain/web3-private-service/web3-private-service";
import { Web3PublicService } from "../blockchain/web3-public-service/web3-public-service";
import { CoingeckoApi } from "../coingecko-api/coingecko-api";
import { GasPriceApi } from "../gas-price-api/gas-price-api";
import { HttpClient } from "../http-client/models/http-client";
export declare class Injector {
    private readonly web3PublicService;
    private readonly web3PrivateService;
    private readonly httpClient;
    private static injector;
    static get web3PublicService(): Web3PublicService;
    static get web3PrivateService(): Web3PrivateService;
    static get httpClient(): HttpClient;
    static get coingeckoApi(): CoingeckoApi;
    static get gasPriceApi(): GasPriceApi;
    static createInjector(web3PublicService: Web3PublicService, web3PrivateService: Web3PrivateService, httpClient: HttpClient): void;
    private readonly coingeckoApi;
    private readonly gasPriceApi;
    private constructor();
}
