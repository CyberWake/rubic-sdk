import { GetCrossChainTradeConstructorParamsType, RangoCrossChainTradeConstructorParams } from '../model/rango-cross-chain-parser-types';
export declare class RangoCrossChainParser {
    static getTradeConstructorParams({ feeInfo, fromToken, options, routePath, swapQueryParams, toToken, toTokenAmountMin, bridgeSubtype }: GetCrossChainTradeConstructorParamsType): Promise<RangoCrossChainTradeConstructorParams>;
}
