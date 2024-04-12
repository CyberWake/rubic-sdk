import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { UniswapV2AbstractTrade } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-trade";
export declare class TradeHarmonySwapTrade extends UniswapV2AbstractTrade {
    static readonly contractAbi: import("web3-utils").AbiItem[];
    static readonly swapMethods: import("../../common/uniswap-v2-abstract/constants/SWAP_METHOD").ExactInputOutputSwapMethodsList;
    static get type(): OnChainTradeType;
    readonly dexContractAddress = "0x24ad62502d1C652Cc7684081169D04896aC20f30";
}
