import { EvmEncodeConfig } from "../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/models/evm-encode-config";
import { EvmOnChainTrade } from '../on-chain-trade/evm-on-chain-trade/evm-on-chain-trade';
import { GetToAmountAndTxDataResponse } from './models/aggregator-on-chain-types';
export declare abstract class AggregatorEvmOnChainTrade extends EvmOnChainTrade {
    protected getTxConfigAndCheckAmount(receiverAddress?: string, fromAddress?: string, directTransaction?: EvmEncodeConfig): Promise<EvmEncodeConfig>;
    /**
     * @description Returns data for method OnChainTrade.checkAmountChange and EvmEncodeConfig value
     */
    protected abstract getToAmountAndTxData(receiverAddress?: string, fromAddress?: string): Promise<GetToAmountAndTxDataResponse>;
}
