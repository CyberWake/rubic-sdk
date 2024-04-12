import { TxStatusData } from "../../common/status-manager/models/tx-status-data";
import { CrossChainTradeType } from "../calculation-manager/models/cross-chain-trade-type";
import { CrossChainStatus } from "./models/cross-chain-status";
import { CrossChainTradeData } from "./models/cross-chain-trade-data";
/**
 * Contains methods for getting cross-chain trade statuses.
 */
export declare class CrossChainStatusManager {
    private readonly httpClient;
    private readonly getDstTxStatusFnMap;
    /**
     * Returns cross-chain trade statuses on the source and target networks.
     * The result consists of statuses of the source and target transactions and destination tx hash.
     * @example
     * ```ts
     * const tradeData = {
     *   fromBlockchain: BLOCKCHAIN_NAME.FANTOM,
     *   toBlockchain: BLOCKCHAIN_NAME.BSC,
     *   txTimestamp: 1658241570024,
     *   srxTxHash: '0xd2263ca82ac0fce606cb75df27d7f0dc94909d41a58c37563bd6772496cb8924'
     * };
     * const tradeType = CROSS_CHAIN_TRADE_TYPE.VIA;
     * const crossChainStatus = await sdk.crossChainStatusManager.getCrossChainStatus(tradeData, tradeType);
     * console.log('Source transaction status', crossChainStatus.srcTxStatus);
     * console.log('Destination transaction status', crossChainStatus.dstTxStatus);
     * console.log('Destination transaction hash', crossChainStatus.dstTxHash);
     * ```
     * @param data Data needed to calculate statuses.
     * @param tradeType Cross-chain trade type.
     * @returns Object with transaction statuses and hash.
     */
    getCrossChainStatus(data: CrossChainTradeData, tradeType: CrossChainTradeType): Promise<CrossChainStatus>;
    /**
     * Get destination transaction status and hash based on source transaction status,
     * source transaction receipt, trade data and type.
     * @param srcTxStatus Source transaction status.
     * @param tradeData Trade data.
     * @param tradeType Cross-chain trade type.
     * @returns Cross-chain transaction status and hash.
     */
    private getDstTxData;
    /**
     * Get Stargate trade dst transaction status and hash.
     * @param data Trade data.
     * @returns Cross-chain transaction status and hash.
     */
    private getLayerZeroDstSwapStatus;
    /**
     * Get Symbiosis trade dst transaction status and hash.
     * @param data Trade data.
     * @returns Cross-chain transaction status and hash.
     */
    private getSymbiosisDstSwapStatus;
    /**
     * Get Li-fi trade dst transaction status and hash.
     * @param data Trade data.
     * @returns Cross-chain transaction status and hash.
     */
    private getLifiDstSwapStatus;
    /**
     * Get DeBridge trade dst transaction status.
     * @param data Trade data.
     * @returns Cross-chain transaction status and hash.
     */
    private getDebridgeDstSwapStatus;
    /**
     * Get Bridgers trade dst transaction status.
     * @param data Trade data.
     * @returns Cross-chain transaction status.
     */
    private getBridgersDstSwapStatus;
    /**
     * @internal
     * Get transaction status in bitcoin network;
     * @param hash Bitcoin transaction hash.
     */
    private getBitcoinStatus;
    private getMultichainDstSwapStatus;
    private getXyDstSwapStatus;
    private getCelerBridgeDstSwapStatus;
    private getChangenowDstSwapStatus;
    getArbitrumBridgeDstSwapStatus(data: CrossChainTradeData): Promise<TxStatusData>;
    private getSquidrouterDstSwapStatus;
    getScrollBridgeDstSwapStatus(data: CrossChainTradeData): Promise<TxStatusData>;
    getTaikoBridgeDstSwapStatus(data: CrossChainTradeData): Promise<TxStatusData>;
    getPulseChainDstSwapStatus(data: CrossChainTradeData): Promise<TxStatusData>;
    private getRangoDstSwapStatus;
    private getOrbiterDstSwapStatus;
}
