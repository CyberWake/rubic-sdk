import { UniswapV2AbstractProvider } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider";
import { AstroSwapTrade } from "./astro-swap-trade";
export declare class AstroSwapProvider extends UniswapV2AbstractProvider<AstroSwapTrade> {
    readonly blockchain: "VELAS";
    readonly UniswapV2TradeClass: typeof AstroSwapTrade;
    readonly providerSettings: import("../../common/uniswap-v2-abstract/models/uniswap-v2-provider-configuration").UniswapV2ProviderConfiguration;
}
