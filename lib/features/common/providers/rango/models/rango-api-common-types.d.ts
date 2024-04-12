import { RangoBlockchainName } from './rango-api-blockchain-names';
export interface RangoResponseToken {
    blockchain: RangoBlockchainName;
    chainId: string | null;
    address: string | null;
    symbol: string;
    name: string;
    decimals: number;
    image: string;
    blockchainImage: string;
    usdPrice: number | null;
    isPopular: boolean;
}
export declare const RangoRoutingResult: {
    readonly OK: "OK";
    readonly HIGH_IMPACT: "HIGH_IMPACT";
    readonly NO_ROUTE: "NO_ROUTE";
    readonly INPUT_LIMIT_ISSUE: "INPUT_LIMIT_ISSUE";
};
export interface HttpClientParams {
    [param: string]: string | number | boolean | readonly (string | number | boolean)[];
}
export type RangoSwapperType = 'BRIDGE' | 'DEX' | 'AGGREGATOR';
export type RangoExpenseType = 'FROM_SOURCE_WALLET' | 'DECREASE_FROM_OUTPUT' | 'FROM_DESTINATION_WALLET';
export type RangoAmountRestrictionType = 'INCLUSIVE' | 'EXCLUSIVE';
export type RangoRoutingResultType = (typeof RangoRoutingResult)[keyof typeof RangoRoutingResult];
