import { UniswapV2AbstractProvider } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider";
import { SoulSwapTrade } from "./soul-swap-trade";
export declare class SoulSwapProvider extends UniswapV2AbstractProvider<SoulSwapTrade> {
    readonly blockchain: "FANTOM";
    readonly UniswapV2TradeClass: typeof SoulSwapTrade;
    readonly providerSettings: import("../../common/uniswap-v2-abstract/models/uniswap-v2-provider-configuration").UniswapV2ProviderConfiguration;
}
