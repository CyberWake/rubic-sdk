import { EvmOnChainTradeStruct } from "../../../../common/on-chain-trade/evm-on-chain-trade/models/evm-on-chain-trade-struct";
import { Exact } from "../../../../common/on-chain-trade/evm-on-chain-trade/models/exact";
export interface UniswapV3AlgebraTradeStruct extends EvmOnChainTradeStruct {
    exact: Exact;
    deadlineMinutes: number;
}
export type UniswapV3AlgebraTradeStructOmitPath = Omit<UniswapV3AlgebraTradeStruct, 'path'>;
