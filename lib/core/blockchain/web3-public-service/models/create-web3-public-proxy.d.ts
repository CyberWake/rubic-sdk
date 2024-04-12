import { Any } from "../../../../common/utils/types";
import { EvmBlockchainName, SolanaBlockchainName, TronBlockchainName } from "../../models/blockchain-name";
import { Web3PublicSupportedBlockchain } from "./web3-public-storage";
import { EvmWeb3Public } from "../web3-public/evm-web3-public/evm-web3-public";
import { SolanaWeb3Public } from "../web3-public/solana-web3-public/solana-web3-public";
import { TronWeb3Public } from "../web3-public/tron-web3-public/tron-web3-public";
import { Web3Public } from "../web3-public/web3-public";
export type CreateWeb3Public = Record<Web3PublicSupportedBlockchain, (blockchainName?: Any) => Web3Public> & Record<EvmBlockchainName, (blockchainName: EvmBlockchainName) => EvmWeb3Public> & Record<TronBlockchainName, () => TronWeb3Public> & Record<SolanaBlockchainName, () => SolanaWeb3Public>;
