import { EstimationRequest } from "../../../cross-chain/calculation-manager/providers/debridge-provider/models/estimation-request";
import { TransactionRequest } from "../../../cross-chain/calculation-manager/providers/debridge-provider/models/transaction-request";
import { DeBridgeFilteredListApiResponse, DeBridgeOrderApiResponse, DeBridgeOrderApiStatusResponse } from "../../../cross-chain/status-manager/models/statuses-api";
import { DlnOnChainEstimateRequest } from "../../../on-chain/calculation-manager/providers/aggregators/dln/models/dln-on-chain-estimate-request";
import { DlnOnChainEstimateResponse } from "../../../on-chain/calculation-manager/providers/aggregators/dln/models/dln-on-chain-estimate-response";
import { DlnOnChainSwapRequest } from "../../../on-chain/calculation-manager/providers/aggregators/dln/models/dln-on-chain-swap-request";
import { DlnOnChainSwapResponse } from "../../../on-chain/calculation-manager/providers/aggregators/dln/models/dln-on-chain-swap-response";
export declare class DlnApiService {
    static apiEndpoint: string;
    static fetchCrossChainQuote<T>(requestParams: EstimationRequest): Promise<T>;
    static fetchCrossChainSwapData<T>(requestParams: TransactionRequest): Promise<T>;
    static fetchOnChainQuote(requestParams: DlnOnChainEstimateRequest): Promise<DlnOnChainEstimateResponse>;
    static fetchOnChainSwapData<T>(requestParams: DlnOnChainSwapRequest): Promise<DlnOnChainSwapResponse<T>>;
    static fetchCrossChainEventMetaData(orderId: string): Promise<DeBridgeOrderApiResponse>;
    static fetchCrossChainStatus(orderId: string): Promise<DeBridgeOrderApiStatusResponse>;
    static fetchCrossChainOrdersByHash(sourceTransactionHash: string): Promise<DeBridgeFilteredListApiResponse>;
}
