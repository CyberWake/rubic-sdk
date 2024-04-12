import { EvmBlockchainName } from "../../../../../../core/blockchain/models/blockchain-name";
export declare const bridgersCrossChainSupportedBlockchains: readonly ["ETH", "BSC", "POLYGON", "FANTOM", "TRON"];
export type BridgersCrossChainSupportedBlockchain = (typeof bridgersCrossChainSupportedBlockchains)[number];
export type BridgersEvmCrossChainSupportedBlockchain = BridgersCrossChainSupportedBlockchain & EvmBlockchainName;
