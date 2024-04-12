import BigNumber from 'bignumber.js';
import { PriceTokenAmount } from "../../../../../../common/tokens";
import { BlockchainName, SolanaBlockchainName } from "../../../../../../core/blockchain/models/blockchain-name";
import { ContractParams } from "../../../../../common/models/contract-params";
import { SwapTransactionOptions } from "../../../../../common/models/swap-transaction-options";
import { FeeInfo } from "../../common/models/fee-info";
import { GetContractParamsOptions } from "../../common/models/get-contract-params-options";
import { RubicStep } from "../../common/models/rubicStep";
import { TradeInfo } from "../../common/models/trade-info";
import { SolanaCrossChainTrade } from "../../common/solana-cross-chain-trade/solana-cross-chain-trade";
import { DebridgeSolanaCrossChainTradeConstructor } from "../models/debridge-cross-chain-trade-constructor";
/**
 * Calculated DeBridge cross-chain trade.
 */
export declare class DebridgeSolanaCrossChainTrade extends SolanaCrossChainTrade {
    /** @internal */
    readonly transitAmount: BigNumber;
    private readonly cryptoFeeToken;
    private readonly transactionRequest;
    private readonly slippage;
    readonly type: "dln";
    readonly isAggregator = false;
    readonly onChainSubtype: {
        from: "DLN";
        to: "DLN";
    };
    readonly bridgeType: "dln";
    readonly from: PriceTokenAmount<SolanaBlockchainName>;
    readonly to: PriceTokenAmount<BlockchainName>;
    readonly toTokenAmountMin: BigNumber;
    readonly priceImpact: number | null;
    private latestFixedFee;
    private get fromBlockchain();
    protected get fromContractAddress(): string;
    readonly feeInfo: FeeInfo;
    protected get methodName(): string;
    constructor(crossChainTrade: DebridgeSolanaCrossChainTradeConstructor, providerAddress: string, routePath: RubicStep[]);
    protected swapDirect(options?: SwapTransactionOptions): Promise<string | never>;
    getContractParams(_options: GetContractParamsOptions, _skipAmountChangeCheck?: boolean): Promise<ContractParams>;
    private getTransactionRequest;
    getTradeInfo(): TradeInfo;
    getTradeAmountRatio(fromUsd: BigNumber): BigNumber;
}
