import { PancakeSwapTestnetTrade } from "./pancake-swap-testnet-trade";
import { UniswapV2AbstractProvider } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider";
export declare class PancakeSwapTestnetProvider extends UniswapV2AbstractProvider<PancakeSwapTestnetTrade> {
    readonly blockchain: "BSCT";
    readonly UniswapV2TradeClass: typeof PancakeSwapTestnetTrade;
    readonly providerSettings: import("../../common/uniswap-v2-abstract/models/uniswap-v2-provider-configuration").UniswapV2ProviderConfiguration;
}
