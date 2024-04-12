import { BlockchainName } from "../../models/blockchain-name";
import { Web3Private } from "./web3-private";
import { TypedWeb3Pure } from "../../web3-pure/typed-web3-pure/typed-web3-pure";
export declare class EmptyWeb3Private extends Web3Private {
    protected readonly Web3Pure: TypedWeb3Pure;
    constructor();
    getBlockchainName(): Promise<BlockchainName | undefined>;
}
