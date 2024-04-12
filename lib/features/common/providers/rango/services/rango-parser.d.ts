import { PriceToken, PriceTokenAmount } from "../../../../../common/tokens";
import { EvmBlockchainName } from "../../../../../core/blockchain/models/blockchain-name";
import { RangoBestRouteRequestOptions } from '../models/rango-api-best-route-types';
import { RangoSwapRequestOptions } from '../models/rango-api-swap-types';
import { RangoBestRouteQueryParams, RangoSwapQueryParams, RangoTxStatusQueryParams } from '../models/rango-parser-types';
export declare class RangoCommonParser {
    /**
     * @description Transform parameters to required view for rango-api
     */
    static getBestRouteQueryParams(from: PriceTokenAmount<EvmBlockchainName>, toToken: PriceToken<EvmBlockchainName>, options: RangoBestRouteRequestOptions): Promise<RangoBestRouteQueryParams>;
    static getSwapQueryParams(fromToken: PriceTokenAmount<EvmBlockchainName>, toToken: PriceToken<EvmBlockchainName>, options: RangoSwapRequestOptions): Promise<RangoSwapQueryParams>;
    static getTxStatusQueryParams(srcTxHash: string, requestId: string): RangoTxStatusQueryParams;
}
