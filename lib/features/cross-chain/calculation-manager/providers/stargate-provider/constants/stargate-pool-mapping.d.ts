import { StargateBridgeToken } from "./stargate-bridge-token";
import { StargateCrossChainSupportedBlockchain } from "./stargate-cross-chain-supported-blockchain";
type StargatePoolMapping = Record<StargateCrossChainSupportedBlockchain, Partial<Record<StargateBridgeToken, Partial<Record<StargateCrossChainSupportedBlockchain, StargateBridgeToken[]>>>>>;
export declare const stargatePoolMapping: StargatePoolMapping;
export {};
