import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { UniswapV3Route } from "../../common/uniswap-v3-abstract/models/uniswap-v3-route";
import { UniswapV3QuoterController } from "../../common/uniswap-v3-abstract/utils/quoter-controller/uniswap-v3-quoter-controller";
import { UniswapV3AlgebraTradeStructOmitPath } from "../../common/uniswap-v3-algebra-abstract/models/uniswap-v3-algebra-trade-struct";
import { UniswapV3AlgebraAbstractProvider } from "../../common/uniswap-v3-algebra-abstract/uniswap-v3-algebra-abstract-provider";
import { UniSwapV3ScrollSepoliaTrade } from "./uni-swap-v3-scroll-sepolia-trade";
export declare class UniSwapV3ScrollSepoliaProvider extends UniswapV3AlgebraAbstractProvider<UniSwapV3ScrollSepoliaTrade> {
    readonly contractAddress = "0x59a662Ed724F19AD019307126CbEBdcF4b57d6B1";
    protected readonly contractAbi: import("web3-utils").AbiItem[];
    readonly blockchain: "SCROLL_SEPOLIA";
    readonly OnChainTradeClass: typeof UniSwapV3ScrollSepoliaTrade;
    readonly providerConfiguration: import("../../common/uniswap-v3-algebra-abstract/models/uniswap-v3-algebra-provider-configuration").UniswapV3AlgebraProviderConfiguration;
    readonly routerConfiguration: import("../../common/uniswap-v3-abstract/models/uniswap-v3-router-configuration").UniswapV3RouterConfiguration<"WETH" | "USDC" | "GHO">;
    protected readonly quoterController: UniswapV3QuoterController;
    get type(): OnChainTradeType;
    protected createTradeInstance(tradeStruct: UniswapV3AlgebraTradeStructOmitPath, route: UniswapV3Route, providerAddress: string): UniSwapV3ScrollSepoliaTrade;
    private extractPath;
}
