import { UniswapV2AbstractProvider } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider";
import { PegasysTrade } from "./pegasys-trade";
export declare class PegasysProvider extends UniswapV2AbstractProvider<PegasysTrade> {
    readonly blockchain: "SYSCOIN";
    readonly UniswapV2TradeClass: typeof PegasysTrade;
    readonly providerSettings: import("../../common/uniswap-v2-abstract/models/uniswap-v2-provider-configuration").UniswapV2ProviderConfiguration;
}
