import { UniswapV2AbstractProvider } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider";
import { JupiterSwapTrade } from "./jupiter-swap-trade";
export declare class JupiterSwapProvider extends UniswapV2AbstractProvider<JupiterSwapTrade> {
    readonly blockchain: "KAVA";
    readonly UniswapV2TradeClass: typeof JupiterSwapTrade;
    readonly providerSettings: import("../../common/uniswap-v2-abstract/models/uniswap-v2-provider-configuration").UniswapV2ProviderConfiguration;
}
