import { UniswapV2AbstractProvider } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider";
import { ClaimSwapTrade } from "./claim-swap-trade";
export declare class ClaimSwapProvider extends UniswapV2AbstractProvider<ClaimSwapTrade> {
    readonly blockchain: "KLAYTN";
    readonly UniswapV2TradeClass: typeof ClaimSwapTrade;
    readonly providerSettings: import("../../common/uniswap-v2-abstract/models/uniswap-v2-provider-configuration").UniswapV2ProviderConfiguration;
}
