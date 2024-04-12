import { UniswapV2AbstractProvider } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider";
import { TradeDFKSwapTrade } from "./trader-dfk-trade";
export declare class TradeDFKSwapProvider extends UniswapV2AbstractProvider<TradeDFKSwapTrade> {
    readonly blockchain: "DEFIKINGDOMS";
    readonly UniswapV2TradeClass: typeof TradeDFKSwapTrade;
    readonly providerSettings: import("../../common/uniswap-v2-abstract/models/uniswap-v2-provider-configuration").UniswapV2ProviderConfiguration;
}
