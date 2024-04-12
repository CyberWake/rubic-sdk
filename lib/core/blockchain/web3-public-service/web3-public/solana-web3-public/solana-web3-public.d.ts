import { BlockhashWithExpiryBlockHeight, Connection } from '@solana/web3.js';
import BigNumber from 'bignumber.js';
import { Web3PrimitiveType } from "../../../models/web3-primitive-type";
import { ContractMulticallResponse } from "../models/contract-multicall-response";
import { MethodData } from "../models/method-data";
import { SupportedTokenField } from "../models/supported-token-field";
import { TxStatus } from "../models/tx-status";
import { Web3Public } from "../web3-public";
import { AbiItem } from 'web3-utils';
/**
 * Class containing methods for calling contracts in order to obtain information from the blockchain.
 * To send transaction or execute contract method use {@link Web3Private}.
 */
export declare class SolanaWeb3Public extends Web3Public {
    private readonly connection;
    constructor(connection: Connection);
    getBlockNumber(): Promise<number>;
    multicallContractsMethods<Output extends Web3PrimitiveType>(_contractAbi: AbiItem[], _contractsData: {
        contractAddress: string;
        methodsData: MethodData[];
    }[]): Promise<ContractMulticallResponse<Output>[][]>;
    getTransactionStatus(hash: string): Promise<TxStatus>;
    callForTokensInfo(tokenAddresses: string[] | ReadonlyArray<string>, tokenFields?: SupportedTokenField[]): Promise<Partial<Record<SupportedTokenField, string>>[]>;
    getBalance(userAddress: string, tokenAddress: string): Promise<BigNumber>;
    getTokenBalance(address: string, tokenAddress: string): Promise<BigNumber>;
    callContractMethod<T extends Web3PrimitiveType = string>(_contractAddress: string, _contractAbi: AbiItem[], _methodName: string, _methodArguments?: unknown[], _options?: {
        from?: string;
        value?: string;
        gasPrice?: string;
        gas?: string;
    }): Promise<T>;
    healthCheck(timeoutMs?: number): Promise<boolean>;
    /**
     * Gets balance of multiple tokens.
     * @param address Wallet address.
     * @param tokensAddresses Tokens addresses.
     */
    getTokensBalances(address: string, tokensAddresses: string[]): Promise<BigNumber[]>;
    getAllowance(): Promise<BigNumber>;
    setProvider(_provider: unknown): void;
    getRecentBlockhash(): Promise<BlockhashWithExpiryBlockHeight>;
}
