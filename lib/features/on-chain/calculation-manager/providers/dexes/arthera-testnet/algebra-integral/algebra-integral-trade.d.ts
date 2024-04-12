import { Token } from "../../../../../../../common/tokens";
import { MethodData } from "../../../../../../../core/blockchain/web3-public-service/web3-public/models/method-data";
import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { UniswapV3AlgebraAbstractTrade } from "../../common/uniswap-v3-algebra-abstract/uniswap-v3-algebra-abstract-trade";
import { AlgebraIntegralTradeStruct } from './models/algebra-integral-trade-struct';
export declare class AlgebraIntegralTrade extends UniswapV3AlgebraAbstractTrade {
    static get type(): OnChainTradeType;
    readonly dexContractAddress = "0xa77aD9f635a3FB3bCCC5E6d1A87cB269746Aba17";
    protected readonly contractAbi: import("web3-utils").AbiItem[];
    protected readonly unwrapWethMethodName = "unwrapWNativeToken";
    private readonly route;
    readonly wrappedPath: ReadonlyArray<Token>;
    constructor(tradeStruct: AlgebraIntegralTradeStruct, providerAddress: string);
    /**
     * Returns swap `exactInput` method's name and arguments to use in Swap contract.
     */
    protected getSwapRouterExactInputMethodData(walletAddress: string): MethodData;
}
