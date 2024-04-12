import BigNumber from 'bignumber.js';
import { BlockchainName } from "../blockchain/models/blockchain-name";
import { HttpClient } from "../http-client/models/http-client";
/**
 * Works with coingecko api to get tokens prices in usd.
 */
export declare class CoingeckoApi {
    private readonly httpClient;
    private static isSupportedBlockchain;
    private readonly nativeCoinsCoingeckoIds;
    private readonly tokenBlockchainId;
    constructor(httpClient: HttpClient);
    /**
     * Gets price of native coin in usd from coingecko.
     * @param blockchain Supported by {@link supportedBlockchains} blockchain.
     */
    getNativeCoinPrice(blockchain: BlockchainName): Promise<BigNumber>;
    /**
     * Gets price of token in usd from coingecko.
     * @param token Token to get price for.
     */
    getErc20TokenPrice(token: {
        address: string;
        blockchain: BlockchainName;
    }): Promise<BigNumber>;
    /**
     * Gets price of common token or native coin in usd from coingecko.
     * @param token Token to get price for.
     */
    getTokenPrice(token: {
        address: string;
        blockchain: BlockchainName;
    }): Promise<BigNumber>;
}
