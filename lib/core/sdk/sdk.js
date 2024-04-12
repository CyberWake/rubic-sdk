"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK = void 0;
const chain_type_1 = require("../blockchain/models/chain-type");
const web3_private_service_1 = require("../blockchain/web3-private-service/web3-private-service");
const web3_public_service_1 = require("../blockchain/web3-public-service/web3-public-service");
const tron_web3_pure_1 = require("../blockchain/web3-pure/typed-web3-pure/tron-web3-pure/tron-web3-pure");
const default_http_client_1 = require("../http-client/default-http-client");
const injector_1 = require("../injector/injector");
const cross_chain_manager_1 = require("../../features/cross-chain/calculation-manager/cross-chain-manager");
const cross_chain_status_manager_1 = require("../../features/cross-chain/status-manager/cross-chain-status-manager");
const cross_chain_symbiosis_manager_1 = require("../../features/cross-chain/symbiosis-manager/cross-chain-symbiosis-manager");
const deflation_token_manager_1 = require("../../features/deflation-token-manager/deflation-token-manager");
const limit_order_manager_1 = require("../../features/limit-order/limit-order-manager");
const on_chain_manager_1 = require("../../features/on-chain/calculation-manager/on-chain-manager");
const on_chain_status_manager_1 = require("../../features/on-chain/status-manager/on-chain-status-manager");
/**
 * Base class to work with sdk.
 */
class SDK {
    /**
     * Can be used to get `Web3Public` instance by blockchain name to get public information from blockchain.
     */
    get web3PublicService() {
        return injector_1.Injector.web3PublicService;
    }
    /**
     * Can be used to send transactions and execute smart contracts methods.
     */
    get web3PrivateService() {
        return injector_1.Injector.web3PrivateService;
    }
    /**
     * Use it to get gas price information.
     */
    get gasPriceApi() {
        return injector_1.Injector.gasPriceApi;
    }
    /**
     * Use it to get coingecko price information.
     */
    get coingeckoApi() {
        return injector_1.Injector.coingeckoApi;
    }
    /**
     * Creates new sdk instance. Changes dependencies of all sdk entities according
     * to new configuration (even for entities created with other previous sdk instances).
     */
    static async createSDK(configuration) {
        const [web3PublicService, web3PrivateService, httpClient] = await Promise.all([
            SDK.createWeb3PublicService(configuration),
            SDK.createWeb3PrivateService(configuration),
            SDK.createHttpClient(configuration)
        ]);
        injector_1.Injector.createInjector(web3PublicService, web3PrivateService, httpClient);
        const { providerAddress } = configuration;
        return new SDK({
            [chain_type_1.CHAIN_TYPE.EVM]: providerAddress?.[chain_type_1.CHAIN_TYPE.EVM] || undefined,
            [chain_type_1.CHAIN_TYPE.TRON]: providerAddress?.[chain_type_1.CHAIN_TYPE.TRON] || {
                crossChain: tron_web3_pure_1.TronWeb3Pure.EMPTY_ADDRESS,
                onChain: tron_web3_pure_1.TronWeb3Pure.EMPTY_ADDRESS
            }
        });
    }
    static createWeb3PrivateService(configuration) {
        return new web3_private_service_1.Web3PrivateService(configuration.walletProvider || {});
    }
    static createWeb3PublicService(configuration) {
        return new web3_public_service_1.Web3PublicService(configuration.rpcProviders);
    }
    static async createHttpClient(configuration) {
        if (!configuration.httpClient) {
            return default_http_client_1.DefaultHttpClient.getInstance();
        }
        return configuration.httpClient;
    }
    constructor(providerAddress) {
        this.onChainManager = new on_chain_manager_1.OnChainManager(providerAddress);
        this.crossChainManager = new cross_chain_manager_1.CrossChainManager(providerAddress);
        this.deflationTokenManager = new deflation_token_manager_1.DeflationTokenManager();
        this.onChainStatusManager = new on_chain_status_manager_1.OnChainStatusManager();
        this.crossChainStatusManager = new cross_chain_status_manager_1.CrossChainStatusManager();
        this.crossChainSymbiosisManager = new cross_chain_symbiosis_manager_1.CrossChainSymbiosisManager();
        this.limitOrderManager = new limit_order_manager_1.LimitOrderManager();
    }
    /**
     * Updates sdk configuration and sdk entities dependencies.
     */
    async updateConfiguration(configuration) {
        const [web3PublicService, web3PrivateService, httpClient] = await Promise.all([
            SDK.createWeb3PublicService(configuration),
            SDK.createWeb3PrivateService(configuration),
            SDK.createHttpClient(configuration)
        ]);
        injector_1.Injector.createInjector(web3PublicService, web3PrivateService, httpClient);
    }
    updateWalletProvider(walletProvider) {
        injector_1.Injector.web3PrivateService.updateWeb3PrivateStorage(walletProvider);
    }
    updateWalletProviderCore(chainType, walletProviderCore) {
        injector_1.Injector.web3PrivateService.updateWeb3Private(chainType, walletProviderCore);
    }
    updateWalletAddress(chainType, address) {
        injector_1.Injector.web3PrivateService.updateWeb3PrivateAddress(chainType, address);
    }
}
exports.SDK = SDK;
//# sourceMappingURL=sdk.js.map