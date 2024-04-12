import BigNumber from 'bignumber.js';
import { TokenBaseStruct } from "./models/token-base-struct";
import { Token, TokenStruct } from "./token";
import { BlockchainName } from "../../core/blockchain/models/blockchain-name";
export type TokenAmountStruct<T extends BlockchainName = BlockchainName> = TokenStruct<T> & ({
    weiAmount: BigNumber;
} | {
    tokenAmount: BigNumber;
});
export type TokenAmountBaseStruct<T extends BlockchainName = BlockchainName> = TokenBaseStruct<T> & ({
    weiAmount: BigNumber;
} | {
    tokenAmount: BigNumber;
});
/**
 * Contains token structure with price and amount.
 */
export declare class TokenAmount<T extends BlockchainName = BlockchainName> extends Token<T> {
    /**
     * Creates PriceTokenAmount based on token's address and blockchain.
     * @param tokenAmountBaseStruct Base token structure with amount.
     */
    static createToken<T extends BlockchainName = BlockchainName>(tokenAmountBaseStruct: TokenAmountBaseStruct<T>): Promise<TokenAmount<T>>;
    private readonly _weiAmount;
    /**
     * Gets set amount in wei.
     */
    get weiAmount(): BigNumber;
    /**
     * Gets set amount in wei and converted to string.
     */
    get stringWeiAmount(): string;
    /**
     * Gets set amount with decimals.
     */
    get tokenAmount(): BigNumber;
    /**
     * Serializes priceTokenAmount to struct object.
     */
    get asStruct(): TokenAmountStruct<T>;
    constructor(tokenStruct: TokenAmountStruct<T>);
    /**
     * Returns wei amount decreased by (1 - slippage) times.
     * @param slippage Slippage in range from 0 to 1.
     */
    weiAmountMinusSlippage(slippage: number): BigNumber;
    /**
     * Returns wei amount increased by (1 - slippage) times.
     * @param slippage Slippage in range from 0 to 1.
     */
    weiAmountPlusSlippage(slippage: number): BigNumber;
    clone(tokenStruct?: Partial<TokenAmountStruct>): TokenAmount;
}
