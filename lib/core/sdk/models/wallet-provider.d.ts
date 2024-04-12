import { Any } from "../../../common/utils/types";
import { TronWeb } from "../../blockchain/constants/tron/tron-web";
import { CHAIN_TYPE } from "../../blockchain/models/chain-type";
import { SolanaWeb3 } from "./solana-web3";
import Web3 from 'web3';
import { provider } from 'web3-core';
export interface WalletProviderCore<T = Any> {
    /**
     * Core provider.
     */
    readonly core: T;
    /**
     * User wallet address.
     */
    readonly address: string;
}
export type EvmWalletProviderCore = WalletProviderCore<provider | Web3>;
export type TronWalletProviderCore = WalletProviderCore<typeof TronWeb>;
export type SolanaWalletProviderCore = WalletProviderCore<SolanaWeb3>;
/**
 * Stores wallet core and information about current user, used to make `send` transactions.
 */
interface IWalletProvider {
    readonly [CHAIN_TYPE.EVM]?: EvmWalletProviderCore;
    readonly [CHAIN_TYPE.TRON]?: TronWalletProviderCore;
    readonly [CHAIN_TYPE.SOLANA]?: SolanaWalletProviderCore;
}
export type WalletProvider = Partial<IWalletProvider>;
export {};
