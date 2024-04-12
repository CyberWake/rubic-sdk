import { CrossChainTrade } from "../providers/common/cross-chain-trade";
import { LifiCrossChainTrade } from "../providers/lifi-provider/lifi-cross-chain-trade";
import { SymbiosisCrossChainTrade } from "../providers/symbiosis-provider/symbiosis-cross-chain-trade";
export declare function isSymbiosisCrossChainTrade(trade: CrossChainTrade): trade is SymbiosisCrossChainTrade;
export declare function isLifiCrossChainTrade(trade: CrossChainTrade): trade is LifiCrossChainTrade;
