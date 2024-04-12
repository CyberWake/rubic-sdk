import { EvmBlockchainName, SolanaBlockchainName, TronBlockchainName } from "../../blockchain/models/blockchain-name";
import { TronWebProvider } from "../../blockchain/web3-public-service/web3-public/tron-web3-public/models/tron-web-provider";
/**
 * Stores information about rpc in certain blockchain.
 */
export interface RpcProvider<T> {
    /**
     * Contains rpc links in order of prioritization.
     */
    readonly rpcList: T[];
}
export type RpcProviders = Partial<Record<EvmBlockchainName, RpcProvider<string>> & Record<TronBlockchainName, RpcProvider<TronWebProvider>> & Record<SolanaBlockchainName, RpcProvider<string>>>;
