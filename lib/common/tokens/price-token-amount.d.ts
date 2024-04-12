import BigNumber from 'bignumber.js';
import { TokenBaseStruct } from "./models/token-base-struct";
import { PriceToken, PriceTokenStruct } from "./price-token";
import { TokenStruct } from "./token";
import { BlockchainName } from "../../core/blockchain/models/blockchain-name";
export type PriceTokenAmountStruct<T extends BlockchainName = BlockchainName> = PriceTokenStruct<T> & ({
    weiAmount: BigNumber;
} | {
    tokenAmount: BigNumber;
});
export type PriceTokenAmountBaseStruct<T extends BlockchainName = BlockchainName> = TokenBaseStruct<T> & ({
    weiAmount: BigNumber;
} | {
    tokenAmount: BigNumber;
});
/**
 * Contains token structure with price and amount.
 */
export declare class PriceTokenAmount<T extends BlockchainName = BlockchainName> extends PriceToken<T> {
    /**
     * Creates PriceTokenAmount based on token's address and blockchain.
     * @param tokenAmountBaseStruct Base token structure with amount.
     */
    static createToken<T extends BlockchainName = BlockchainName>(tokenAmountBaseStruct: PriceTokenAmountBaseStruct<T>): Promise<PriceTokenAmount<T>>;
    /**
     * Creates PriceTokenAmount, fetching token's price.
     * @param tokenAmount Token structure with amount.
     */
    static createFromToken<T extends BlockchainName = BlockchainName>(tokenAmount: TokenStruct<T> & ({
        weiAmount: BigNumber;
    } | {
        tokenAmount: BigNumber;
    })): Promise<PriceTokenAmount<T>>;
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
    get asStructWithAmount(): PriceTokenAmountStruct<T>;
    constructor(tokenStruct: PriceTokenAmountStruct<T>);
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
    cloneAndCreate(tokenStruct?: Partial<PriceTokenAmountStruct>): Promise<PriceTokenAmount>;
    clone(tokenStruct?: Partial<PriceTokenAmountStruct>): PriceTokenAmount;
    /**
     * Calculates trade price impact percent if instance token is selling token, and parameter is buying token.
     * If selling usd amount is less than buying usd amount, returns 0.
     * @param toToken Token to buy.
     */
    calculatePriceImpactPercent(toToken: PriceTokenAmount): number | null;
}
