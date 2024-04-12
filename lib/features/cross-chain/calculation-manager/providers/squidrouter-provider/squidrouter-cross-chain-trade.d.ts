import BigNumber from 'bignumber.js';
import { PriceTokenAmount } from "../../../../../common/tokens";
import { EvmBlockchainName } from "../../../../../core/blockchain/models/blockchain-name";
import { ContractParams } from "../../../../common/models/contract-params";
import { SwapTransactionOptions } from "../../../../common/models/swap-transaction-options";
import { EvmCrossChainTrade } from "../common/emv-cross-chain-trade/evm-cross-chain-trade";
import { GasData } from "../common/emv-cross-chain-trade/models/gas-data";
import { FeeInfo } from "../common/models/fee-info";
import { GetContractParamsOptions } from "../common/models/get-contract-params-options";
import { OnChainSubtype } from "../common/models/on-chain-subtype";
import { RubicStep } from "../common/models/rubicStep";
import { TradeInfo } from "../common/models/trade-info";
import { SquidrouterTransactionRequest } from "./models/transaction-request";
import { SquidrouterTransactionResponse } from "./models/transaction-response";
import { EvmOnChainTrade } from "../../../../on-chain/calculation-manager/providers/common/on-chain-trade/evm-on-chain-trade/evm-on-chain-trade";
/**
 * Calculated DeBridge cross-chain trade.
 */
export declare class SquidrouterCrossChainTrade extends EvmCrossChainTrade {
    /** @internal */
    readonly transitUSDAmount: BigNumber;
    private readonly cryptoFeeToken;
    private readonly slippage;
    private readonly onChainTrade;
    private readonly transactionRequest;
    /** @internal */
    static getGasData(from: PriceTokenAmount<EvmBlockchainName>, toToken: PriceTokenAmount<EvmBlockchainName>, transactionRequest: SquidrouterTransactionRequest, feeInfo: FeeInfo, receiverAddress: string, providerAddress: string): Promise<GasData | null>;
    readonly type: "squidrouter";
    readonly isAggregator = false;
    readonly onChainSubtype: OnChainSubtype;
    readonly bridgeType: "squidrouter";
    readonly from: PriceTokenAmount<EvmBlockchainName>;
    readonly to: PriceTokenAmount<EvmBlockchainName>;
    readonly toTokenAmountMin: BigNumber;
    readonly priceImpact: number | null;
    readonly allowanceTarget: string;
    readonly gasData: GasData | null;
    private get fromBlockchain();
    protected get fromContractAddress(): string;
    readonly feeInfo: FeeInfo;
    protected get methodName(): string;
    constructor(crossChainTrade: {
        from: PriceTokenAmount<EvmBlockchainName>;
        to: PriceTokenAmount<EvmBlockchainName>;
        gasData: GasData | null;
        priceImpact: number | null;
        allowanceTarget: string;
        slippage: number;
        feeInfo: FeeInfo;
        transitUSDAmount: BigNumber;
        cryptoFeeToken: PriceTokenAmount;
        onChainTrade: EvmOnChainTrade | null;
        onChainSubtype: OnChainSubtype;
        transactionRequest: SquidrouterTransactionRequest;
    }, providerAddress: string, routePath: RubicStep[]);
    protected swapDirect(options?: SwapTransactionOptions): Promise<string | never>;
    getContractParams(options: GetContractParamsOptions, skipAmountChangeCheck?: boolean): Promise<ContractParams>;
    getTradeAmountRatio(fromUsd: BigNumber): BigNumber;
    getTradeInfo(): TradeInfo;
    private getTransactionRequest;
    static getResponseFromApiToTransactionRequest(requestParams: SquidrouterTransactionRequest): Promise<SquidrouterTransactionResponse>;
}
