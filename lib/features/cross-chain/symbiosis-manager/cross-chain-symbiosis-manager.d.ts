import { SwapTransactionOptions } from "../../common/models/swap-transaction-options";
import { SymbiosisStuckedResponse } from "./models/symbiosis-stucked-api";
import { TransactionReceipt } from 'web3-eth';
export declare class CrossChainSymbiosisManager {
    private get web3Private();
    private get walletAddress();
    getUserTrades(fromAddress?: string): Promise<SymbiosisStuckedResponse[]>;
    private getSymbiosisStuckedTrades;
    revertTrade(revertTransactionHash: string, options?: SwapTransactionOptions): Promise<TransactionReceipt>;
    private getRevertTransactionRequest;
}
