import BigNumber from 'bignumber.js';
import { PriceTokenAmount } from "../../../../../common/tokens";
import { EvmBlockchainName } from "../../../../../core/blockchain/models/blockchain-name";
import { ContractParams } from "../../../../common/models/contract-params";
import { SwapTransactionOptions } from "../../../../common/models/swap-transaction-options";
import { EvmCrossChainTrade } from "../common/emv-cross-chain-trade/evm-cross-chain-trade";
import { GasData } from "../common/emv-cross-chain-trade/models/gas-data";
import { FeeInfo } from "../common/models/fee-info";
import { GetContractParamsOptions } from "../common/models/get-contract-params-options";
import { RubicStep } from "../common/models/rubicStep";
import { TradeInfo } from "../common/models/trade-info";
import { TransactionReceipt } from 'web3-eth';
export declare class ScrollBridgeTrade extends EvmCrossChainTrade {
    /** @internal */
    static getGasData(from: PriceTokenAmount<EvmBlockchainName>, to: PriceTokenAmount<EvmBlockchainName>): Promise<GasData | null>;
    readonly onChainSubtype: {
        from: undefined;
        to: undefined;
    };
    readonly type: "scroll_bridge";
    readonly isAggregator = false;
    readonly bridgeType: "scroll_bridge";
    readonly from: PriceTokenAmount<EvmBlockchainName>;
    readonly to: PriceTokenAmount<EvmBlockchainName>;
    readonly toTokenAmountMin: BigNumber;
    readonly gasData: GasData | null;
    private get fromBlockchain();
    protected get fromContractAddress(): string;
    readonly feeInfo: FeeInfo;
    readonly onChainTrade: null;
    protected get methodName(): string;
    constructor(crossChainTrade: {
        from: PriceTokenAmount<EvmBlockchainName>;
        to: PriceTokenAmount<EvmBlockchainName>;
        gasData: GasData | null;
    }, providerAddress: string, routePath: RubicStep[]);
    protected swapDirect(options?: SwapTransactionOptions): Promise<string | never>;
    getContractParams(options: GetContractParamsOptions): Promise<ContractParams>;
    getTradeAmountRatio(_fromUsd: BigNumber): BigNumber;
    getTradeInfo(): TradeInfo;
    static claimTargetTokens(sourceTransaction: string, options: SwapTransactionOptions): Promise<TransactionReceipt>;
    static redeemTokens(sourceTransactionHash: string, options: SwapTransactionOptions): Promise<TransactionReceipt>;
}
