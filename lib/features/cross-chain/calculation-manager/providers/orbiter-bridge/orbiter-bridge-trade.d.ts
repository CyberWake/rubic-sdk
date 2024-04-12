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
import { OnChainSubtype } from '../common/models/on-chain-subtype';
import { TradeInfo } from '../common/models/trade-info';
import { OrbiterGetGasDataParams, OrbiterTradeParams } from './models/orbiter-bridge-trade-types';
export declare class OrbiterBridgeTrade extends EvmCrossChainTrade {
    /** @internal */
    static getGasData({ fromToken, toToken, feeInfo, providerAddress, quoteConfig }: OrbiterGetGasDataParams): Promise<GasData | null>;
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
    private quoteConfig;
    private get fromBlockchain();
    protected get fromContractAddress(): string;
    protected get methodName(): string;
    constructor(params: OrbiterTradeParams);
    protected swapDirect(options?: SwapTransactionOptions): Promise<string | never>;
    getContractParams(): Promise<ContractParams>;
    private callOrbiterContract;
    getTradeInfo(): TradeInfo;
}
