import { BitcoinBlockchainName, BlockchainName, EvmBlockchainName, SolanaBlockchainName, TestnetEvmBlockchain, TronBlockchainName } from "../../models/blockchain-name";
import { ChainType } from "../../models/chain-type";
/**
 * Works with list of all used in project blockchains.
 * Contains method to find info about certain blockchain.
 */
export declare class BlockchainsInfo {
    /**
     * Finds blockchain name, based on provided chain id.
     */
    static getBlockchainNameById(chainId: string | number): BlockchainName | undefined;
    static getChainType(blockchainName: BlockchainName): ChainType;
    static isBlockchainName(chain: string): chain is BlockchainName;
    static isEvmBlockchainName(blockchainName: BlockchainName): blockchainName is EvmBlockchainName;
    static isTestBlockchainName(blockchainName: BlockchainName): blockchainName is TestnetEvmBlockchain;
    static isBitcoinBlockchainName(blockchainName: BlockchainName): blockchainName is BitcoinBlockchainName;
    static isTronBlockchainName(blockchainName: BlockchainName): blockchainName is TronBlockchainName;
    static isSolanaBlockchainName(blockchainName: BlockchainName): blockchainName is SolanaBlockchainName;
}
