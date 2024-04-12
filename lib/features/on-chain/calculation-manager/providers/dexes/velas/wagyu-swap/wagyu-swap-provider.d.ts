import { UniswapV2AbstractProvider } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider";
import { WagyuSwapTrade } from "./wagyu-swap-trade";
export declare class WagyuSwapProvider extends UniswapV2AbstractProvider<WagyuSwapTrade> {
    readonly blockchain: "VELAS";
    readonly UniswapV2TradeClass: typeof WagyuSwapTrade;
    readonly providerSettings: import("../../common/uniswap-v2-abstract/models/uniswap-v2-provider-configuration").UniswapV2ProviderConfiguration;
}
