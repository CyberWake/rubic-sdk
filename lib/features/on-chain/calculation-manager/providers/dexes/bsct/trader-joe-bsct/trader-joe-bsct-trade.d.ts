import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { UniswapV2AbstractTrade } from "../../common/uniswap-v2-abstract/uniswap-v2-abstract-trade";
export declare class TraderJoeBsctTrade extends UniswapV2AbstractTrade {
    static get type(): OnChainTradeType;
    readonly dexContractAddress = "0xf7C6d73336f333b63144644944176072D94128F5";
    static readonly contractAbi: import("web3-utils").AbiItem[];
    static readonly swapMethods: import("../../common/uniswap-v2-abstract/constants/SWAP_METHOD").ExactInputOutputSwapMethodsList;
}
