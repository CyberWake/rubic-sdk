import { UniswapV2AbstractProvider } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider";
import { PhotonSwapTrade } from "./photon-swap-trade";
export declare class PhotonSwapProvider extends UniswapV2AbstractProvider<PhotonSwapTrade> {
    readonly blockchain: "KAVA";
    readonly UniswapV2TradeClass: typeof PhotonSwapTrade;
    readonly providerSettings: import("../../common/uniswap-v2-abstract/models/uniswap-v2-provider-configuration").UniswapV2ProviderConfiguration;
}
