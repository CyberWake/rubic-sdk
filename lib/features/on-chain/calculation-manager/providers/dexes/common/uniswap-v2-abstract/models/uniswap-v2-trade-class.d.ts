import { AbstractConstructorParameters, Constructor } from "../../../../../../../../common/utils/types";
import { UniswapV2AbstractTrade } from "../uniswap-v2-abstract-trade";
export type UniswapV2TradeClass<T> = Constructor<AbstractConstructorParameters<typeof UniswapV2AbstractTrade>, T> & Omit<typeof UniswapV2AbstractTrade, 'constructor'>;
