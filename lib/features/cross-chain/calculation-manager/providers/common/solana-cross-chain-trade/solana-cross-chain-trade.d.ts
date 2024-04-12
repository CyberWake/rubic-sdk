import BigNumber from 'bignumber.js';
import { PriceTokenAmount } from "../../../../../../common/tokens";
import { SolanaBlockchainName } from "../../../../../../core/blockchain/models/blockchain-name";
import { EvmBasicTransactionOptions } from "../../../../../../core/blockchain/web3-private-service/web3-private/evm-web3-private/models/evm-basic-transaction-options";
import { EvmTransactionOptions } from "../../../../../../core/blockchain/web3-private-service/web3-private/evm-web3-private/models/evm-transaction-options";
import { SolanaWeb3Private } from "../../../../../../core/blockchain/web3-private-service/web3-private/solana-web3-private/solana-web3-private";
import { SolanaWeb3Public } from "../../../../../../core/blockchain/web3-public-service/web3-public/solana-web3-public/solana-web3-public";
import { ContractParams } from "../../../../../common/models/contract-params";
import { EncodeTransactionOptions } from "../../../../../common/models/encode-transaction-options";
import { SwapTransactionOptions } from "../../../../../common/models/swap-transaction-options";
import { CrossChainTrade } from "../cross-chain-trade";
import { GetContractParamsOptions } from "../models/get-contract-params-options";
import { TransactionConfig } from 'web3-core';
import { TransactionReceipt } from 'web3-eth';
export declare abstract class SolanaCrossChainTrade extends CrossChainTrade {
    abstract readonly from: PriceTokenAmount<SolanaBlockchainName>;
    protected get fromWeb3Public(): SolanaWeb3Public;
    protected get web3Private(): SolanaWeb3Private;
    /**
     * Gets gas fee in source blockchain.
     */
    get estimatedGas(): BigNumber | null;
    approve(_options: EvmBasicTransactionOptions, _checkNeedApprove?: boolean, _amount?: BigNumber | 'infinity'): Promise<TransactionReceipt>;
    protected checkAllowanceAndApprove(options?: Omit<SwapTransactionOptions, 'onConfirm' | 'gasLimit'>): Promise<void>;
    protected abstract swapDirect(options?: SwapTransactionOptions): Promise<string | never>;
    /**
     *
     * @returns txHash(srcTxHash) | never
     */
    swap(options?: SwapTransactionOptions): Promise<string | never>;
    private swapWithParams;
    encode(options: EncodeTransactionOptions): Promise<TransactionConfig>;
    encodeApprove(_tokenAddress: string, _spenderAddress: string, _value: BigNumber | 'infinity', _options?: EvmTransactionOptions): Promise<TransactionConfig>;
    protected abstract getContractParams(options: GetContractParamsOptions): Promise<ContractParams>;
    getUsdPrice(providerFeeToken?: BigNumber): BigNumber;
}
