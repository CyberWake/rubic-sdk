import BigNumber from 'bignumber.js';
import { PriceTokenAmount } from "../../../../../../common/tokens";
import { BlockchainName, EvmBlockchainName } from "../../../../../../core/blockchain/models/blockchain-name";
import { ContractParams } from "../../../../../common/models/contract-params";
import { SwapTransactionOptions } from "../../../../../common/models/swap-transaction-options";
import { EvmCrossChainTrade } from "../../common/emv-cross-chain-trade/evm-cross-chain-trade";
import { GasData } from "../../common/emv-cross-chain-trade/models/gas-data";
import { FeeInfo } from "../../common/models/fee-info";
import { GetContractParamsOptions } from "../../common/models/get-contract-params-options";
import { RubicStep } from "../../common/models/rubicStep";
import { TradeInfo } from "../../common/models/trade-info";
import { DebridgeEvmCrossChainTradeConstructor } from "../models/debridge-cross-chain-trade-constructor";
import { TransactionRequest } from "../models/transaction-request";
/**
 * Calculated DeBridge cross-chain trade.
 */
export declare class DebridgeEvmCrossChainTrade extends EvmCrossChainTrade {
    protected useProxyByDefault: boolean;
    /** @internal */
    readonly transitAmount: BigNumber;
    private readonly cryptoFeeToken;
    private readonly transactionRequest;
    private readonly slippage;
    private readonly onChainTrade;
    private latestFixedFee;
    /** @internal */
    static getGasData(from: PriceTokenAmount<EvmBlockchainName>, toToken: PriceTokenAmount<EvmBlockchainName>, transactionRequest: TransactionRequest, feeInfo: FeeInfo, providerAddress: string, receiverAddress?: string): Promise<GasData | null>;
    readonly type: "dln";
    readonly isAggregator = false;
    readonly onChainSubtype: {
        from: "DLN";
        to: "DLN";
    };
    readonly bridgeType: "dln";
    readonly from: PriceTokenAmount<EvmBlockchainName>;
    readonly to: PriceTokenAmount<BlockchainName>;
    readonly toTokenAmountMin: BigNumber;
    readonly priceImpact: number | null;
    readonly allowanceTarget: string;
    readonly gasData: GasData | null;
    private get fromBlockchain();
    protected get fromContractAddress(): string;
    readonly feeInfo: FeeInfo;
    protected get methodName(): string;
    constructor(crossChainTrade: DebridgeEvmCrossChainTradeConstructor, providerAddress: string, routePath: RubicStep[]);
    protected swapDirect(options?: SwapTransactionOptions): Promise<string | never>;
    getContractParams(options: GetContractParamsOptions, skipAmountChangeCheck?: boolean): Promise<ContractParams>;
    private getTransactionRequest;
    getTradeInfo(): TradeInfo;
    getTradeAmountRatio(fromUsd: BigNumber): BigNumber;
}
