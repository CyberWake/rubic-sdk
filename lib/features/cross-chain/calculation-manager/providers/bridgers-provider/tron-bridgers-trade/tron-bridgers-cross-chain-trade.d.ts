import BigNumber from 'bignumber.js';
import { PriceTokenAmount } from "../../../../../../common/tokens";
import { TronBlockchainName } from "../../../../../../core/blockchain/models/blockchain-name";
import { SwapTransactionOptions } from "../../../../../common/models/swap-transaction-options";
import { BridgersEvmCrossChainSupportedBlockchain } from "../constants/bridgers-cross-chain-supported-blockchain";
import { FeeInfo } from "../../common/models/fee-info";
import { RubicStep } from "../../common/models/rubicStep";
import { TradeInfo } from "../../common/models/trade-info";
import { TronContractParams } from "../../common/tron-cross-chain-trade/models/tron-contract-params";
import { TronGetContractParamsOptions } from "../../common/tron-cross-chain-trade/models/tron-get-contract-params-options";
import { TronCrossChainTrade } from "../../common/tron-cross-chain-trade/tron-cross-chain-trade";
import { MarkRequired } from 'ts-essentials';
export declare class TronBridgersCrossChainTrade extends TronCrossChainTrade {
    readonly type: "bridgers";
    readonly isAggregator = false;
    readonly from: PriceTokenAmount<TronBlockchainName>;
    readonly to: PriceTokenAmount<BridgersEvmCrossChainSupportedBlockchain>;
    readonly toTokenAmountMin: BigNumber;
    readonly feeInfo: FeeInfo;
    readonly onChainSubtype: {
        from: undefined;
        to: undefined;
    };
    readonly bridgeType: "bridgers";
    readonly priceImpact: number | null;
    private readonly slippage;
    private readonly contractAddress;
    protected get fromContractAddress(): string;
    protected get methodName(): string;
    constructor(crossChainTrade: {
        from: PriceTokenAmount<TronBlockchainName>;
        to: PriceTokenAmount<BridgersEvmCrossChainSupportedBlockchain>;
        toTokenAmountMin: BigNumber;
        feeInfo: FeeInfo;
        slippage: number;
        contractAddress: string;
    }, providerAddress: string, routePath: RubicStep[]);
    swap(options: MarkRequired<SwapTransactionOptions, 'receiverAddress'>): Promise<string | never>;
    private swapDirect;
    protected getContractParams(options: TronGetContractParamsOptions): Promise<TronContractParams>;
    getTradeAmountRatio(fromUsd: BigNumber): BigNumber;
    getTradeInfo(): TradeInfo;
}
