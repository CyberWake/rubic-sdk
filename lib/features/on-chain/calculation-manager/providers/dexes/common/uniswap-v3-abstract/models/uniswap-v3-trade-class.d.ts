import { AbstractConstructorParameters, Constructor } from "../../../../../../../../common/utils/types";
import { UniswapV3AbstractTrade } from "../uniswap-v3-abstract-trade";
export type UniswapV3TradeClass<T> = Constructor<AbstractConstructorParameters<typeof UniswapV3AbstractTrade>, T> & Omit<typeof UniswapV3AbstractTrade, 'constructor'>;
