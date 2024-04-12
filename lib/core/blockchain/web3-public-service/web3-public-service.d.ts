import { BlockchainName, EvmBlockchainName, SolanaBlockchainName, TronBlockchainName } from "../models/blockchain-name";
import { Web3PublicSupportedBlockchain } from "./models/web3-public-storage";
import { EvmWeb3Public } from "./web3-public/evm-web3-public/evm-web3-public";
import { SolanaWeb3Public } from "./web3-public/solana-web3-public/solana-web3-public";
import { TronWeb3Public } from "./web3-public/tron-web3-public/tron-web3-public";
import { Web3Public } from "./web3-public/web3-public";
import { RpcProviders } from "../../sdk/models/rpc-provider";
export declare class Web3PublicService {
    readonly rpcProvider: RpcProviders;
    static isSupportedBlockchain(blockchain: BlockchainName): blockchain is Web3PublicSupportedBlockchain;
    private static readonly mainRpcDefaultTimeout;
    private readonly web3PublicStorage;
    private readonly createWeb3Public;
    constructor(rpcProvider: RpcProviders);
    getWeb3Public(blockchainName: EvmBlockchainName): EvmWeb3Public;
    getWeb3Public(blockchainName: TronBlockchainName): TronWeb3Public;
    getWeb3Public(blockchainName: SolanaBlockchainName): SolanaWeb3Public;
    getWeb3Public(blockchainName: Web3PublicSupportedBlockchain): Web3Public;
    getWeb3Public(blockchainName: BlockchainName): never;
    private setCreateWeb3Public;
    private createWeb3PublicStorage;
    private createEvmWeb3PublicProxy;
    private createTronWeb3PublicProxy;
    private createSolanaWeb3PublicProxy;
    private createWeb3PublicProxy;
}
