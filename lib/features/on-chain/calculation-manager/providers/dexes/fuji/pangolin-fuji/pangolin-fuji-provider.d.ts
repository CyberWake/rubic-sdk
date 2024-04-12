import { UniswapV2AbstractProvider } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider";
import { PangolinFujiTrade } from "./pangolin-fuji-trade";
export declare class PangolinFujiProvider extends UniswapV2AbstractProvider<PangolinFujiTrade> {
    readonly blockchain: "FUJI";
    readonly UniswapV2TradeClass: typeof PangolinFujiTrade;
    readonly providerSettings: import("../../common/uniswap-v2-abstract/models/uniswap-v2-provider-configuration").UniswapV2ProviderConfiguration;
}
