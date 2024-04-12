import { UniswapV2AbstractProvider } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider";
import { UniSwapV2ScrollSepoliaTrade } from "./uni-swap-v2-scroll-sepolia-trade";
export declare class UniSwapV2ScrollSepoliaProvider extends UniswapV2AbstractProvider<UniSwapV2ScrollSepoliaTrade> {
    readonly blockchain: "SCROLL_SEPOLIA";
    readonly UniswapV2TradeClass: typeof UniSwapV2ScrollSepoliaTrade;
    readonly providerSettings: import("../../common/uniswap-v2-abstract/models/uniswap-v2-provider-configuration").UniswapV2ProviderConfiguration;
}
