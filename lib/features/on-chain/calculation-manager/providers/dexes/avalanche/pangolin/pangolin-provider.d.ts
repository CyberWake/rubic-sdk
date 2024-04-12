import { PangolinTrade } from "./pangolin-trade";
import { UniswapV2AbstractProvider } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider";
export declare class PangolinProvider extends UniswapV2AbstractProvider<PangolinTrade> {
    readonly blockchain: "AVALANCHE";
    readonly UniswapV2TradeClass: typeof PangolinTrade;
    readonly providerSettings: import("../../common/uniswap-v2-abstract/models/uniswap-v2-provider-configuration").UniswapV2ProviderConfiguration;
}
