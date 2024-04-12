import { UniswapV2AbstractProvider } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider";
import { SpiritSwapTrade } from "./spirit-swap-trade";
export declare class SpiritSwapProvider extends UniswapV2AbstractProvider<SpiritSwapTrade> {
    readonly blockchain: "FANTOM";
    readonly UniswapV2TradeClass: typeof SpiritSwapTrade;
    readonly providerSettings: import("../../common/uniswap-v2-abstract/models/uniswap-v2-provider-configuration").UniswapV2ProviderConfiguration;
}
