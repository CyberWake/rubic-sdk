import { ChangenowStatusResponse } from "../../../../status-manager/models/changenow-api-response";
import { ChangenowCurrenciesResponse } from '../models/changenow-currencies-api';
import { ChangenowMinMapRangeRequestParams, ChangenowMinMaxRangeResponse } from '../models/changenow-minmax-range-api';
import { ChangenowQuoteRequestParams, ChangenowQuoteResponse } from '../models/changenow-quote-api';
import { ChangenowSwapRequestBody, ChangenowSwapResponse } from '../models/changenow-swap.api';
export declare class ChangeNowCrossChainApiService {
    static changenowApiEndpoint: string;
    static getSwapTx(body: ChangenowSwapRequestBody): Promise<ChangenowSwapResponse>;
    static getQuoteTx(params: ChangenowQuoteRequestParams): Promise<ChangenowQuoteResponse>;
    static getMinMaxRange(params: ChangenowMinMapRangeRequestParams): Promise<ChangenowMinMaxRangeResponse>;
    static getCurrencies(): Promise<ChangenowCurrenciesResponse>;
    static getTxStatus(changenowId: string): Promise<ChangenowStatusResponse>;
}
