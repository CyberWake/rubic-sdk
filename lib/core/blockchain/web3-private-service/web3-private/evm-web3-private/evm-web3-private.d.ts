import BigNumber from 'bignumber.js';
import { RubicSdkError } from "../../../../../common/errors";
import { BlockchainName } from "../../../models/blockchain-name";
import { EvmTransactionOptions } from "./models/evm-transaction-options";
import { Web3Error } from "../models/web3.error";
import { Web3Private } from "../web3-private";
import { EvmWeb3Pure } from "../../../web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure";
import { WalletProviderCore } from "../../../../sdk/models/wallet-provider";
import Web3 from 'web3';
import { TransactionConfig } from 'web3-core';
import { TransactionReceipt } from 'web3-eth';
import { AbiItem } from 'web3-utils';
export declare class EvmWeb3Private extends Web3Private {
    /**
     * Parses web3 error by its code or message.
     * @param err Web3 error to parse.
     */
    static parseError(err: Web3Error): RubicSdkError;
    private static tryParseProxyError;
    protected readonly Web3Pure: typeof EvmWeb3Pure;
    /**
     * Instance of web3, initialized with ethereum wallet, e.g. Metamask, WalletConnect.
     */
    readonly web3: Web3;
    constructor(walletProviderCore: WalletProviderCore<Web3>);
    getBlockchainName(): Promise<BlockchainName | undefined>;
    /**
     * Sends Eth in transaction and resolve the promise when the transaction is included in the block.
     * @param toAddress Eth receiver address.
     * @param [options] Additional options.
     * @returns Transaction receipt.
     */
    sendTransaction(toAddress: string, options?: EvmTransactionOptions): Promise<TransactionReceipt>;
    /**
     * Tries to send Eth in transaction and resolve the promise when the transaction is included in the block or rejects the error.
     * @param toAddress Eth receiver address.
     * @param [options] Additional options.
     * @returns Transaction receipt.
     */
    trySendTransaction(toAddress: string, options?: EvmTransactionOptions): Promise<TransactionReceipt>;
    /**
     * Executes method of smart-contract and resolve the promise when the transaction is included in the block.
     * @param contractAddress Address of smart-contract which method is to be executed.
     * @param contractAbi Abi of smart-contract which method is to be executed.
     * @param methodName Method name to execute.
     * @param methodArguments Method arguments.
     * @param [options] Additional options.
     * @returns Smart-contract method returned value.
     */
    executeContractMethod(contractAddress: string, contractAbi: AbiItem[], methodName: string, methodArguments: unknown[], options?: EvmTransactionOptions): Promise<TransactionReceipt>;
    /**
     * Tries to execute method of smart-contract and resolve the promise when the transaction is included in the block or rejects the error.
     * @param contractAddress Address of smart-contract which method is to be executed.
     * @param contractAbi Abi of smart-contract which method is to be executed.
     * @param methodName Method name to execute.
     * @param methodArguments Method arguments.
     * @param [options] Additional options.
     * @param allowError Check error and decides to execute contact if error is allowed.
     */
    tryExecuteContractMethod(contractAddress: string, contractAbi: AbiItem[], methodName: string, methodArguments: unknown[], options?: EvmTransactionOptions, allowError?: (err: Web3Error) => boolean): Promise<TransactionReceipt>;
    private shouldIgnoreError;
    /**
     * Executes approve method in ERC-20 token contract.
     * @param tokenAddress Address of the smart-contract corresponding to the token.
     * @param spenderAddress Wallet or contract address to approve.
     * @param amount Token amount to approve in wei.
     * @param [options] Additional options.
     * @returns Approval transaction receipt.
     */
    approveTokens(tokenAddress: string, spenderAddress: string, amount?: BigNumber | 'infinity', options?: EvmTransactionOptions): Promise<TransactionReceipt>;
    /**
     * Build encoded approve transaction config.
     * @param tokenAddress Address of the smart-contract corresponding to the token.
     * @param spenderAddress Wallet or contract address to approve.
     * @param value Amount of tokens in approval window in spending cap field
     * @param [options] Additional options.
     * @returns Encoded approve transaction config.
     */
    encodeApprove(tokenAddress: string, spenderAddress: string, value: BigNumber | 'infinity', options?: EvmTransactionOptions): Promise<TransactionConfig>;
}
