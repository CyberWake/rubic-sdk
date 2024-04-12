import { Route } from '@lifi/sdk';
import BigNumber from 'bignumber.js';
import { PriceTokenAmount } from "../../../../../common/tokens";
import { EvmBlockchainName } from "../../../../../core/blockchain/models/blockchain-name";
import { ContractParams } from "../../../../common/models/contract-params";
import { SwapTransactionOptions } from "../../../../common/models/swap-transaction-options";
import { EvmCrossChainTrade } from "../common/emv-cross-chain-trade/evm-cross-chain-trade";
import { GasData } from "../common/emv-cross-chain-trade/models/gas-data";
import { BridgeType } from "../common/models/bridge-type";
import { FeeInfo } from "../common/models/fee-info";
import { GetContractParamsOptions } from "../common/models/get-contract-params-options";
import { OnChainSubtype } from "../common/models/on-chain-subtype";
import { RubicStep } from "../common/models/rubicStep";
import { TradeInfo } from "../common/models/trade-info";
/**
 * Calculated Celer cross-chain trade.
 */
export declare class LifiCrossChainTrade extends EvmCrossChainTrade {
    /** @internal */
    static getGasData(from: PriceTokenAmount<EvmBlockchainName>, toToken: PriceTokenAmount<EvmBlockchainName>, route: Route, feeInfo: FeeInfo, providerAddress: string, receiverAddress?: string): Promise<GasData | null>;
    readonly type: "lifi";
    readonly isAggregator = true;
    readonly from: PriceTokenAmount<EvmBlockchainName>;
    readonly to: PriceTokenAmount<EvmBlockchainName>;
    readonly toTokenAmountMin: BigNumber;
    readonly gasData: GasData | null;
    private readonly route;
    private readonly providerGateway;
    readonly onChainSubtype: OnChainSubtype;
    readonly bridgeType: BridgeType;
    readonly priceImpact: number | null;
    readonly feeInfo: FeeInfo;
    private readonly slippage;
    private get fromBlockchain();
    get fromContractAddress(): string;
    protected get methodName(): string;
    constructor(crossChainTrade: {
        from: PriceTokenAmount<EvmBlockchainName>;
        to: PriceTokenAmount<EvmBlockchainName>;
        route: Route;
        gasData: GasData | null;
        toTokenAmountMin: BigNumber;
        feeInfo: FeeInfo;
        priceImpact: number | null;
        onChainSubtype: OnChainSubtype;
        bridgeType: BridgeType;
        slippage: number;
    }, providerAddress: string, routePath: RubicStep[]);
    protected swapDirect(options?: SwapTransactionOptions): Promise<string | never>;
    getContractParams(options: GetContractParamsOptions, skipAmountChangeCheck?: boolean): Promise<ContractParams>;
    private fetchSwapData;
    private getResponseFromApiToTransactionRequest;
    getTradeAmountRatio(fromUsd: BigNumber): BigNumber;
    getTradeInfo(): TradeInfo;
}
