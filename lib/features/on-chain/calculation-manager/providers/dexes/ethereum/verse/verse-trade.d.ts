import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { UniswapV2AbstractTrade } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-trade";
export declare class VerseTrade extends UniswapV2AbstractTrade {
    static get type(): OnChainTradeType;
    readonly dexContractAddress = "0xB4B0ea46Fe0E9e8EAB4aFb765b527739F2718671";
}
