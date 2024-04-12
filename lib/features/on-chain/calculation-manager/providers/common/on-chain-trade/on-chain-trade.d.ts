import BigNumber from 'bignumber.js';
import { PriceTokenAmount, Token } from "../../../../../../common/tokens";
import { BasicTransactionOptions } from "../../../../../../core/blockchain/web3-private-service/web3-private/models/basic-transaction-options";
import { Web3Private } from "../../../../../../core/blockchain/web3-private-service/web3-private/web3-private";
import { Web3Public } from "../../../../../../core/blockchain/web3-public-service/web3-public/web3-public";
import { EvmEncodeConfig } from "../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/models/evm-encode-config";
import { HttpClient } from "../../../../../../core/http-client/models/http-client";
import { EncodeTransactionOptions } from "../../../../../common/models/encode-transaction-options";
import { SwapTransactionOptions } from "../../../../../common/models/swap-transaction-options";
import { FeeInfo } from "../../../../../cross-chain/calculation-manager/providers/common/models/fee-info";
import { RubicStep } from "../../../../../cross-chain/calculation-manager/providers/common/models/rubicStep";
import { TradeInfo } from "../../../../../cross-chain/calculation-manager/providers/common/models/trade-info";
import { OnChainTradeType } from "../models/on-chain-trade-type";
/**
 * Abstract class for all instant trade providers' trades.
 */
export declare abstract class OnChainTrade {
    protected readonly providerAddress: string;
    /**
     * Token to sell with input amount.
     */
    abstract readonly from: PriceTokenAmount;
    /**
     * Token to get with output amount.
     */
    abstract readonly to: PriceTokenAmount;
    abstract readonly slippageTolerance: number;
    protected abstract readonly spenderAddress: string;
    abstract readonly path: ReadonlyArray<Token>;
    abstract readonly feeInfo: FeeInfo;
    /**
     * Type of instant trade provider.
     */
    abstract get type(): OnChainTradeType;
    /**
     * Minimum amount of output token user can get.
     */
    get toTokenAmountMin(): PriceTokenAmount;
    protected get web3Public(): Web3Public;
    protected get web3Private(): Web3Private;
    protected get walletAddress(): string;
    protected get httpClient(): HttpClient;
    /**
     * Price impact, based on tokens' usd prices.
     */
    get priceImpact(): number | null;
    protected constructor(providerAddress: string);
    /**
     * Returns true, if allowance is not enough.
     */
    needApprove(fromAddress?: string): Promise<boolean>;
    /**
     * Sends approve transaction with connected wallet.
     * @param options Transaction options.
     * @param checkNeedApprove If true, first allowance is checked.
     * @param amount Amount of tokens in approval window in spending cap field
     */
    abstract approve(options: BasicTransactionOptions, checkNeedApprove?: boolean, amount?: BigNumber | 'infinity'): Promise<unknown>;
    /**
     * Builds encoded approve transaction config.
     * @param tokenAddress Address of the smart-contract corresponding to the token.
     * @param spenderAddress Wallet or contract address to approve.
     * @param value Token amount to approve in wei.
     * @param [options] Additional options.
     * @returns Encoded approve transaction config.
     */
    abstract encodeApprove(tokenAddress: string, spenderAddress: string, value: BigNumber | 'infinity', options: BasicTransactionOptions): Promise<unknown>;
    /**
     * Sends swap transaction with connected wallet.
     * If user has not enough allowance, then approve transaction will be called first.
     *
     * @example
     * ```ts
     * const onConfirm = (hash: string) => console.log(hash);
     * const receipt = await trades[TRADE_TYPE.UNISWAP_V2].swap({ onConfirm });
     * ```
     *
     * @param options Transaction options.
     */
    abstract swap(options?: SwapTransactionOptions): Promise<string | never>;
    /**
     * Builds transaction config, with encoded data.
     * @param options Encode transaction options.
     */
    abstract encode(options: EncodeTransactionOptions): Promise<unknown>;
    protected checkWalletState(): Promise<void>;
    protected checkWalletConnected(): never | void;
    protected checkBlockchainCorrect(): Promise<void | never>;
    protected checkBalance(): Promise<void | never>;
    protected checkFromAddress(fromAddress: string | undefined, isRequired?: boolean, chainType?: OnChainTradeType): Promise<void | never>;
    protected checkReceiverAddress(receiverAddress: string | undefined, isRequired?: boolean, chainType?: OnChainTradeType): Promise<void | never>;
    protected getRoutePath(): RubicStep[];
    getTradeInfo(): TradeInfo;
    protected checkAmountChange(transactionRequest: EvmEncodeConfig, newWeiAmount: string, oldWeiAmount: string): void;
}
