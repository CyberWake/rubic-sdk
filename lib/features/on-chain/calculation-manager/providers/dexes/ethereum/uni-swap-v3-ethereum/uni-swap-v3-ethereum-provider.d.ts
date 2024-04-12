import { UniswapV3AbstractProvider } from "../../common/uniswap-v3-abstract/uniswap-v3-abstract-provider";
import { UniswapV3QuoterController } from "../../common/uniswap-v3-abstract/utils/quoter-controller/uniswap-v3-quoter-controller";
import { UniSwapV3EthereumTrade } from "./uni-swap-v3-ethereum-trade";
export declare class UniSwapV3EthereumProvider extends UniswapV3AbstractProvider<UniSwapV3EthereumTrade> {
    readonly blockchain: "ETH";
    readonly OnChainTradeClass: typeof UniSwapV3EthereumTrade;
    readonly providerConfiguration: import("../../common/uniswap-v3-algebra-abstract/models/uniswap-v3-algebra-provider-configuration").UniswapV3AlgebraProviderConfiguration;
    readonly routerConfiguration: import("../../common/uniswap-v3-abstract/models/uniswap-v3-router-configuration").UniswapV3RouterConfiguration<"WETH" | "USDT" | "USDC" | "DAI" | "WBTC">;
    protected readonly quoterController: UniswapV3QuoterController;
}
