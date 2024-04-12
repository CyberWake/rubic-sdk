import { UniswapV3AlgebraTradeStruct } from "../../../common/uniswap-v3-algebra-abstract/models/uniswap-v3-algebra-trade-struct";
import { QuickSwapV3Route } from "./quick-swap-v3-route";
export interface QuickSwapV3TradeStruct extends UniswapV3AlgebraTradeStruct {
    route: QuickSwapV3Route;
}
