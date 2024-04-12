import { TokenBaseStruct } from "./models/token-base-struct";
import { BlockchainName } from "../../core/blockchain/models/blockchain-name";
export type TokenStruct<T extends BlockchainName = BlockchainName> = {
    blockchain: T;
    address: string;
    name: string;
    symbol: string;
    decimals: number;
};
/**
 * Contains main token's fields.
 */
export declare class Token<T extends BlockchainName = BlockchainName> {
    /**
     * Creates Token based on token's address and blockchain.
     * @param tokenBaseStruct Base token structure.
     */
    static createToken<T extends BlockchainName = BlockchainName>(tokenBaseStruct: TokenBaseStruct<T>): Promise<Token<T>>;
    /**
     * Creates array of Tokens based on tokens' addresses and blockchain.
     */
    static createTokens<T extends BlockchainName = BlockchainName>(tokensAddresses: string[] | ReadonlyArray<string>, blockchain: T): Promise<Token<T>[]>;
    /**
     * Maps provided tokens to their addresses.
     */
    static tokensToAddresses(tokens: Token[]): string[];
    readonly blockchain: T;
    readonly address: string;
    readonly name: string;
    readonly symbol: string;
    readonly decimals: number;
    get isNative(): boolean;
    get isWrapped(): boolean;
    constructor(tokenStruct: TokenStruct<T>);
    isEqualTo(token: TokenBaseStruct): boolean;
    isEqualToTokens(tokens: TokenBaseStruct[]): boolean;
    clone(tokenStruct?: Partial<TokenStruct>): Token;
}
