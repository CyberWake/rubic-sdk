import { UniswapV2AbstractProvider } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider";
import { NetSwapTrade } from "./net-swap-trade";
export declare class NetSwapProvider extends UniswapV2AbstractProvider<NetSwapTrade> {
    readonly blockchain: "METIS";
    readonly UniswapV2TradeClass: typeof NetSwapTrade;
    readonly providerSettings: import("../../common/uniswap-v2-abstract/models/uniswap-v2-provider-configuration").UniswapV2ProviderConfiguration;
}
