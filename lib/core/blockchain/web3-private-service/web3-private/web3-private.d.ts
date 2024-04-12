import BigNumber from 'bignumber.js';
import { BlockchainName } from "../../models/blockchain-name";
import { TypedWeb3Pure } from "../../web3-pure/typed-web3-pure/typed-web3-pure";
/**
 * Class containing methods for executing the functions of contracts
 * and sending transactions in order to change the state of the blockchain.
 * To get information from the blockchain use {@link Web3Public}.
 */
export declare abstract class Web3Private {
    address: string;
    /**
     * Converts number, string or BigNumber value to integer string.
     * @param amount Value to convert.
     * @param multiplier Amount multiplier.
     */
    static stringifyAmount(amount: number | string | BigNumber, multiplier?: number): string;
    protected abstract readonly Web3Pure: TypedWeb3Pure;
    /**
     * @param address Current wallet provider address.
     */
    protected constructor(address: string);
    setAddress(address: string): void;
    protected checkAddressCorrect(): void;
    /**
     * Gets currently selected blockchain in wallet.
     */
    abstract getBlockchainName(): Promise<BlockchainName | undefined>;
    /**
     * Checks, that selected blockchain in wallet is equal to passed blockchain.
     */
    checkBlockchainCorrect(blockchainName: BlockchainName): Promise<void | never>;
}
