import { JoeTrade } from "./joe-trade";
import { UniswapV2AbstractProvider } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider";
export declare class JoeProvider extends UniswapV2AbstractProvider<JoeTrade> {
    readonly blockchain: "AVALANCHE";
    readonly UniswapV2TradeClass: typeof JoeTrade;
    readonly providerSettings: import("../../common/uniswap-v2-abstract/models/uniswap-v2-provider-configuration").UniswapV2ProviderConfiguration;
}
