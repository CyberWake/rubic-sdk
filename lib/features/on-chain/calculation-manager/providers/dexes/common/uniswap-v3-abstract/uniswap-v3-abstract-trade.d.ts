import { MethodData } from "../../../../../../../core/blockchain/web3-public-service/web3-public/models/method-data";
import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { UniswapV3Route } from "./models/uniswap-v3-route";
import { UniswapV3TradeStruct } from "./models/uniswap-v3-trade-struct";
import { UnwrapWethMethodName } from "../uniswap-v3-algebra-abstract/models/unwrapWethMethodName";
import { UniswapV3AlgebraAbstractTrade } from "../uniswap-v3-algebra-abstract/uniswap-v3-algebra-abstract-trade";
export declare abstract class UniswapV3AbstractTrade extends UniswapV3AlgebraAbstractTrade {
    readonly dexContractAddress: string;
    protected readonly contractAbi: import("web3-utils").AbiItem[];
    protected readonly unwrapWethMethodName: UnwrapWethMethodName;
    readonly route: UniswapV3Route;
    static get type(): OnChainTradeType;
    constructor(tradeStruct: UniswapV3TradeStruct, providerAddress: string);
    /**
     * Returns swap `exactInput` method's name and arguments to use in Swap contract.
     */
    protected getSwapRouterExactInputMethodData(walletAddress: string): MethodData;
}
