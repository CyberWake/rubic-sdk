import BigNumber from 'bignumber.js';
import { PriceTokenAmount } from "../../../../../../common/tokens";
import { EvmEncodeConfig } from "../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/models/evm-encode-config";
import { EncodeTransactionOptions } from "../../../../../common/models/encode-transaction-options";
import { OnChainTradeType } from '../../common/models/on-chain-trade-type';
import { AggregatorEvmOnChainTrade } from '../../common/on-chain-aggregator/aggregator-evm-on-chain-trade-abstract';
import { GetToAmountAndTxDataResponse } from '../../common/on-chain-aggregator/models/aggregator-on-chain-types';
import { RangoOnChainTradeStruct } from './models/rango-on-chain-trade-types';
export declare class RangoOnChainTrade extends AggregatorEvmOnChainTrade {
    static getGasLimit(tradeStruct: RangoOnChainTradeStruct, providerGateway: string): Promise<BigNumber | null>;
    /**
     * approveTo address - used in this.web3Public.getAllowance() method
     */
    readonly providerGateway: string;
    readonly type: OnChainTradeType;
    private readonly _toTokenAmountMin;
    get toTokenAmountMin(): PriceTokenAmount;
    protected get spenderAddress(): string;
    get dexContractAddress(): string;
    constructor(tradeStruct: RangoOnChainTradeStruct, providerAddress: string, providerGateway: string);
    encodeDirect(options: EncodeTransactionOptions): Promise<EvmEncodeConfig>;
    protected getToAmountAndTxData(receiverAddress?: string, fromAddress?: string): Promise<GetToAmountAndTxDataResponse>;
}
