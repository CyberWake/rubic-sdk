import { EvmBlockchainName } from "../blockchain/models/blockchain-name";
import { HttpClient } from "../http-client/models/http-client";
import { GasPrice } from '../blockchain/web3-public-service/web3-public/evm-web3-public/models/gas-price';
/**
 * Uses different api or web3 to retrieve current gas price.
 */
export declare class GasPriceApi {
    private readonly httpClient;
    /**
     * Gas price request interval in seconds.
     */
    private static readonly requestInterval;
    constructor(httpClient: HttpClient);
    /**
     * Gets gas price in Wei for selected blockchain.
     * @param blockchain Blockchain to get gas price from.
     */
    getGasPrice(blockchain: EvmBlockchainName): Promise<GasPrice>;
    /**
     * Gets gas price in Eth units for selected blockchain.
     * @param blockchain Blockchain to get gas price from.
     */
    getGasPriceInEthUnits(blockchain: EvmBlockchainName): Promise<GasPrice>;
    /**
     * Gets Ethereum gas price from different APIs, sorted by priority.
     * @returns Average gas price in Wei.
     */
    private fetchEthGas;
    /**
     * Gets gas price from web3.
     * @returns Average gas price in Wei.
     */
    private fetchGas;
}
