import { UniswapV2AbstractProvider } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider";
import { ZappyTrade } from "./trisolaris-aurora-trade";
export declare class ZappyProvider extends UniswapV2AbstractProvider<ZappyTrade> {
    readonly blockchain: "TELOS";
    readonly UniswapV2TradeClass: typeof ZappyTrade;
    readonly providerSettings: import("../../common/uniswap-v2-abstract/models/uniswap-v2-provider-configuration").UniswapV2ProviderConfiguration;
}
