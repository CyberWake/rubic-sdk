import { CHAIN_TYPE } from "../../models/chain-type";
import { Web3PrivateSupportedChainType } from "./web-private-supported-chain-type";
import { EvmWeb3Private } from "../web3-private/evm-web3-private/evm-web3-private";
import { SolanaWeb3Private } from "../web3-private/solana-web3-private/solana-web3-private";
import { TronWeb3Private } from "../web3-private/tron-web3-private/tron-web3-private";
import { Web3Private } from "../web3-private/web3-private";
export type Web3PrivateStorage = Record<Web3PrivateSupportedChainType, Web3Private | undefined> & {
    [CHAIN_TYPE.EVM]: EvmWeb3Private | undefined;
    [CHAIN_TYPE.TRON]: TronWeb3Private | undefined;
    [CHAIN_TYPE.SOLANA]: SolanaWeb3Private | undefined;
};
