import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { UniswapV3AbstractTrade } from "../../common/uniswap-v3-abstract/uniswap-v3-abstract-trade";
export declare class FusionXTrade extends UniswapV3AbstractTrade {
    get type(): OnChainTradeType;
    readonly dexContractAddress = "0x5989FB161568b9F133eDf5Cf6787f5597762797F";
    protected readonly contractAbi: import("web3-utils").AbiItem[];
}
