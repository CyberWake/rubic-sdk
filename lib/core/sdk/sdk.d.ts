import { Web3PrivateService } from "../blockchain/web3-private-service/web3-private-service";
import { Web3PublicService } from "../blockchain/web3-public-service/web3-public-service";
import { CoingeckoApi } from "../coingecko-api/coingecko-api";
import { GasPriceApi } from "../gas-price-api/gas-price-api";
import { Configuration } from "./models/configuration";
import { WalletProvider, WalletProviderCore } from "./models/wallet-provider";
import { CrossChainManager } from "../../features/cross-chain/calculation-manager/cross-chain-manager";
import { CrossChainStatusManager } from "../../features/cross-chain/status-manager/cross-chain-status-manager";
import { CrossChainSymbiosisManager } from "../../features/cross-chain/symbiosis-manager/cross-chain-symbiosis-manager";
import { DeflationTokenManager } from "../../features/deflation-token-manager/deflation-token-manager";
import { LimitOrderManager } from "../../features/limit-order/limit-order-manager";
import { OnChainManager } from "../../features/on-chain/calculation-manager/on-chain-manager";
import { OnChainStatusManager } from "../../features/on-chain/status-manager/on-chain-status-manager";
/**
 * Base class to work with sdk.
 */
export declare class SDK {
    /**
     * On-chain manager object. Use it to calculate and create on-chain trades.
     */
    readonly onChainManager: OnChainManager;
    /**
     * Cross-chain trades manager object. Use it to calculate and create cross-chain trades.
     */
    readonly crossChainManager: CrossChainManager;
    /**
     * On-chain status manager object. Use it for special providers, which requires more than one trade.
     */
    readonly onChainStatusManager: OnChainStatusManager;
    /**
     * Cross-chain status manager object. Use it to get trade statuses on source and target network.
     */
    readonly crossChainStatusManager: CrossChainStatusManager;
    /**
     * Cross-chain symbiosis manager object. Use it to get pending trades in symbiosis and revert them.
     */
    readonly crossChainSymbiosisManager: CrossChainSymbiosisManager;
    /**
     * Deflation token manager object. Use it to check specific token for fees or deflation.
     */
    readonly deflationTokenManager: DeflationTokenManager;
    /**
     * Use it to create limit order.
     */
    readonly limitOrderManager: LimitOrderManager;
    /**
     * Can be used to get `Web3Public` instance by blockchain name to get public information from blockchain.
     */
    get web3PublicService(): Web3PublicService;
    /**
     * Can be used to send transactions and execute smart contracts methods.
     */
    get web3PrivateService(): Web3PrivateService;
    /**
     * Use it to get gas price information.
     */
    get gasPriceApi(): GasPriceApi;
    /**
     * Use it to get coingecko price information.
     */
    get coingeckoApi(): CoingeckoApi;
    /**
     * Creates new sdk instance. Changes dependencies of all sdk entities according
     * to new configuration (even for entities created with other previous sdk instances).
     */
    static createSDK(configuration: Configuration): Promise<SDK>;
    private static createWeb3PrivateService;
    private static createWeb3PublicService;
    private static createHttpClient;
    private constructor();
    /**
     * Updates sdk configuration and sdk entities dependencies.
     */
    updateConfiguration(configuration: Configuration): Promise<void>;
    updateWalletProvider(walletProvider: WalletProvider): void;
    updateWalletProviderCore(chainType: keyof WalletProvider, walletProviderCore: WalletProviderCore): void;
    updateWalletAddress(chainType: keyof WalletProvider, address: string): void;
}
