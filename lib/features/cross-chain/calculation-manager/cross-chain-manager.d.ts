import BigNumber from 'bignumber.js';
import { Observable } from 'rxjs';
import { PriceToken, Token } from "../../../common/tokens";
import { BlockchainName } from "../../../core/blockchain/models/blockchain-name";
import { ProviderAddress } from "../../../core/sdk/models/provider-address";
import { CrossChainManagerCalculationOptions } from "./models/cross-chain-manager-options";
import { CrossChainReactivelyCalculatedTradeData } from "./models/cross-chain-reactively-calculated-trade-data";
import { CrossChainTypedTradeProviders } from "./models/cross-chain-typed-trade-provider";
import { WrappedCrossChainTrade } from "./providers/common/models/wrapped-cross-chain-trade";
/**
 * Contains method to calculate best cross-chain trade.
 */
export declare class CrossChainManager {
    private readonly providerAddress;
    readonly tradeProviders: CrossChainTypedTradeProviders;
    constructor(providerAddress: ProviderAddress);
    /**
     * Calculates cross-chain trades and sorts them by exchange courses.
     * Wrapped trade object may contain error, but sometimes course can be
     * calculated even with thrown error (e.g. min/max amount error).
     *
     * @example
     * ```ts
     * const fromBlockchain = BLOCKCHAIN_NAME.ETHEREUM;
     * // ETH
     * const fromTokenAddress = '0x0000000000000000000000000000000000000000';
     * const fromAmount = 1;
     * const toBlockchain = BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN;
     * // BUSD
     * const toTokenAddress = '0xe9e7cea3dedca5984780bafc599bd69add087d56';
     *
     * const wrappedTrades = await sdk.crossChainManager.calculateTrade(
     *     { blockchain: fromBlockchain, address: fromTokenAddress },
     *     fromAmount,
     *     { blockchain: toBlockchain, address: toTokenAddress }
     * );
     * const bestTrade = wrappedTrades[0];
     *
     * wrappedTrades.forEach(wrappedTrade => {
     *    if (wrappedTrade.trade) {
     *        console.log(wrappedTrade.tradeType, `to amount: ${wrappedTrade.trade.to.tokenAmount.toFormat(3)}`));
     *    }
     *    if (wrappedTrade.error) {
     *        console.error(wrappedTrade.tradeType, 'error: wrappedTrade.error');
     *    }
     * });
     *
     * ```
     *
     * @param fromToken Token to sell.
     * @param fromAmount Amount to sell.
     * @param toToken Token to get.
     * @param options Additional options.
     * @returns Array of sorted wrapped cross-chain trades with possible errors.
     */
    calculateTrade(fromToken: Token | {
        address: string;
        blockchain: BlockchainName;
    } | PriceToken, fromAmount: string | number | BigNumber, toToken: Token | {
        address: string;
        blockchain: BlockchainName;
    } | PriceToken, options?: CrossChainManagerCalculationOptions): Promise<WrappedCrossChainTrade[]>;
    /**
     * Calculates cross-chain trades reactively in sequence.
     * Contains wrapped trade object which may contain error, but sometimes course can be
     * calculated even with thrown error (e.g. min/max amount error).
     *
     * @example
     * ```ts
     * const fromBlockchain = BLOCKCHAIN_NAME.ETHEREUM;
     * // ETH
     * const fromTokenAddress = '0x0000000000000000000000000000000000000000';
     * const fromAmount = 1;
     * const toBlockchain = BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN;
     * // BUSD
     * const toTokenAddress = '0xe9e7cea3dedca5984780bafc599bd69add087d56';
     *
     * sdk.crossChain.calculateTrade(
     *     { blockchain: fromBlockchain, address: fromTokenAddress },
     *     fromAmount,
     *     { blockchain: toBlockchain, address: toTokenAddress }
     * ).subscribe(tradeData => {
     *     console.log(tradeData.total) // 3
     *     console.log(tradeData.calculated) // 0 or 1 ... or tradeData.total
     *
     *     const wrappedTrade = tradeData.wrappedTrade;
     *     if (wrappedTrade) {
     *         console.log(wrappedTrade.tradeType, `to amount: ${wrappedTrade.trade.to.tokenAmount.toFormat(3)}`));
     *         if (wrappedTrade.error) {
     *             console.error(wrappedTrade.tradeType, 'error: wrappedTrade.error');
     *         }
     *    }
     * });
     *
     * ```
     *
     * @param fromToken Token to sell.
     * @param fromAmount Amount to sell.
     * @param toToken Token to get.
     * @param options Additional options.
     * @returns Observable of cross-chain providers calculation data with best trade and possible errors.
     */
    calculateTradesReactively(fromToken: Token | {
        address: string;
        blockchain: BlockchainName;
    } | PriceToken, fromAmount: string | number | BigNumber, toToken: Token | {
        address: string;
        blockchain: BlockchainName;
    } | PriceToken, options?: CrossChainManagerCalculationOptions): Observable<CrossChainReactivelyCalculatedTradeData>;
    private getFullOptions;
    private getNotDisabledProviders;
    private getProviderCalculationPromise;
    private getProviderAddress;
    private getProxyConfig;
}
