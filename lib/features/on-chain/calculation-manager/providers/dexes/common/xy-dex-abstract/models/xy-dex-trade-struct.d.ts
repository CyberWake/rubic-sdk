import { EvmOnChainTradeStruct } from "../../../../common/on-chain-trade/evm-on-chain-trade/models/evm-on-chain-trade-struct";
export interface XyDexTradeStruct extends EvmOnChainTradeStruct {
    contractAddress: string;
    provider: string;
}
