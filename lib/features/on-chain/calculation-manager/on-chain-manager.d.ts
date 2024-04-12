import { Observable } from 'rxjs';
import { PriceToken, PriceTokenAmount, Token } from "../../../common/tokens";
import { BlockchainName } from "../../../core/blockchain/models/blockchain-name";
import { ProviderAddress } from "../../../core/sdk/models/provider-address";
import { DeflationTokenManager } from "../../deflation-token-manager/deflation-token-manager";
import { OnChainManagerCalculationOptions } from "./models/on-chain-manager-calculation-options";
import { OnChainReactivelyCalculatedTradeData } from "./models/on-chain-reactively-calculated-trade-data";
import { OnChainTypedTradeProviders } from "./models/on-chain-typed-trade-provider";
import { WrappedOnChainTradeOrNull } from "./models/wrapped-on-chain-trade-or-null";
import { OnChainCalculationOptions } from "./providers/common/models/on-chain-calculation-options";
import { EvmOnChainTrade } from "./providers/common/on-chain-trade/evm-on-chain-trade/evm-on-chain-trade";
/**
 * Contains methods to calculate on-chain trades.
 */
export declare class OnChainManager {
    private readonly providerAddress;
    static readonly defaultCalculationTimeout = 20000;
    /**
     * List of all on-chain trade providers, combined by blockchains.
     */
    readonly tradeProviders: OnChainTypedTradeProviders;
    readonly deflationTokenManager: DeflationTokenManager;
    private readonly AGGREGATORS;
    private readonly LIFI_DISABLED_PROVIDERS;
    constructor(providerAddress: ProviderAddress);
    calculateTradeReactively(fromToken: Token | {
        address: string;
        blockchain: BlockchainName;
    } | PriceToken, fromAmount: string | number, toToken: Token | string | PriceToken, options?: OnChainManagerCalculationOptions): Observable<OnChainReactivelyCalculatedTradeData>;
    /**
     * Calculates on-chain trades, sorted by output amount.
     *
     * @example
     * ```ts
     * const blockchain = BLOCKCHAIN_NAME.ETHEREUM;
     * // ETH
     * const fromTokenAddress = '0x0000000000000000000000000000000000000000';
     * const fromAmount = 1;
     * // USDT
     * const toTokenAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7';
     *
     * const trades = await sdk.onChainManager.calculateTrade(
     *     { blockchain, address: fromTokenAddress },
     *     fromAmount,
     *     toTokenAddress
     * );
     * const bestTrade = trades[0];
     *
     * trades.forEach(trade => {
     *     if (trade instanceof OnChainTrade) {
     *         console.log(trade.type, `to amount: ${trade.to.tokenAmount.toFormat(3)}`)
     *     }
     * })
     * ```
     *
     * @param fromToken Token to sell.
     * @param fromAmount Amount to sell.
     * @param toToken Token to get.
     * @param options Additional options.
     * @returns List of calculated on-chain trades.
     */
    calculateTrade(fromToken: Token | {
        address: string;
        blockchain: BlockchainName;
    } | PriceToken, fromAmount: string | number, toToken: Token | string | PriceToken, options?: OnChainManagerCalculationOptions): Promise<WrappedOnChainTradeOrNull[]>;
    private getFullOptions;
    private calculateTradeFromTokens;
    private isDeflationToken;
    private calculateDexes;
    private calculateLifiTrade;
    static getWrapTrade(from: PriceTokenAmount, to: PriceToken, options: OnChainCalculationOptions): EvmOnChainTrade;
    private getProviderCalculationPromise;
    private getAggregatorsCalculationPromises;
    private getCalcPromise;
    private handleTradePromise;
    private isDisabledAggregator;
    private getWrappedWrapTrade;
}
