import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { UniswapV2AbstractTrade } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-trade";
export declare class WannaSwapAuroraTrade extends UniswapV2AbstractTrade {
    static get type(): OnChainTradeType;
    readonly dexContractAddress = "0xa3a1eF5Ae6561572023363862e238aFA84C72ef5";
}
