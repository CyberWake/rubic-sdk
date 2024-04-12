import BigNumber from 'bignumber.js';
import { TronWeb } from "../../../constants/tron/tron-web";
import { BlockchainName } from "../../../models/blockchain-name";
import { TronTransactionOptions } from "./models/tron-transaction-options";
import { Web3Private } from "../web3-private";
import { TronParameters } from "../../../web3-pure/typed-web3-pure/tron-web3-pure/models/tron-parameters";
import { TronTransactionConfig } from "../../../web3-pure/typed-web3-pure/tron-web3-pure/models/tron-transaction-config";
import { TronWeb3Pure } from "../../../web3-pure/typed-web3-pure/tron-web3-pure/tron-web3-pure";
import { WalletProviderCore } from "../../../../sdk/models/wallet-provider";
import { AbiItem } from 'web3-utils';
export declare class TronWeb3Private extends Web3Private {
    /**
     * Parses web3 error by its code or message.
     * @param err Web3 error to parse.
     */
    private static parseError;
    protected readonly Web3Pure: typeof TronWeb3Pure;
    private readonly tronWeb;
    constructor(walletProviderCore: WalletProviderCore<typeof TronWeb>);
    getBlockchainName(): Promise<BlockchainName>;
    approveTokens(tokenAddress: string, spenderAddress: string, amount?: BigNumber | 'infinity', options?: TronTransactionOptions): Promise<string>;
    encodeApprove(tokenAddress: string, spenderAddress: string, value: BigNumber | 'infinity', options?: TronTransactionOptions): Promise<TronTransactionConfig>;
    executeContractMethod(contractAddress: string, contractAbi: AbiItem[], methodName: string, methodArguments: unknown[], options?: TronTransactionOptions): Promise<string>;
    triggerContract(contractAddress: string, methodSignature: string, parameters: TronParameters, options?: TronTransactionOptions): Promise<string>;
}
