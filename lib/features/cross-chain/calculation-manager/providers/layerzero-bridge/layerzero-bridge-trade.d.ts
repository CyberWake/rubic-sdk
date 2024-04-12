import BigNumber from 'bignumber.js';
import { PriceTokenAmount } from "../../../../../common/tokens";
import { EvmBlockchainName } from "../../../../../core/blockchain/models/blockchain-name";
import { ContractParams } from "../../../../common/models/contract-params";
import { SwapTransactionOptions } from "../../../../common/models/swap-transaction-options";
import { EvmCrossChainTrade } from "../common/emv-cross-chain-trade/evm-cross-chain-trade";
import { GasData } from "../common/emv-cross-chain-trade/models/gas-data";
import { FeeInfo } from "../common/models/fee-info";
import { RubicStep } from "../common/models/rubicStep";
import { TradeInfo } from "../common/models/trade-info";
export declare class LayerZeroBridgeTrade extends EvmCrossChainTrade {
    /** @internal */
    static getGasData(from: PriceTokenAmount<EvmBlockchainName>, to: PriceTokenAmount<EvmBlockchainName>, options: SwapTransactionOptions): Promise<GasData | null>;
    readonly onChainSubtype: {
        from: undefined;
        to: undefined;
    };
    readonly type: "layerzero";
    readonly isAggregator = false;
    readonly bridgeType: "layerzero";
    readonly from: PriceTokenAmount<EvmBlockchainName>;
    readonly to: PriceTokenAmount<EvmBlockchainName>;
    readonly toTokenAmountMin: BigNumber;
    readonly gasData: GasData | null;
    private get fromBlockchain();
    private get toBlockchain();
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
    getContractParams(options: SwapTransactionOptions): Promise<ContractParams>;
    private estimateSendFee;
    getTradeAmountRatio(fromUsd: BigNumber): BigNumber;
    getUsdPrice(): BigNumber;
    getTradeInfo(): TradeInfo;
}
