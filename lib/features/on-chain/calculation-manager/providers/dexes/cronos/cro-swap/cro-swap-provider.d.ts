import { UniswapV2AbstractProvider } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider";
import { CroSwapTrade } from "./cro-swap-trade";
export declare class CroSwapProvider extends UniswapV2AbstractProvider<CroSwapTrade> {
    readonly blockchain: "CRONOS";
    readonly UniswapV2TradeClass: typeof CroSwapTrade;
    readonly providerSettings: import("../../common/uniswap-v2-abstract/models/uniswap-v2-provider-configuration").UniswapV2ProviderConfiguration;
}
