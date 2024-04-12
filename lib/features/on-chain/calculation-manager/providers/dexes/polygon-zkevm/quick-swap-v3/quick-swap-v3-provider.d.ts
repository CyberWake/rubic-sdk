import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { QuickswapV3QuoterController } from "../../common/quickswap-v3/quickswap-v3-quoter-controller";
import { UniswapV3AlgebraTradeStructOmitPath } from "../../common/uniswap-v3-algebra-abstract/models/uniswap-v3-algebra-trade-struct";
import { UniswapV3AlgebraAbstractProvider } from "../../common/uniswap-v3-algebra-abstract/uniswap-v3-algebra-abstract-provider";
import { QuickSwapV3Route } from "../../polygon/quick-swap-v3/models/quick-swap-v3-route";
import { QuickSwapV3PolygonZKEVMTrade } from "./quick-swap-v3-trade";
export declare class QuickSwapV3PolygonZKEVMProvider extends UniswapV3AlgebraAbstractProvider<QuickSwapV3PolygonZKEVMTrade> {
    protected readonly contractAddress = "0xf6ad3ccf71abb3e12becf6b3d2a74c963859adcd";
    protected readonly contractAbi: import("web3-utils").AbiItem[];
    readonly blockchain: "POLYGON_ZKEVM";
    protected readonly OnChainTradeClass: typeof QuickSwapV3PolygonZKEVMTrade;
    protected readonly quoterController: QuickswapV3QuoterController;
    readonly providerConfiguration: import("../../common/uniswap-v3-algebra-abstract/models/uniswap-v3-algebra-provider-configuration").UniswapV3AlgebraProviderConfiguration;
    get type(): OnChainTradeType;
    protected createTradeInstance(tradeStruct: UniswapV3AlgebraTradeStructOmitPath, route: QuickSwapV3Route, providerAddress: string): QuickSwapV3PolygonZKEVMTrade;
}
