import { OdosBestRouteRequestBody } from '../models/odos-api-best-route-types';
import { GetBestRouteBodyType } from '../models/odos-on-chain-parser-types';
export declare class OdosOnChainParser {
    static getBestRouteBody({ from, toToken, options, swappersBlacklist, swappersWhitelist }: GetBestRouteBodyType): OdosBestRouteRequestBody;
}
