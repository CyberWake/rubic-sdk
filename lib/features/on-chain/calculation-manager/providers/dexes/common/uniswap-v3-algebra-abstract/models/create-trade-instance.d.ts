import { UniswapV3AlgebraRoute } from "./uniswap-v3-algebra-route";
import { UniswapV3AlgebraTradeStructOmitPath } from "./uniswap-v3-algebra-trade-struct";
import { UniswapV3AlgebraAbstractTrade } from "../uniswap-v3-algebra-abstract-trade";
export type CreateTradeInstance = (tradeStruct: UniswapV3AlgebraTradeStructOmitPath, route: UniswapV3AlgebraRoute, providerAddress: string) => UniswapV3AlgebraAbstractTrade;
