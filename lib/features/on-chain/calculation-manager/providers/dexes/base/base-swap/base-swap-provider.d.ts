import { BaseSwapTrade } from "./base-swap-trade";
import { UniswapV2AbstractProvider } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider";
export declare class BaseSwapProvider extends UniswapV2AbstractProvider<BaseSwapTrade> {
    readonly blockchain: "BASE";
    readonly UniswapV2TradeClass: typeof BaseSwapTrade;
    readonly providerSettings: import("../../common/uniswap-v2-abstract/models/uniswap-v2-provider-configuration").UniswapV2ProviderConfiguration;
}
