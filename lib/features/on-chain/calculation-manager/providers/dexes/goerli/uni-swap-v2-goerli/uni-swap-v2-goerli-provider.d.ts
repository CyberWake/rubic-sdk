import { UniswapV2AbstractProvider } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider";
import { UniSwapV2GoerliTrade } from "./uni-swap-v2-goerli-trade";
export declare class UniSwapV2GoerliProvider extends UniswapV2AbstractProvider<UniSwapV2GoerliTrade> {
    readonly blockchain: "GOERLI";
    readonly UniswapV2TradeClass: typeof UniSwapV2GoerliTrade;
    readonly providerSettings: import("../../common/uniswap-v2-abstract/models/uniswap-v2-provider-configuration").UniswapV2ProviderConfiguration;
}
