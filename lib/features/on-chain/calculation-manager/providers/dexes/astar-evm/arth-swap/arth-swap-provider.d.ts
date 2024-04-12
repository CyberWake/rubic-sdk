import { ArthSwapTrade } from "./arth-swap-trade";
import { UniswapV2AbstractProvider } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider";
export declare class ArthSwapProvider extends UniswapV2AbstractProvider<ArthSwapTrade> {
    readonly blockchain: "ASTAR_EVM";
    readonly UniswapV2TradeClass: typeof ArthSwapTrade;
    readonly providerSettings: import("../../common/uniswap-v2-abstract/models/uniswap-v2-provider-configuration").UniswapV2ProviderConfiguration;
}
