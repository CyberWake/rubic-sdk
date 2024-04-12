import { RangoBestRouteResponse } from "../../../../../common/providers/rango/models/rango-api-best-route-types";
import { RangoTxStatusResponse } from "../../../../../common/providers/rango/models/rango-api-status-types";
import { RangoSwapTransactionResponse } from "../../../../../common/providers/rango/models/rango-api-swap-types";
import { RangoBestRouteQueryParams, RangoSwapQueryParams, RangoTxStatusQueryParams } from "../../../../../common/providers/rango/models/rango-parser-types";
export declare class RangoCrossChainApiService {
    static getBestRoute(params: RangoBestRouteQueryParams): Promise<RangoBestRouteResponse>;
    static getSwapTransaction(params: RangoSwapQueryParams): Promise<RangoSwapTransactionResponse>;
    /**
     * @description Get transaction status data
     */
    static getTxStatus(params: RangoTxStatusQueryParams): Promise<RangoTxStatusResponse>;
}
