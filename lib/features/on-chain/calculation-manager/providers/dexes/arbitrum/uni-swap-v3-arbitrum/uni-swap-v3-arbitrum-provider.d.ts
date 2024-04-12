import { UniSwapV3ArbitrumTrade } from "./uni-swap-v3-arbitrum-trade";
import { UniswapV3AbstractProvider } from "../../common/uniswap-v3-abstract/uniswap-v3-abstract-provider";
import { UniswapV3QuoterController } from "../../common/uniswap-v3-abstract/utils/quoter-controller/uniswap-v3-quoter-controller";
export declare class UniSwapV3ArbitrumProvider extends UniswapV3AbstractProvider<UniSwapV3ArbitrumTrade> {
    readonly blockchain: "ARBITRUM";
    protected readonly OnChainTradeClass: typeof UniSwapV3ArbitrumTrade;
    protected readonly providerConfiguration: import("../../common/uniswap-v3-algebra-abstract/models/uniswap-v3-algebra-provider-configuration").UniswapV3AlgebraProviderConfiguration;
    protected readonly routerConfiguration: import("../../common/uniswap-v3-abstract/models/uniswap-v3-router-configuration").UniswapV3RouterConfiguration<"WETH" | "USDC" | "DAI" | "GMX" | "WBTC">;
    protected readonly quoterController: UniswapV3QuoterController;
}
