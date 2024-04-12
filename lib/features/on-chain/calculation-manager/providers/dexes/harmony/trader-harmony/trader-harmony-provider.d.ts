import { UniswapV2AbstractProvider } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider";
import { TradeHarmonySwapTrade } from "./trader-harmony-trade";
export declare class TradeHarmonySwapProvider extends UniswapV2AbstractProvider<TradeHarmonySwapTrade> {
    readonly blockchain: "DEFIKINGDOMS";
    readonly UniswapV2TradeClass: typeof TradeHarmonySwapTrade;
    readonly providerSettings: import("../../common/uniswap-v2-abstract/models/uniswap-v2-provider-configuration").UniswapV2ProviderConfiguration;
}
