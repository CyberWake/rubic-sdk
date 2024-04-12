import { UniswapV2AbstractProvider } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider";
import { SushiSwapTelosTrade } from "./sushi-swap-telos-trade";
export declare class SushiSwapTelosProvider extends UniswapV2AbstractProvider<SushiSwapTelosTrade> {
    readonly blockchain: "TELOS";
    readonly UniswapV2TradeClass: typeof SushiSwapTelosTrade;
    readonly providerSettings: import("../../common/uniswap-v2-abstract/models/uniswap-v2-provider-configuration").UniswapV2ProviderConfiguration;
}
