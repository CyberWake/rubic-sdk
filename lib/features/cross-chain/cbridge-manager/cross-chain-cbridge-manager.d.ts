import { CbridgeCrossChainSupportedBlockchain } from "../calculation-manager/providers/cbridge/constants/cbridge-supported-blockchains";
import { TransactionReceipt } from 'web3-eth';
export declare class CrossChainCbridgeManager {
    static getTransferId(sourceTransaction: string, fromBlockchain: CbridgeCrossChainSupportedBlockchain): Promise<string>;
    static makeRefund(fromBlockchain: CbridgeCrossChainSupportedBlockchain, sourceTransaction: string, estimateAmount: string, onTransactionHash: (hash: string) => void): Promise<TransactionReceipt | null>;
    private static transferRefund;
}
