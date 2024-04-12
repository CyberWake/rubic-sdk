import { UniswapV3AbstractProvider } from "../../common/uniswap-v3-abstract/uniswap-v3-abstract-provider";
import { UniswapV3QuoterController } from "../../common/uniswap-v3-abstract/utils/quoter-controller/uniswap-v3-quoter-controller";
import { UniSwapV3EthereumPowTrade } from "./uni-swap-v3-ethereum-pow-trade";
export declare class UniSwapV3EthereumPowProvider extends UniswapV3AbstractProvider<UniSwapV3EthereumPowTrade> {
    readonly blockchain: "ETHW";
    readonly OnChainTradeClass: typeof UniSwapV3EthereumPowTrade;
    readonly providerConfiguration: import("../../common/uniswap-v3-algebra-abstract/models/uniswap-v3-algebra-provider-configuration").UniswapV3AlgebraProviderConfiguration;
    readonly routerConfiguration: import("../../common/uniswap-v3-abstract/models/uniswap-v3-router-configuration").UniswapV3RouterConfiguration<"WETH" | "USDT" | "USDC" | "DAI" | "WBTC">;
    protected readonly quoterController: UniswapV3QuoterController;
}
