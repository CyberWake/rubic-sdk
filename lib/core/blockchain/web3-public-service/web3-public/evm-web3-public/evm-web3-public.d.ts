import BigNumber from 'bignumber.js';
import { EvmBlockchainName } from "../../../models/blockchain-name";
import { Web3PrimitiveType } from "../../../models/web3-primitive-type";
import { BatchCall } from "./models/batch-call";
import { ContractMulticallResponse } from "../models/contract-multicall-response";
import { MethodData } from "../models/method-data";
import { SupportedTokenField } from "../models/supported-token-field";
import { TxStatus } from "../models/tx-status";
import { Web3Public } from "../web3-public";
import { HttpClient } from "../../../../http-client/models/http-client";
import Web3 from 'web3';
import { BlockNumber, provider as Provider } from 'web3-core';
import { BlockTransactionString, TransactionReceipt } from 'web3-eth';
import { EventData } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import { GasPrice } from './models/gas-price';
/**
 * Class containing methods for calling contracts in order to obtain information from the blockchain.
 * To send transaction or execute contract method use {@link Web3Private}.
 */
export declare class EvmWeb3Public extends Web3Public {
    private readonly web3;
    private httpClient?;
    protected readonly tokenContractAbi: AbiItem[];
    get web3Provider(): Web3;
    constructor(web3: Web3, blockchainName: EvmBlockchainName, httpClient?: HttpClient | undefined);
    setProvider(provider: Provider): void;
    healthCheck(timeoutMs?: number): Promise<boolean>;
    getBalance(userAddress: string, tokenAddress?: string): Promise<BigNumber>;
    getTokenBalance(userAddress: string, tokenAddress: string): Promise<BigNumber>;
    getAllowance(tokenAddress: string, ownerAddress: string, spenderAddress: string): Promise<BigNumber>;
    multicallContractsMethods<Output extends Web3PrimitiveType>(contractAbi: AbiItem[], contractsData: {
        contractAddress: string;
        methodsData: MethodData[];
    }[]): Promise<ContractMulticallResponse<Output>[][]>;
    private allowMultipleRequests;
    /**
     * Executes multiple calls in the single contract call.
     * @param calls Multicall calls data list.
     * @returns Result of calls execution.
     */
    private multicall;
    private multicallContractsMethodsByOne;
    callContractMethod<T extends Web3PrimitiveType = string>(contractAddress: string, contractAbi: AbiItem[], methodName: string, methodArguments?: unknown[], options?: {
        from?: string;
        value?: string;
        gasPrice?: string;
        gas?: string;
    }): Promise<T>;
    /**
     * Predicts the volume of gas required to execute the contract method.
     * @param contractAbi Abi of smart-contract.
     * @param contractAddress Address of smart-contract.
     * @param methodName Method which execution gas limit is to be calculated.
     * @param methodArguments Arguments of the contract method.
     * @param fromAddress The address for which the gas calculation will be called.
     * @param value The value transferred for the call “transaction” in wei.
     * @returns Estimated gas limit.
     */
    getEstimatedGas(contractAbi: AbiItem[], contractAddress: string, methodName: string, methodArguments: unknown[], fromAddress: string, value?: string | BigNumber): Promise<BigNumber | null>;
    getEstimatedGasByData(fromAddress: string, toAddress: string, options: {
        from?: string;
        value?: string;
        gasPrice?: string;
        gas?: string;
        data: string;
    }): Promise<BigNumber | null>;
    /**
     * Get estimated gas of several contract method executions via rpc batch request.
     * @param fromAddress Sender address.
     * @param callsData Transactions parameters.
     * @returns List of contract execution estimated gases.
     * If the execution of the method in the real blockchain would not be reverted,
     * then the list item would be equal to the predicted gas limit.
     * Else (if you have not enough balance, allowance ...) then the list item would be equal to null.
     */
    batchEstimatedGas(fromAddress: string, callsData: BatchCall[]): Promise<(BigNumber | null)[]>;
    /**
     * Sends batch request to rpc provider directly.
     * @see {@link https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/ethereum/eth1.0-apis/assembled-spec/openrpc.json&uiSchema%5BappBar%5D%5Bui:splitView%5D=false&uiSchema%5BappBar%5D%5Bui:input%5D=false&uiSchema%5BappBar%5D%5Bui:examplesDropdown%5D=false|EthereumJSON-RPC}
     * @param rpcCallsData Rpc methods and parameters list.
     * @returns Rpc batch request call result sorted in order of input parameters.
     */
    private rpcBatchRequest;
    /**
     * Returns httpClient if it exists or imports the axios client.
     */
    private getHttpClient;
    /**
     * Gets mined transaction receipt.
     * @param hash Transaction hash
     */
    getTransactionReceipt(hash: string): Promise<TransactionReceipt>;
    getTransactionStatus(hash: string): Promise<TxStatus>;
    /**
     * Calculates the average price per unit of gas according to web3.
     * @returns Average gas price in wei.
     */
    getGasPrice(): Promise<string>;
    /**
     * Estimates average maxPriorityFeePerGas for EIP-1559 transactions based on last 20 blocks.
     * @see {@link https://docs.alchemy.com/docs/how-to-build-a-gas-fee-estimator-using-eip-1559}
     * @returns Average maxPriorityFeePerGas in wei
     */
    getMaxPriorityFeePerGas(): Promise<number>;
    /**
     * Calculates EIP-1559 specific gas details.
     * @see {@link https://github.com/ethers-io/ethers.js/blob/master/packages/abstract-provider/src.ts/index.ts#L235}
     * @returns block baseFee, average maxPriorityFeePerGas, and maxFeePerGas.
     */
    getPriorityFeeGas(): Promise<GasPrice>;
    /**
     * Calculates base fee for a given block, based on EIP-1559 base fee formula
     * @see {@link https://eips.ethereum.org/EIPS/eip-1559}
     * @param block Block details
     * @returns Base fee for a given block
     */
    private getBaseFee;
    /**
     * Gets block by block id.
     * @param [blockId] Block id: hash, number ... Default is 'latest'.
     * @returns Block by blockId parameter.
     */
    getBlock(blockId?: BlockNumber | string): Promise<BlockTransactionString>;
    getBlockNumber(): Promise<number>;
    getPastEvents(contractAddress: string, contractAbi: AbiItem[], eventName: string, options: {
        blocksAmount: number;
        toBlock: number | 'latest';
    }): Promise<EventData[]>;
    /**
     * Will call smart contract method in the EVM without sending any transaction.
     * @param contractAddress Contract address.
     * @param contractAbi Contract ABI.
     * @param methodName Method name.
     * @param methodArguments Method arguments.
     * @param options Sender address and value.
     * @returns Transaction receipt.
     */
    staticCallContractMethod(contractAddress: string, contractAbi: AbiItem[], methodName: string, methodArguments: unknown[], options: {
        from: string;
        value: string;
    }): Promise<TransactionReceipt>;
    getTokensBalances(userAddress: string, tokensAddresses: string[]): Promise<BigNumber[]>;
    callForTokensInfo(tokenAddresses: string[] | ReadonlyArray<string>, tokenFields?: SupportedTokenField[]): Promise<Partial<Record<SupportedTokenField, string>>[]>;
}
