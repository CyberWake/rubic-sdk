import BigNumber from 'bignumber.js';
import { Token, TokenAmount } from "../../common/tokens";
import { TokenBaseStruct } from "../../common/tokens/models/token-base-struct";
import { BlockchainName, EvmBlockchainName } from "../../core/blockchain/models/blockchain-name";
import { EvmBasicTransactionOptions } from "../../core/blockchain/web3-private-service/web3-private/evm-web3-private/models/evm-basic-transaction-options";
import { SwapTransactionOptions } from "../common/models/swap-transaction-options";
import { LimitOrder } from "./models/limit-order";
import { LimitOrderManagerOptions } from "./models/manager-options";
import { LimitOrderSupportedBlockchain } from "./models/supported-blockchains";
import { TransactionReceipt } from 'web3-eth';
export declare class LimitOrderManager {
    static isSupportedBlockchain(blockchain: BlockchainName): blockchain is LimitOrderSupportedBlockchain;
    private readonly apiService;
    private get web3Private();
    private get walletAddress();
    private getWeb3Public;
    private checkWalletConnected;
    needApprove(fromToken: Token<EvmBlockchainName> | TokenBaseStruct<EvmBlockchainName>, fromAmount: BigNumber | string | number): Promise<boolean>;
    approve(fromToken: Token<EvmBlockchainName> | TokenBaseStruct<EvmBlockchainName>, fromAmount: BigNumber | string | number, options: EvmBasicTransactionOptions, checkNeedApprove?: boolean): Promise<TransactionReceipt>;
    private checkAllowanceAndApprove;
    createOrder(fromToken: Token<EvmBlockchainName> | TokenBaseStruct<EvmBlockchainName>, toToken: string | Token<EvmBlockchainName> | TokenBaseStruct<EvmBlockchainName>, fromAmount: BigNumber | string | number, toAmount: BigNumber | string | number, options: LimitOrderManagerOptions): Promise<string>;
    private getLimitOrderPredicate;
    getUserTrades(userAddress: string): Promise<LimitOrder[]>;
    cancelOrder(blockchain: EvmBlockchainName, orderHash: string, options?: SwapTransactionOptions): Promise<string>;
    private getCancelCallData;
    fillOrder(takingToken: TokenAmount<EvmBlockchainName>, orderHash: string, options?: SwapTransactionOptions): Promise<string>;
    private getFillCallData;
}
