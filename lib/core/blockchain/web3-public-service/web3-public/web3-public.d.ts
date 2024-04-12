import BigNumber from 'bignumber.js';
import { Token } from "../../../../common/tokens";
import { Web3PrimitiveType } from "../../models/web3-primitive-type";
import { Web3PublicSupportedBlockchain } from "../models/web3-public-storage";
import { ContractMulticallResponse } from "./models/contract-multicall-response";
import { MethodData } from "./models/method-data";
import { SupportedTokenField } from "./models/supported-token-field";
import { TxStatus } from "./models/tx-status";
import { AbiItem } from 'web3-utils';
/**
 * Class containing methods for calling contracts in order to obtain information from the blockchain.
 * To send transaction or execute contract method use {@link Web3Private}.
 */
export declare abstract class Web3Public {
    protected readonly blockchainName: Web3PublicSupportedBlockchain;
    protected readonly multicallAddress: string;
    protected readonly Web3Pure: typeof import("../../../..").SolanaWeb3Pure | typeof import("../../../..").NearWeb3Pure | typeof import("../../../..").BitcoinWeb3Pure | typeof import("../../../..").TronWeb3Pure | typeof import("../../../..").IcpWeb3Pure | typeof import("../../../..").CardanoWeb3Pure | typeof import("../../../..").AlgorandWeb3Pure | typeof import("../../../..").AptosWeb3Pure | typeof import("../../../..").AstarWeb3Pure | typeof import("../../../..").CosmosWeb3Pure | typeof import("../../../..").CasperWeb3Pure | typeof import("../../../..").DashWeb3Pure | typeof import("../../../..").DogecoinWeb3Pure | typeof import("../../../..").PolkadotWeb3Pure | typeof import("../../../..").FlowWeb3Pure | typeof import("../../../..").HederaWeb3Pure | typeof import("../../../..").IotaWeb3Pure | typeof import("../../../..").KadenaWeb3Pure | typeof import("../../../..").KusamaWeb3Pure | typeof import("../../../..").LitecoinWeb3Pure | typeof import("../../../..").MinaWeb3Pure | typeof import("../../../..").NeoWeb3Pure | typeof import("../../../..").OsmosisWeb3Pure | typeof import("../../../..").SiaWeb3Pure | typeof import("../../../..").SecretWeb3Pure | typeof import("../../../..").TonWeb3Pure | typeof import("../../../..").WavesWeb3Pure | typeof import("../../../..").WaxWeb3Pure | typeof import("../../../..").StellarWeb3Pure | typeof import("../../../..").MoneroWeb3Pure | typeof import("../../../..").RippleWeb3Pure | typeof import("../../../..").TezosWeb3Pure | typeof import("../../../..").ZilliqaWeb3Pure | typeof import("../../../..").KavaCosmosWeb3Pure | typeof import("../../../..").FilecoinWeb3Pure | typeof import("../../../..").EosWeb3Pure | typeof import("../../../..").OntologyWeb3Pure | typeof import("../../../..").XdcWeb3Pure | typeof import("../../../..").EvmWeb3Pure;
    protected constructor(blockchainName: Web3PublicSupportedBlockchain);
    /**
     * Sets new provider to web3 instance.
     * @param provider New web3 provider, e.g. rpc link.
     */
    abstract setProvider(provider: unknown): void;
    /**
     * Health-check current rpc node.
     * @param timeoutMs Acceptable node response timeout.
     * @returns Null if healthcheck is not defined for current blockchain, else node health status.
     */
    abstract healthCheck(timeoutMs: number): Promise<boolean>;
    /**
     * Gets account native or token balance in wei.
     * @param userAddress Wallet address, whose balance you want to find out.
     * @param tokenAddress Address of the smart-contract corresponding to the token,
     */
    abstract getBalance(userAddress: string, tokenAddress?: string): Promise<BigNumber>;
    /**
     * Gets token's balance in wei.
     * @param tokenAddress Address of the smart-contract corresponding to the token.
     * @param userAddress Wallet address, whose balance you want to find out.
     */
    abstract getTokenBalance(userAddress: string, tokenAddress: string): Promise<BigNumber>;
    abstract getTokensBalances(userAddress: string, tokensAddresses: string[]): Promise<BigNumber[]>;
    /**
     * Checks that user has enough balance.
     * @param userAddress Wallet address, which contains tokens.
     * @param token Token to check balance of.
     * @param requiredAmount Required user balance in Eth units.
     */
    checkBalance(token: Token, requiredAmount: BigNumber, userAddress: string): Promise<void | never>;
    /**
     * Gets token info by address.
     * @param tokenAddress Address of token.
     * @param tokenFields Token's fields to get.
     */
    callForTokenInfo(tokenAddress: string, tokenFields?: SupportedTokenField[]): Promise<Partial<Record<SupportedTokenField, string>>>;
    /**
     * Gets tokens info by addresses.
     * @param tokenAddresses Addresses of tokens.
     * @param tokenFields Token's fields to get.
     */
    abstract callForTokensInfo(tokenAddresses: string[] | ReadonlyArray<string>, tokenFields?: SupportedTokenField[]): Promise<Partial<Record<SupportedTokenField, string>>[]>;
    /**
     * Calls allowance method in token contract.
     * @param tokenAddress Address of the smart-contract corresponding to the token.
     * @param spenderAddress Wallet or contract address, allowed to spend.
     * @param ownerAddress Wallet address to spend from.
     * @returns Token's amount, allowed to be spent.
     */
    abstract getAllowance(tokenAddress: string, ownerAddress: string, spenderAddress: string): Promise<BigNumber>;
    /**
     * Uses multicall to make several calls of one method in one contract.
     * @param contractAddress Target contract address.
     * @param contractAbi Target contract abi.
     * @param methodName Method name.
     * @param methodCallsArguments Method parameters array, for each method call.
     */
    multicallContractMethod<Output extends Web3PrimitiveType>(contractAddress: string, contractAbi: AbiItem[], methodName: string, methodCallsArguments: unknown[][]): Promise<ContractMulticallResponse<Output>[]>;
    /**
     * Uses multicall to make several methods calls in one contract.
     * @param contractAddress Target contract address.
     * @param contractAbi Target contract abi.
     * @param methodsData Methods data, containing methods' names and arguments.
     */
    multicallContractMethods<Output extends Web3PrimitiveType>(contractAddress: string, contractAbi: AbiItem[], methodsData: MethodData[]): Promise<ContractMulticallResponse<Output>[]>;
    /**
     * Uses multicall to make many methods calls in several contracts.
     * @param contractAbi Target contract abi.
     * @param contractsData Contract addresses and methods data, containing methods' names and arguments.
     */
    abstract multicallContractsMethods<Output extends Web3PrimitiveType>(contractAbi: AbiItem[], contractsData: {
        contractAddress: string;
        methodsData: MethodData[];
    }[]): Promise<ContractMulticallResponse<Output>[][]>;
    /**
     * Calls pure method of smart-contract and returns its output value.
     * @param contractAddress Address of smart-contract which method is to be executed.
     * @param contractAbi Abi of smart-contract which method is to be executed.
     * @param methodName Called method name.
     * @param methodArguments Method arguments.
     * @param options Transaction options.
     */
    abstract callContractMethod<T extends Web3PrimitiveType = string>(contractAddress: string, contractAbi: AbiItem[], methodName: string, methodArguments?: unknown[], options?: object): Promise<T>;
    /**
     * Returns transaction status, based on transaction receipt.
     */
    abstract getTransactionStatus(hash: string): Promise<TxStatus>;
    /**
     * Gets last block number.
     * @returns Block number.
     */
    abstract getBlockNumber(): Promise<number>;
}
