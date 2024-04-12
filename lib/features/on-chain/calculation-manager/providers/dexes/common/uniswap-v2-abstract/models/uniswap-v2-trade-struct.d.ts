import { Token } from "../../../../../../../../common/tokens";
import { EvmOnChainTradeStruct } from "../../../../common/on-chain-trade/evm-on-chain-trade/models/evm-on-chain-trade-struct";
import { Exact } from "../../../../common/on-chain-trade/evm-on-chain-trade/models/exact";
import { AerodromeRoutePoolArgument } from "./aerodrome-route-method-arguments";
export interface UniswapV2TradeStruct extends EvmOnChainTradeStruct {
    exact: Exact;
    wrappedPath: ReadonlyArray<Token> | Token[];
    deadlineMinutes: number;
    routPoolInfo: AerodromeRoutePoolArgument[] | undefined;
}
