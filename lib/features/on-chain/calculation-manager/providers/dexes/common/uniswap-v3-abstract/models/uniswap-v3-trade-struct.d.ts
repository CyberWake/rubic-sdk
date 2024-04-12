import { UniswapV3Route } from "./uniswap-v3-route";
import { UniswapV3AlgebraTradeStruct } from "../../uniswap-v3-algebra-abstract/models/uniswap-v3-algebra-trade-struct";
export interface UniswapV3TradeStruct extends UniswapV3AlgebraTradeStruct {
    route: UniswapV3Route;
}
