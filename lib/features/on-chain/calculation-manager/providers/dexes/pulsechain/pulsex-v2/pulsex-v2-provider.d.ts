import { UniswapV2AbstractProvider } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider";
import { PulseXV2Trade } from "./pulsex-v2-trade";
export declare class PulseXV2Provider extends UniswapV2AbstractProvider<PulseXV2Trade> {
    readonly blockchain: "PULSECHAIN";
    readonly UniswapV2TradeClass: typeof PulseXV2Trade;
    readonly providerSettings: import("../../common/uniswap-v2-abstract/models/uniswap-v2-provider-configuration").UniswapV2ProviderConfiguration;
}
