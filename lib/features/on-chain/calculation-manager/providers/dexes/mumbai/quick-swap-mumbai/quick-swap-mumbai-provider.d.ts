import { UniswapV2AbstractProvider } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider";
import { QuickSwapMumbaiTrade } from "./quick-swap-mumbai-trade";
export declare class QuickSwapMumbaiProvider extends UniswapV2AbstractProvider<QuickSwapMumbaiTrade> {
    readonly blockchain: "MUMBAI";
    readonly UniswapV2TradeClass: typeof QuickSwapMumbaiTrade;
    readonly providerSettings: import("../../common/uniswap-v2-abstract/models/uniswap-v2-provider-configuration").UniswapV2ProviderConfiguration;
}
