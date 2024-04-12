import { EvmEncodeConfig } from "../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/models/evm-encode-config";
import { SolanaOnChainTrade } from "../on-chain-trade/solana-on-chain-trade/solana-on-chain-trade";
import { GetToAmountAndTxDataResponse } from './models/aggregator-on-chain-types';
export declare abstract class AggregatorSolanaOnChainTrade extends SolanaOnChainTrade {
    protected getTxConfigAndCheckAmount(receiverAddress?: string, fromAddress?: string, directTransaction?: EvmEncodeConfig): Promise<EvmEncodeConfig>;
    /**
     * @description Returns data for method OnChainTrade.checkAmountChange and EvmEncodeConfig value
     */
    protected abstract getToAmountAndTxData(receiverAddress?: string, fromAddress?: string): Promise<GetToAmountAndTxDataResponse>;
}
