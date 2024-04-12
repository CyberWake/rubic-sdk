import { UniswapV2AbstractProvider } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider";
import { UniSwapV2EthereumPowTrade } from "./uni-swap-v2-ethereum-pow-trade";
export declare class UniSwapV2EthereumPowProvider extends UniswapV2AbstractProvider<UniSwapV2EthereumPowTrade> {
    readonly blockchain: "ETHW";
    readonly UniswapV2TradeClass: typeof UniSwapV2EthereumPowTrade;
    readonly providerSettings: import("../../common/uniswap-v2-abstract/models/uniswap-v2-provider-configuration").UniswapV2ProviderConfiguration;
}
