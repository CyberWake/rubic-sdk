import { UniswapV3AlgebraTradeStruct } from "../../../common/uniswap-v3-algebra-abstract/models/uniswap-v3-algebra-trade-struct";
import { AlgebraRoute } from "./algebra-route";
export interface AlgebraTradeStruct extends UniswapV3AlgebraTradeStruct {
    route: AlgebraRoute;
}
