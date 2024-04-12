import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { UniswapV2AbstractTrade } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-trade";
export declare class QuickSwapTrade extends UniswapV2AbstractTrade {
    static get type(): OnChainTradeType;
    readonly dexContractAddress = "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff";
}
