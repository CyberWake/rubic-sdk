import { TrisolarisAuroraTrade } from "./trisolaris-aurora-trade";
import { UniswapV2AbstractProvider } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider";
export declare class TrisolarisAuroraProvider extends UniswapV2AbstractProvider<TrisolarisAuroraTrade> {
    readonly blockchain: "AURORA";
    readonly UniswapV2TradeClass: typeof TrisolarisAuroraTrade;
    readonly providerSettings: import("../../common/uniswap-v2-abstract/models/uniswap-v2-provider-configuration").UniswapV2ProviderConfiguration;
}
