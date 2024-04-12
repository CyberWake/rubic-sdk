import BigNumber from 'bignumber.js';
import { EvmEncodeConfig } from "../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/models/evm-encode-config";
import { EncodeTransactionOptions } from "../../../../../common/models/encode-transaction-options";
import { AggregatorEvmOnChainTrade } from "../../common/on-chain-aggregator/aggregator-evm-on-chain-trade-abstract";
import { GetToAmountAndTxDataResponse } from '../../common/on-chain-aggregator/models/aggregator-on-chain-types';
import { OdosOnChainTradeStruct } from './models/odos-on-chain-trade-types';
export declare class OdosOnChainTrade extends AggregatorEvmOnChainTrade {
    static getGasLimit(tradeStruct: OdosOnChainTradeStruct, providerGateway: string): Promise<BigNumber | null>;
    readonly type: "ODOS";
    readonly providerGateway: string;
    private bestRouteRequestBody;
    get dexContractAddress(): string;
    protected get spenderAddress(): string;
    constructor(tradeStruct: OdosOnChainTradeStruct, providerAddress: string, providerGateway: string);
    encodeDirect(options: EncodeTransactionOptions): Promise<EvmEncodeConfig>;
    protected getToAmountAndTxData(receiverAddress?: string): Promise<GetToAmountAndTxDataResponse>;
}
