import { MethodData } from "../../../../../../../core/blockchain/web3-public-service/web3-public/models/method-data";
import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { UniswapV3AbstractTrade } from "../../common/uniswap-v3-abstract/uniswap-v3-abstract-trade";
export declare class HorizondexTrade extends UniswapV3AbstractTrade {
    static get type(): OnChainTradeType;
    readonly dexContractAddress = "0x272e156df8da513c69cb41cc7a99185d53f926bb";
    protected readonly contractAbi: import("web3-utils").AbiItem[];
    protected readonly unwrapWethMethodName = "unwrapWeth";
    /**
     * Returns swap `exactInput` method's name and arguments to use in Swap contract.
     */
    protected getSwapRouterExactInputMethodData(walletAddress: string): MethodData;
}
