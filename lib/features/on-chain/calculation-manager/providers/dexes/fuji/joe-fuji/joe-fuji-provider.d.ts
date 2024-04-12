import { UniswapV2AbstractProvider } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider";
import { JoeFujiTrade } from "./joe-fuji-trade";
export declare class JoeFujiProvider extends UniswapV2AbstractProvider<JoeFujiTrade> {
    readonly blockchain: "FUJI";
    readonly UniswapV2TradeClass: typeof JoeFujiTrade;
    readonly providerSettings: import("../../common/uniswap-v2-abstract/models/uniswap-v2-provider-configuration").UniswapV2ProviderConfiguration;
}
