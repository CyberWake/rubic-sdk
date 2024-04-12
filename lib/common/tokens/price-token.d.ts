import BigNumber from 'bignumber.js';
import { TokenBaseStruct } from "./models/token-base-struct";
import { Token, TokenStruct } from "./token";
import { BlockchainName } from "../../core/blockchain/models/blockchain-name";
export type PriceTokenStruct<T extends BlockchainName = BlockchainName> = TokenStruct<T> & {
    price: BigNumber;
};
/**
 * Contains token structure with price in usd per 1 unit.
 */
export declare class PriceToken<T extends BlockchainName = BlockchainName> extends Token<T> {
    /**
     * Creates PriceToken based on token's address and blockchain.
     * @param tokenBaseStruct Base token structure.
     */
    static createToken<T extends BlockchainName = BlockchainName>(tokenBaseStruct: TokenBaseStruct<T>): Promise<PriceToken<T>>;
    /**
     * Creates PriceToken, fetching token's price.
     * @param token Token structure.
     */
    static createFromToken<T extends BlockchainName = BlockchainName>(token: TokenStruct<T>): Promise<PriceToken<T>>;
    private _price;
    get price(): BigNumber;
    /**
     * Serializes priceToken and its price to struct object.
     */
    get asStruct(): PriceTokenStruct<T>;
    constructor(tokenStruct: PriceTokenStruct<T>);
    /**
     * Fetches current token price and saves it into token.
     */
    getAndUpdateTokenPrice(): Promise<BigNumber>;
    private updateTokenPrice;
    /**
     * Clones token with fetching new price.
     */
    cloneAndCreate(tokenStruct?: Partial<PriceTokenStruct>): Promise<PriceToken>;
    clone(tokenStruct?: Partial<PriceTokenStruct>): PriceToken;
}
