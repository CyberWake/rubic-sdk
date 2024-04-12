import { UniswapV2AbstractProvider } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider";
import { PulseXV1Trade } from "./pulsex-v1-trade";
export declare class PulseXV1Provider extends UniswapV2AbstractProvider<PulseXV1Trade> {
    readonly blockchain: "PULSECHAIN";
    readonly UniswapV2TradeClass: typeof PulseXV1Trade;
    readonly providerSettings: import("../../common/uniswap-v2-abstract/models/uniswap-v2-provider-configuration").UniswapV2ProviderConfiguration;
}
