import { BlockchainName } from "../../../../../../core/blockchain/models/blockchain-name";
import { DlnOnChainSupportedBlockchain } from "./constants/dln-on-chain-supported-blockchains";
import { DlnTradeStruct } from "./models/dln-trade-struct";
import { OnChainTrade } from "../../common/on-chain-trade/on-chain-trade";
export declare class DlnOnChainFactory {
    static createTrade(fromBlockchain: BlockchainName, tradeStruct: DlnTradeStruct<DlnOnChainSupportedBlockchain>, providerAddress: string): OnChainTrade;
}
