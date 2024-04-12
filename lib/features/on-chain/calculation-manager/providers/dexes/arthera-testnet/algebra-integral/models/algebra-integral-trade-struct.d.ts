import { UniswapV3AlgebraTradeStruct } from "../../../common/uniswap-v3-algebra-abstract/models/uniswap-v3-algebra-trade-struct";
import { AlgebraIntegralRoute } from './algebra-integral-route';
export interface AlgebraIntegralTradeStruct extends UniswapV3AlgebraTradeStruct {
    route: AlgebraIntegralRoute;
}
