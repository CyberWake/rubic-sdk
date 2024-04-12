import { RubicSdkError } from "../../../../../../../common/errors";
import { PriceToken, PriceTokenAmount } from "../../../../../../../common/tokens";
import { BlockchainName } from "../../../../../../../core/blockchain/models/blockchain-name";
import { Web3Public } from "../../../../../../../core/blockchain/web3-public-service/web3-public/web3-public";
import { HttpClient } from "../../../../../../../core/http-client/models/http-client";
import { OnChainCalculationOptions } from "../../../common/models/on-chain-calculation-options";
import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { OnChainTrade } from "../../../common/on-chain-trade/on-chain-trade";
/**
 * Abstract class for all on-chain trade providers.
 */
export declare abstract class OnChainProvider {
    static parseError(err: unknown): RubicSdkError;
    /**
     * Provider blockchain.
     */
    abstract readonly blockchain: BlockchainName;
    readonly supportReceiverAddress: boolean;
    /**
     * Type of provider.
     */
    abstract get type(): OnChainTradeType;
    protected abstract get walletAddress(): string;
    protected get web3Public(): Web3Public;
    protected get httpClient(): HttpClient;
    /**
     * Calculates on-chain trade.
     * @param from Token to sell with input amount.
     * @param to Token to get.
     * @param options Additional options.
     */
    abstract calculate(from: PriceTokenAmount, to: PriceToken, options?: OnChainCalculationOptions): Promise<OnChainTrade>;
}
