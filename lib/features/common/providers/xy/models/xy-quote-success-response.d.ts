export interface XyQuoteSuccessResponse {
    success: boolean;
    routes: XyRoute[];
}
interface QuoteToken {
    chainId: number;
    address: string;
    decimals: number;
    symbol: string;
}
interface QuoteBridgeDescription {
    provider: string;
    srcChainId: number;
    srcBridgeTokenAddress: string;
    dstChainId: number;
    dstBridgeTokenAddress: string;
    srcBridgeTokenAmount: string;
    dstBridgeTokenAmount: string;
    bridgeContractAddress: string;
    bridgeFeeAmount: string;
    bridgeFeeToken: QuoteToken;
    srcBridgeToken: QuoteToken;
    dstBridgeToken: QuoteToken;
}
interface QuoteSwapDescription {
    chainId: string;
    provider: string;
    srcTokenAddress: string;
    dstTokenAddress: string;
    srcTokenAmount: string;
    dstTokenAmount: string;
    dexNames: string[];
}
export interface XyQuote {
    srcSwapDescription: QuoteSwapDescription;
    bridgeDescription: QuoteBridgeDescription;
    dstSwapDescription: QuoteSwapDescription;
    dstQuoteTokenAmount: string;
}
export interface XyRoute extends XyQuote {
    srcChainId: number;
    srcQuoteTokenAddress: string;
    srcQuoteTokenAmount: string;
    dstChainId: number;
    dstQuoteTokenAddress: string;
    slippage: number;
    minReceiveAmount: string;
    affiliateFeeAmount: string;
    withholdingFeeAmount: string;
    routeType: string;
    tags: [];
    contractAddress: string;
    withholdingFeeToken: QuoteToken;
    srcQuoteToken: QuoteToken;
    dstQuoteToken: QuoteToken;
    srcQuoteTokenUsdValue: string;
    dstQuoteTokenUsdValue: string;
    transactionCounts: number;
    estimatedGas: string;
    estimatedTransferTime: number;
}
export {};
