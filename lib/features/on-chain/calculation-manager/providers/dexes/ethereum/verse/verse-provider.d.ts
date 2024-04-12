import { UniswapV2AbstractProvider } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider";
import { VerseTrade } from "./verse-trade";
export declare class VerseProvider extends UniswapV2AbstractProvider<VerseTrade> {
    readonly blockchain: "ETH";
    readonly UniswapV2TradeClass: typeof VerseTrade;
    readonly providerSettings: import("../../common/uniswap-v2-abstract/models/uniswap-v2-provider-configuration").UniswapV2ProviderConfiguration;
}
