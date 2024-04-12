import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { UniswapV2AbstractTrade } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-trade";
export declare class ZappyTrade extends UniswapV2AbstractTrade {
    static get type(): OnChainTradeType;
    readonly dexContractAddress = "0xb9239af0697c8efb42cba3568424b06753c6da71";
}
