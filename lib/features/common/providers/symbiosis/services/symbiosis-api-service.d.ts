import { SymbiosisSwappingParams } from "../../../../cross-chain/calculation-manager/providers/symbiosis-provider/models/symbiosis-swapping-params";
import { SymbiosisTradeData } from "../../../../cross-chain/calculation-manager/providers/symbiosis-provider/models/symbiosis-trade-data";
import { SymbiosisSwapRequestBody, SymbiosisSwapResponse } from '../models/symbiosis-api-swap-types';
export declare class SymbiosisApiService {
    /**
     * New method for all kind of swaps
     */
    static getOnChainSwapTx(body: SymbiosisSwapRequestBody): Promise<SymbiosisSwapResponse>;
    /**
     * @description Old method only for cross-chain swaps
     * @param params Swap request body
     */
    static getCrossChainSwapTx(params: SymbiosisSwappingParams): Promise<SymbiosisTradeData>;
}
