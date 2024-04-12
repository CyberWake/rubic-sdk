import { UniswapV2AbstractProvider } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider";
import { QuickSwapTrade } from "./quick-swap-trade";
export declare class QuickSwapProvider extends UniswapV2AbstractProvider<QuickSwapTrade> {
    readonly blockchain: "POLYGON";
    readonly UniswapV2TradeClass: typeof QuickSwapTrade;
    readonly providerSettings: import("../../common/uniswap-v2-abstract/models/uniswap-v2-provider-configuration").UniswapV2ProviderConfiguration;
}
