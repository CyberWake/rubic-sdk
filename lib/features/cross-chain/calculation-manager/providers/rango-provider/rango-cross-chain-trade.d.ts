import BigNumber from 'bignumber.js';
import { PriceTokenAmount } from "../../../../../common/tokens";
import { EvmBlockchainName } from "../../../../../core/blockchain/models/blockchain-name";
import { ContractParams } from "../../../../common/models/contract-params";
import { SwapTransactionOptions } from "../../../../common/models/swap-transaction-options";
import { CrossChainTradeType } from '../../models/cross-chain-trade-type';
import { EvmCrossChainTrade } from '../common/emv-cross-chain-trade/evm-cross-chain-trade';
import { GasData } from '../common/emv-cross-chain-trade/models/gas-data';
import { BridgeType } from '../common/models/bridge-type';
import { FeeInfo } from '../common/models/fee-info';
import { GetContractParamsOptions } from '../common/models/get-contract-params-options';
import { OnChainSubtype } from '../common/models/on-chain-subtype';
import { TradeInfo } from '../common/models/trade-info';
import { RangoCrossChainTradeConstructorParams, RangoGetGasDataParams } from './model/rango-cross-chain-parser-types';
export declare class RangoCrossChainTrade extends EvmCrossChainTrade {
    /** @internal */
    static getGasData({ fromToken, toToken, feeInfo, routePath, swapQueryParams, bridgeSubtype }: RangoGetGasDataParams): Promise<GasData | null>;
    /**ABSTRACT PROPS */
    readonly type: CrossChainTradeType;
    readonly isAggregator: boolean;
    readonly to: PriceTokenAmount<EvmBlockchainName>;
    readonly from: PriceTokenAmount<EvmBlockchainName>;
    readonly toTokenAmountMin: BigNumber;
    readonly feeInfo: FeeInfo;
    readonly onChainSubtype: OnChainSubtype;
    readonly bridgeType: BridgeType;
    readonly gasData: GasData;
    readonly priceImpact: number | null;
    /** */
    private readonly slippage;
    /**
     * @description UUID returned by rango-api to track transaction status in getRangoDstSwapStatus
     */
    rangoRequestId: string | undefined;
    private readonly swapQueryParams;
    private get fromBlockchain();
    protected get fromContractAddress(): string;
    protected get methodName(): string;
    constructor(params: RangoCrossChainTradeConstructorParams);
    getContractParams(options: GetContractParamsOptions, skipAmountChangeCheck?: boolean): Promise<ContractParams>;
    protected swapDirect(options?: SwapTransactionOptions): Promise<string>;
    private getTransactionRequest;
    getTradeInfo(): TradeInfo;
}
