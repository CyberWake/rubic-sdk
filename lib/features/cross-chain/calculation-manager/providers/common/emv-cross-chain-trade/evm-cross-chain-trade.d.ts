import BigNumber from 'bignumber.js';
import { PriceTokenAmount } from "../../../../../../common/tokens";
import { EvmBlockchainName } from "../../../../../../core/blockchain/models/blockchain-name";
import { EvmWeb3Private } from "../../../../../../core/blockchain/web3-private-service/web3-private/evm-web3-private/evm-web3-private";
import { EvmBasicTransactionOptions } from "../../../../../../core/blockchain/web3-private-service/web3-private/evm-web3-private/models/evm-basic-transaction-options";
import { EvmTransactionOptions } from "../../../../../../core/blockchain/web3-private-service/web3-private/evm-web3-private/models/evm-transaction-options";
import { EvmWeb3Public } from "../../../../../../core/blockchain/web3-public-service/web3-public/evm-web3-public/evm-web3-public";
import { ContractParams } from "../../../../../common/models/contract-params";
import { EncodeTransactionOptions } from "../../../../../common/models/encode-transaction-options";
import { SwapTransactionOptions } from "../../../../../common/models/swap-transaction-options";
import { CrossChainTrade } from "../cross-chain-trade";
import { GasData } from "./models/gas-data";
import { GetContractParamsOptions } from "../models/get-contract-params-options";
import { TransactionConfig } from 'web3-core';
import { TransactionReceipt } from 'web3-eth';
export declare abstract class EvmCrossChainTrade extends CrossChainTrade {
    abstract readonly from: PriceTokenAmount<EvmBlockchainName>;
    /**
     * Gas fee info in source blockchain.
     */
    abstract readonly gasData: GasData;
    protected get fromWeb3Public(): EvmWeb3Public;
    protected get web3Private(): EvmWeb3Private;
    /**
     * Gets gas fee in source blockchain.
     */
    get estimatedGas(): BigNumber | null;
    approve(options: EvmBasicTransactionOptions, checkNeedApprove?: boolean, amount?: BigNumber | 'infinity'): Promise<TransactionReceipt>;
    protected checkAllowanceAndApprove(options?: Omit<SwapTransactionOptions, 'onConfirm' | 'gasLimit'>): Promise<void>;
    protected abstract swapDirect(options?: SwapTransactionOptions): Promise<string | never>;
    /**
     *
     * @returns txHash(srcTxHash) | never
     */
    swap(options?: SwapTransactionOptions): Promise<string | never>;
    private swapWithParams;
    encode(options: EncodeTransactionOptions): Promise<TransactionConfig>;
    encodeApprove(tokenAddress: string, spenderAddress: string, value: BigNumber | 'infinity', options?: EvmTransactionOptions): Promise<TransactionConfig>;
    protected abstract getContractParams(options: GetContractParamsOptions, skipAmountChangeCheck?: boolean): Promise<ContractParams>;
    getUsdPrice(providerFeeToken?: BigNumber): BigNumber;
}
