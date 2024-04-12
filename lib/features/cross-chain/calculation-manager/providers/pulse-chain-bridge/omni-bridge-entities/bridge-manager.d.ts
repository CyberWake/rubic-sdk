import { Token } from "../../../../../../common/tokens";
import { PulseChainCrossChainSupportedBlockchain } from "../constants/pulse-chain-supported-blockchains";
import { ForeignBridge } from "./foreign-bridge";
import { HomeBridge } from "./home-bridge";
export declare class BridgeManager {
    static createBridge(fromToken: Token<PulseChainCrossChainSupportedBlockchain>, toToken: Token<PulseChainCrossChainSupportedBlockchain>): ForeignBridge | HomeBridge;
}
