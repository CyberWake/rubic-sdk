import { BlockchainName } from "../../../../../core/blockchain/models/blockchain-name";
import { CrossChainTrade } from "../common/cross-chain-trade";
import { RubicStep } from "../common/models/rubicStep";
import { DebridgeCrossChainTradeConstructor } from "./models/debridge-cross-chain-trade-constructor";
export declare class DebridgeCrossChainFactory {
    static createTrade(fromBlockchain: BlockchainName, constructorParams: DebridgeCrossChainTradeConstructor<BlockchainName>, providerAddress: string, routePath: RubicStep[]): CrossChainTrade;
}
