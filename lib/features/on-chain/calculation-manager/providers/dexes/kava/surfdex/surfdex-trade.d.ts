import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { UniswapV2AbstractTrade } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-trade";
export declare class SurfdexTrade extends UniswapV2AbstractTrade {
    static get type(): OnChainTradeType;
    readonly dexContractAddress = "0x4310ed61E7E4fd50C2b44C92725C087abeB632a2";
}
