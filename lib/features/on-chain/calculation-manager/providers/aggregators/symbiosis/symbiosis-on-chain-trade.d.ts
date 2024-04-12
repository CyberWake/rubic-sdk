import BigNumber from 'bignumber.js';
import { EvmEncodeConfig } from "../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/models/evm-encode-config";
import { EncodeTransactionOptions } from "../../../../../common/models/encode-transaction-options";
import { OnChainTradeType } from '../../common/models/on-chain-trade-type';
import { AggregatorEvmOnChainTrade } from '../../common/on-chain-aggregator/aggregator-evm-on-chain-trade-abstract';
import { GetToAmountAndTxDataResponse } from '../../common/on-chain-aggregator/models/aggregator-on-chain-types';
import { SymbiosisTradeStruct } from './models/symbiosis-on-chain-trade-types';
export declare class SymbiosisOnChainTrade extends AggregatorEvmOnChainTrade {
    static getGasLimit(tradeStruct: SymbiosisTradeStruct, providerGateway: string): Promise<BigNumber | null>;
    readonly type: OnChainTradeType;
    readonly providerGateway: string;
    protected get spenderAddress(): string;
    get dexContractAddress(): string;
    constructor(tradeStruct: SymbiosisTradeStruct, providerAddress: string, providerGateway: string);
    encodeDirect(options: EncodeTransactionOptions): Promise<EvmEncodeConfig>;
    protected getToAmountAndTxData(receiverAddress?: string, fromAddress?: string): Promise<GetToAmountAndTxDataResponse>;
}
