import { UniswapV2AbstractProvider } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider";
import { MuteSwapTrade } from "./mute-swap-trade";
export declare class MuteSwapProvider extends UniswapV2AbstractProvider<MuteSwapTrade> {
    readonly blockchain: "ZK_SYNC";
    readonly UniswapV2TradeClass: typeof MuteSwapTrade;
    readonly providerSettings: import("../../common/uniswap-v2-abstract/models/uniswap-v2-provider-configuration").UniswapV2ProviderConfiguration;
}
