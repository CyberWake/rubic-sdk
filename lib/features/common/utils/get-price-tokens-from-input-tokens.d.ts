import BigNumber from 'bignumber.js';
import { PriceToken, PriceTokenAmount, Token } from "../../../common/tokens";
import { BlockchainName } from "../../../core/blockchain/models/blockchain-name";
export declare function getPriceTokensFromInputTokens<T extends BlockchainName = BlockchainName>(from: Token<T> | {
    address: string;
    blockchain: T;
} | PriceToken<T>, fromAmount: string | number | BigNumber, to: Token<T> | string | {
    address: string;
    blockchain: T;
} | PriceToken<T>): Promise<{
    from: PriceTokenAmount<T>;
    to: PriceToken<T>;
}>;
