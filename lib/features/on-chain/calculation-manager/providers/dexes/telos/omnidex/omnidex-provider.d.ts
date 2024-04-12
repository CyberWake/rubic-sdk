import { UniswapV2AbstractProvider } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider";
import { OmnidexTrade } from "./omnidex-trade";
export declare class OmnidexProvider extends UniswapV2AbstractProvider<OmnidexTrade> {
    readonly blockchain: "TELOS";
    readonly UniswapV2TradeClass: typeof OmnidexTrade;
    readonly providerSettings: import("../../common/uniswap-v2-abstract/models/uniswap-v2-provider-configuration").UniswapV2ProviderConfiguration;
}
