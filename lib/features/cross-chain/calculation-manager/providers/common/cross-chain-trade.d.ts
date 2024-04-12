import BigNumber from 'bignumber.js';
import { PriceTokenAmount } from "../../../../../common/tokens";
import { BasicTransactionOptions } from "../../../../../core/blockchain/web3-private-service/web3-private/models/basic-transaction-options";
import { Web3Private } from "../../../../../core/blockchain/web3-private-service/web3-private/web3-private";
import { Web3Public } from "../../../../../core/blockchain/web3-public-service/web3-public/web3-public";
import { EvmEncodeConfig } from "../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/models/evm-encode-config";
import { HttpClient } from "../../../../../core/http-client/models/http-client";
import { EncodeTransactionOptions } from "../../../../common/models/encode-transaction-options";
import { SwapTransactionOptions } from "../../../../common/models/swap-transaction-options";
import { CrossChainTradeType } from "../../models/cross-chain-trade-type";
import { BridgeType } from "./models/bridge-type";
import { FeeInfo } from "./models/fee-info";
import { OnChainSubtype } from "./models/on-chain-subtype";
import { RubicStep } from "./models/rubicStep";
import { TradeInfo } from "./models/trade-info";
/**
 * Abstract class for all cross-chain providers' trades.
 */
export declare abstract class CrossChainTrade {
    protected readonly providerAddress: string;
    protected readonly routePath: RubicStep[];
    /**
     * Type of calculated cross-chain trade.
     */
    abstract readonly type: CrossChainTradeType;
    /**
     * Token to sell with input amount.
     */
    abstract readonly from: PriceTokenAmount;
    /**
     * Token to get with output amount.
     */
    abstract readonly to: PriceTokenAmount;
    /**
     * Minimum amount of output token user will get in Eth units.
     */
    abstract readonly toTokenAmountMin: BigNumber;
    /**
     * Swap fee information.
     */
    abstract readonly feeInfo: FeeInfo;
    /**
     * Contains on-chain providers' type used in route.
     */
    abstract readonly onChainSubtype: OnChainSubtype;
    /**
     * Contains bridge provider's type used in route.
     */
    abstract readonly bridgeType: BridgeType;
    /**
     * True, if provider is aggregator.
     */
    abstract readonly isAggregator: boolean;
    protected abstract get fromContractAddress(): string;
    protected get httpClient(): HttpClient;
    protected get fromWeb3Public(): Web3Public;
    protected get web3Private(): Web3Private;
    protected get walletAddress(): string;
    protected abstract get methodName(): string;
    get networkFee(): BigNumber;
    get platformFee(): BigNumber;
    protected get isProxyTrade(): boolean;
    protected checkAmountChange(transactionRequest: EvmEncodeConfig, newWeiAmount: string, oldWeiAmount: string): void;
    protected constructor(providerAddress: string, routePath: RubicStep[]);
    /**
     * Returns true, if allowance is not enough.
     */
    needApprove(): Promise<boolean>;
    /**
     * Sends approve transaction with connected wallet.
     * @param options Transaction options.
     * @param checkNeedApprove If true, first allowance is checked.
     * @param amount Amount of tokens in approval window in spending cap field
     */
    abstract approve(options: BasicTransactionOptions, checkNeedApprove?: boolean, amount?: BigNumber | 'infinity'): Promise<unknown>;
    /**
     * Sends swap transaction with connected wallet.
     * If user has not enough allowance, then approve transaction will be called first.
     *
     * @example
     * ```ts
     * const onConfirm = (hash: string) => console.log(hash);
     * const receipt = await trade.swap({ onConfirm });
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
    /**
     * Build encoded approve transaction config.
     * @param tokenAddress Address of the smart-contract corresponding to the token.
     * @param spenderAddress Wallet or contract address to approve.
     * @param value Token amount to approve in wei.
     * @param [options] Additional options.
     * @returns Encoded approve transaction config.
     */
    abstract encodeApprove(tokenAddress: string, spenderAddress: string, value: BigNumber | 'infinity', options: BasicTransactionOptions): Promise<unknown>;
    protected checkTradeErrors(): Promise<void | never>;
    protected checkWalletConnected(): never | void;
    protected checkBlockchainCorrect(): Promise<void | never>;
    protected checkUserBalance(): Promise<void | never>;
    protected checkFromAddress(fromAddress: string | undefined, isRequired?: boolean, crossChainType?: CrossChainTradeType): Promise<void | never>;
    protected checkReceiverAddress(receiverAddress: string | undefined, isRequired?: boolean, crossChainType?: CrossChainTradeType): Promise<void | never>;
    /**
     * Calculates value for swap transaction.
     * @param providerValue Value, returned from cross-chain provider.
     */
    protected getSwapValue(providerValue?: BigNumber | string | number | null): string;
    abstract getUsdPrice(providerFeeTokenPrice?: BigNumber): BigNumber;
    abstract getTradeInfo(): TradeInfo;
}
