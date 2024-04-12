import { EvmBlockchainName, SolanaBlockchainName, TronBlockchainName } from "../../models/blockchain-name";
import { EvmWeb3Public } from "../web3-public/evm-web3-public/evm-web3-public";
import { SolanaWeb3Public } from "../web3-public/solana-web3-public/solana-web3-public";
import { TronWeb3Public } from "../web3-public/tron-web3-public/tron-web3-public";
export declare const web3PublicSupportedBlockchains: readonly [...("MUMBAI" | "BSCT" | "GOERLI" | "FUJI" | "SCROLL_SEPOLIA" | "ARTHERA" | "TAIKO" | "SEPOLIA" | "BERACHAIN" | "BLAST_TESTNET" | "HOLESKY" | "ETH" | "BSC" | "POLYGON" | "POLYGON_ZKEVM" | "AVALANCHE" | "MOONRIVER" | "FANTOM" | "HARMONY" | "ARBITRUM" | "AURORA" | "TELOS" | "OPTIMISM" | "CRONOS" | "OKX" | "GNOSIS" | "FUSE" | "MOONBEAM" | "CELO" | "BOBA" | "BOBA_BSC" | "ASTAR_EVM" | "ETHW" | "KAVA" | "BITGERT" | "OASIS" | "METIS" | "DEFIKINGDOMS" | "KLAYTN" | "VELAS" | "STARKNET" | "SYSCOIN" | "ETHEREUM_CLASSIC" | "FLARE" | "IOTEX" | "THETA" | "BITCOIN_CASH" | "ZK_SYNC" | "PULSECHAIN" | "LINEA" | "BASE" | "MANTLE" | "MANTA_PACIFIC" | "SCROLL" | "ZETACHAIN" | "BLAST")[], "TRON", "SOLANA"];
export type Web3PublicSupportedBlockchain = (typeof web3PublicSupportedBlockchains)[number];
export type Web3PublicStorage = Record<EvmBlockchainName, EvmWeb3Public> & Record<TronBlockchainName, TronWeb3Public> & Record<SolanaBlockchainName, SolanaWeb3Public>;
