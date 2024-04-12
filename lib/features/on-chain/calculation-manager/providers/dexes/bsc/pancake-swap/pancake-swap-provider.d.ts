import { PancakeSwapTrade } from "./pancake-swap-trade";
import { UniswapV2AbstractProvider } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider";
export declare class PancakeSwapProvider extends UniswapV2AbstractProvider<PancakeSwapTrade> {
    readonly blockchain: "BSC";
    readonly UniswapV2TradeClass: typeof PancakeSwapTrade;
    readonly providerSettings: import("../../common/uniswap-v2-abstract/models/uniswap-v2-provider-configuration").UniswapV2ProviderConfiguration;
}
