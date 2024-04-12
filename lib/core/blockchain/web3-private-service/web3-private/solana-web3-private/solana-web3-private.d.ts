import { BlockchainName } from "../../../models/blockchain-name";
import { SolanaTransactionOptions } from "./models/solana-transaction-options";
import { Web3Private } from "../web3-private";
import { SolanaWeb3Pure } from "../../../web3-pure/typed-web3-pure/non-evm-web3-pure/solana-web3-pure";
import { SolanaWeb3 } from "../../../../sdk/models/solana-web3";
export declare class SolanaWeb3Private extends Web3Private {
    private readonly solanaWeb3;
    protected readonly Web3Pure: typeof SolanaWeb3Pure;
    getBlockchainName(): Promise<BlockchainName | undefined>;
    sendTransaction(options?: SolanaTransactionOptions): Promise<string>;
    constructor(solanaWeb3: SolanaWeb3);
}
