import BigNumber from 'bignumber.js';
import { PriceToken, PriceTokenAmount } from "../../../../../../../common/tokens";
import { EvmBlockchainName } from "../../../../../../../core/blockchain/models/blockchain-name";
import { OnChainCalculationOptions } from "../../../common/models/on-chain-calculation-options";
import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { EvmOnChainProvider } from "../on-chain-provider/evm-on-chain-provider/evm-on-chain-provider";
import { OneinchTrade } from "./oneinch-trade";
export declare abstract class OneinchAbstractProvider extends EvmOnChainProvider {
    private readonly defaultOptions;
    get type(): OnChainTradeType;
    private loadContractAddress;
    /**
     * Calculates input amount, based on amount, user wants to get.
     * @param from Token to sell.
     * @param to Token to get with output amount.
     * @param options Additional options.
     */
    calculateExactOutputAmount(from: PriceToken<EvmBlockchainName>, to: PriceTokenAmount<EvmBlockchainName>, options?: OnChainCalculationOptions): Promise<BigNumber>;
    calculate(from: PriceTokenAmount<EvmBlockchainName>, toToken: PriceToken<EvmBlockchainName>, options?: OnChainCalculationOptions): Promise<OneinchTrade>;
    private getTradeInfo;
    /**
     * Extracts tokens path from oneInch api response.
     * @returns Promise<Token[]> Tokens array, used in the route.
     */
    private extractPath;
    protected getAvailableProtocols(): string | undefined;
}
