import { UniswapV3AbstractProvider } from "../../common/uniswap-v3-abstract/uniswap-v3-abstract-provider";
import { FusionXUniswapV3QuoterController } from "../../common/uniswap-v3-abstract/utils/quoter-controller/fusionx-uniswap-v3-quoter-controller";
import { FusionXTrade } from "./fusionx-trade";
export declare class FusionXProvider extends UniswapV3AbstractProvider<FusionXTrade> {
    readonly blockchain: "MANTLE";
    readonly OnChainTradeClass: typeof FusionXTrade;
    readonly providerConfiguration: import("../../common/uniswap-v3-algebra-abstract/models/uniswap-v3-algebra-provider-configuration").UniswapV3AlgebraProviderConfiguration;
    readonly routerConfiguration: import("../../common/uniswap-v3-abstract/models/uniswap-v3-router-configuration").UniswapV3RouterConfiguration<"WETH" | "WMNT" | "USDT" | "USDC" | "WBTC" | "MINU">;
    protected readonly quoterController: FusionXUniswapV3QuoterController;
}
