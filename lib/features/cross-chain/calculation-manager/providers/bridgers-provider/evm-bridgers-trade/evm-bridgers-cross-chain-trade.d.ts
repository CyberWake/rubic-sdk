import BigNumber from 'bignumber.js';
import { PriceTokenAmount } from "../../../../../../common/tokens";
import { TronBlockchainName } from "../../../../../../core/blockchain/models/blockchain-name";
import { ContractParams } from "../../../../../common/models/contract-params";
import { EncodeTransactionOptions } from "../../../../../common/models/encode-transaction-options";
import { SwapTransactionOptions } from "../../../../../common/models/swap-transaction-options";
import { BridgersEvmCrossChainSupportedBlockchain } from "../constants/bridgers-cross-chain-supported-blockchain";
import { EvmCrossChainTrade } from "../../common/emv-cross-chain-trade/evm-cross-chain-trade";
import { GasData } from "../../common/emv-cross-chain-trade/models/gas-data";
import { FeeInfo } from "../../common/models/fee-info";
import { GetContractParamsOptions } from "../../common/models/get-contract-params-options";
import { RubicStep } from "../../common/models/rubicStep";
import { TradeInfo } from "../../common/models/trade-info";
import { MarkRequired } from 'ts-essentials';
import { TransactionConfig } from 'web3-core';
export declare class EvmBridgersCrossChainTrade extends EvmCrossChainTrade {
    /** @internal */
    static getGasData(from: PriceTokenAmount<BridgersEvmCrossChainSupportedBlockchain>, to: PriceTokenAmount<TronBlockchainName>, receiverAddress: string, providerAddress: string, feeInfo: FeeInfo, toTokenAmountMin: BigNumber): Promise<GasData | null>;
    readonly type: "bridgers";
    readonly isAggregator = false;
    readonly from: PriceTokenAmount<BridgersEvmCrossChainSupportedBlockchain>;
    readonly to: PriceTokenAmount<TronBlockchainName>;
    readonly toTokenAmountMin: BigNumber;
    readonly gasData: GasData;
    readonly feeInfo: FeeInfo;
    readonly onChainSubtype: {
        from: undefined;
        to: undefined;
    };
    readonly bridgeType: "bridgers";
    readonly priceImpact: number | null;
    private readonly slippage;
    protected get fromContractAddress(): string;
    protected get methodName(): string;
    constructor(crossChainTrade: {
        from: PriceTokenAmount<BridgersEvmCrossChainSupportedBlockchain>;
        to: PriceTokenAmount<TronBlockchainName>;
        toTokenAmountMin: BigNumber;
        feeInfo: FeeInfo;
        gasData: GasData;
        slippage: number;
    }, providerAddress: string, routePath: RubicStep[]);
    protected swapDirect(options: MarkRequired<SwapTransactionOptions, 'receiverAddress'>): Promise<string | never>;
    encode(options: MarkRequired<EncodeTransactionOptions, 'receiverAddress'>): Promise<TransactionConfig>;
    protected getContractParams(options: MarkRequired<GetContractParamsOptions, 'receiverAddress'>, skipAmountChangeCheck?: boolean): Promise<ContractParams>;
    getTradeAmountRatio(fromUsd: BigNumber): BigNumber;
    getTradeInfo(): TradeInfo;
}
