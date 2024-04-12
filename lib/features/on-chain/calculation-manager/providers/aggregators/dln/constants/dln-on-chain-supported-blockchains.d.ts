import { EvmBlockchainName, SolanaBlockchainName } from "../../../../../../../core/blockchain/models/blockchain-name";
export declare const dlnOnChainSupportedBlockchains: readonly ["ETH", "BSC", "POLYGON", "ARBITRUM", "AVALANCHE", "LINEA", "OPTIMISM", "BASE", "SOLANA"];
export type DlnOnChainSupportedBlockchain = (typeof dlnOnChainSupportedBlockchains)[number];
export type DlnEvmOnChainSupportedBlockchain = (typeof dlnOnChainSupportedBlockchains)[number] & EvmBlockchainName;
export type DlnSolanaOnChainSupportedBlockchain = (typeof dlnOnChainSupportedBlockchains)[number] & SolanaBlockchainName;
