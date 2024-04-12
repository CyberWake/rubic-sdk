import { Token } from "../../../../../../../common/tokens";
import { MethodData } from "../../../../../../../core/blockchain/web3-public-service/web3-public/models/method-data";
import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { UniswapV3AlgebraAbstractTrade } from "../../common/uniswap-v3-algebra-abstract/uniswap-v3-algebra-abstract-trade";
import { AlgebraTradeStruct } from "./models/algebra-trade-struct";
export declare class AlgebraTrade extends UniswapV3AlgebraAbstractTrade {
    static get type(): OnChainTradeType;
    readonly dexContractAddress = "0x89D6B81A1Ef25894620D05ba843d83B0A296239e";
    protected readonly contractAbi: import("web3-utils").AbiItem[];
    protected readonly unwrapWethMethodName = "unwrapWNativeToken";
    private readonly route;
    readonly wrappedPath: ReadonlyArray<Token>;
    constructor(tradeStruct: AlgebraTradeStruct, providerAddress: string);
    /**
     * Returns swap `exactInput` method's name and arguments to use in Swap contract.
     */
    protected getSwapRouterExactInputMethodData(walletAddress: string): MethodData;
}
