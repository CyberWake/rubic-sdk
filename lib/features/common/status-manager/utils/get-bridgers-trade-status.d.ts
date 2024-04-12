import { TxStatusData } from "../models/tx-status-data";
import { BridgersCrossChainSupportedBlockchain } from "../../../cross-chain/calculation-manager/providers/bridgers-provider/constants/bridgers-cross-chain-supported-blockchain";
export declare function getBridgersTradeStatus(srcTxHash: string, fromBlockchain: BridgersCrossChainSupportedBlockchain, sourceFlag: 'rubic' | 'rubic_widget'): Promise<TxStatusData>;
