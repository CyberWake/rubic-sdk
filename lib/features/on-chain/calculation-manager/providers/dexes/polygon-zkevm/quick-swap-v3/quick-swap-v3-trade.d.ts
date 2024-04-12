import { Token } from "../../../../../../../common/tokens";
import { MethodData } from "../../../../../../../core/blockchain/web3-public-service/web3-public/models/method-data";
import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { UniswapV3AlgebraAbstractTrade } from "../../common/uniswap-v3-algebra-abstract/uniswap-v3-algebra-abstract-trade";
import { QuickSwapV3TradeStruct } from "../../polygon/quick-swap-v3/models/quick-swap-v3-trade-struct";
export declare class QuickSwapV3PolygonZKEVMTrade extends UniswapV3AlgebraAbstractTrade {
    static get type(): OnChainTradeType;
    readonly dexContractAddress = "0xf6ad3ccf71abb3e12becf6b3d2a74c963859adcd";
    protected readonly contractAbi: import("web3-utils").AbiItem[];
    protected readonly unwrapWethMethodName = "unwrapWNativeToken";
    private readonly route;
    readonly wrappedPath: ReadonlyArray<Token>;
    constructor(tradeStruct: QuickSwapV3TradeStruct, providerAddress: string);
    /**
     * Returns swap `exactInput` method's name and arguments to use in Swap contract.
     */
    protected getSwapRouterExactInputMethodData(walletAddress: string): MethodData;
}
