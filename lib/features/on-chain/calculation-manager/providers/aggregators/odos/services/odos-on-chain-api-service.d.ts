import { OdosBestRouteRequestBody, OdosBestRouteResponse } from '../models/odos-api-best-route-types';
import { OdosSwapRequestBody, OdosSwapResponse } from '../models/odos-api-swap-types';
export declare class OdosOnChainApiService {
    static getBestRoute(body: OdosBestRouteRequestBody): Promise<OdosBestRouteResponse>;
    static getSwapTx(body: OdosSwapRequestBody): Promise<OdosSwapResponse>;
}
