import { UniswapV2AbstractProvider } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider";
import { SushiSwapEthereumPowTrade } from "./sushi-swap-ethereum-pow-trade";
export declare class SushiSwapEthereumPowProvider extends UniswapV2AbstractProvider<SushiSwapEthereumPowTrade> {
    readonly blockchain: "ETHW";
    readonly UniswapV2TradeClass: typeof SushiSwapEthereumPowTrade;
    readonly providerSettings: import("../../common/uniswap-v2-abstract/models/uniswap-v2-provider-configuration").UniswapV2ProviderConfiguration;
}
