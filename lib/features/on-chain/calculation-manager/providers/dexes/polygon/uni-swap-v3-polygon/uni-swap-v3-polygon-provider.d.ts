import { UniswapV3AbstractProvider } from "../../common/uniswap-v3-abstract/uniswap-v3-abstract-provider";
import { UniswapV3QuoterController } from "../../common/uniswap-v3-abstract/utils/quoter-controller/uniswap-v3-quoter-controller";
import { UniSwapV3PolygonTrade } from "./uni-swap-v3-polygon-trade";
export declare class UniSwapV3PolygonProvider extends UniswapV3AbstractProvider<UniSwapV3PolygonTrade> {
    readonly blockchain: "POLYGON";
    protected readonly OnChainTradeClass: typeof UniSwapV3PolygonTrade;
    protected readonly providerConfiguration: import("../../common/uniswap-v3-algebra-abstract/models/uniswap-v3-algebra-provider-configuration").UniswapV3AlgebraProviderConfiguration;
    protected readonly routerConfiguration: import("../../common/uniswap-v3-abstract/models/uniswap-v3-router-configuration").UniswapV3RouterConfiguration<"WETH" | "WMATIC" | "USDT" | "USDC" | "DAI">;
    protected readonly quoterController: UniswapV3QuoterController;
}
