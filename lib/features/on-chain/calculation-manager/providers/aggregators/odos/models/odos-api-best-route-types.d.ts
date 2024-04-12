import { Any } from "../../../../../../../common/utils/types";
export interface OdosBestRouteRequestBody {
    chainId: number;
    inputTokens: OdosInputTokenRequest[];
    outputTokens: OdosOutputTokenRequest[];
    userAddr: string;
    slippageLimitPercent: number;
    sourceBlacklist: string[];
    sourceWhitelist: string[];
    simple?: boolean;
    compact?: boolean;
    likeAsset?: boolean;
    disableRFQs?: boolean;
    referralCode?: number;
}
export interface OdosInputTokenRequest {
    tokenAddress: string;
    amount: string;
}
export interface OdosOutputTokenRequest {
    tokenAddress: string;
    proportion: number;
}
export interface OdosBestRouteResponse {
    pathId: string;
    inTokens: string[];
    outTokens: string[];
    /**
     * inAmounts/outAmounts - wei-amount (string)
     */
    inAmounts: string[];
    outAmounts: string[];
    /**
     * inValues/outValues - float number with comma between integer and decimals
     */
    inValues: number[];
    outValues: number[];
    netOutValue: number;
    priceImpact: number | null;
    percentDiff: number;
    partnerFeePercent: number;
    gasEstimate: number;
    gasEstimateValue: number;
    dataGasEstimate: string;
    gweiPerGas: number;
    deprecated: string | null;
    blockNumber: number;
    pathViz: Record<string, Any>;
    pathVizImage: string | null;
}
