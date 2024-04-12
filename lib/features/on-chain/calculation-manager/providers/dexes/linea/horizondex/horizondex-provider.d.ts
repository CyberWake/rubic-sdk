import { UniswapV3AbstractProvider } from "../../common/uniswap-v3-abstract/uniswap-v3-abstract-provider";
import { HorizondexUniswapV3QuoterController } from "../../common/uniswap-v3-abstract/utils/quoter-controller/horizondex-uniswap-v3-quoter-controller";
import { HorizondexTrade } from "./horizondex-trade";
export declare class HorizondexProvider extends UniswapV3AbstractProvider<HorizondexTrade> {
    readonly blockchain: "LINEA";
    readonly OnChainTradeClass: typeof HorizondexTrade;
    readonly providerConfiguration: import("../../common/uniswap-v3-algebra-abstract/models/uniswap-v3-algebra-provider-configuration").UniswapV3AlgebraProviderConfiguration;
    readonly routerConfiguration: import("../../common/uniswap-v3-abstract/models/uniswap-v3-router-configuration").UniswapV3RouterConfiguration<"MATIC" | "BNB" | "WETH" | "BUSD" | "HZN" | "NFTE">;
    protected readonly quoterController: HorizondexUniswapV3QuoterController;
}
