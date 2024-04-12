import BigNumber from 'bignumber.js';
import { PriceTokenAmount } from "../../../../../../common/tokens";
import { TronBlockchainName } from "../../../../../../core/blockchain/models/blockchain-name";
import { TronTransactionOptions } from "../../../../../../core/blockchain/web3-private-service/web3-private/tron-web3-private/models/tron-transaction-options";
import { TronWeb3Private } from "../../../../../../core/blockchain/web3-private-service/web3-private/tron-web3-private/tron-web3-private";
import { TronWeb3Public } from "../../../../../../core/blockchain/web3-public-service/web3-public/tron-web3-public/tron-web3-public";
import { TronTransactionConfig } from "../../../../../../core/blockchain/web3-pure/typed-web3-pure/tron-web3-pure/models/tron-transaction-config";
import { EncodeTransactionOptions } from "../../../../../common/models/encode-transaction-options";
import { SwapTransactionOptions } from "../../../../../common/models/swap-transaction-options";
import { CrossChainTrade } from "../cross-chain-trade";
import { TronContractParams } from "./models/tron-contract-params";
import { TronGetContractParamsOptions } from "./models/tron-get-contract-params-options";
import { MarkRequired } from 'ts-essentials';
export declare abstract class TronCrossChainTrade extends CrossChainTrade {
    abstract readonly from: PriceTokenAmount<TronBlockchainName>;
    protected get fromWeb3Public(): TronWeb3Public;
    protected get web3Private(): TronWeb3Private;
    approve(options: TronTransactionOptions, checkNeedApprove?: boolean, amount?: BigNumber | 'infinity'): Promise<string>;
    protected checkAllowanceAndApprove(options?: Omit<SwapTransactionOptions, 'onConfirm' | 'feeLimit'>): Promise<void>;
    swap(options: MarkRequired<SwapTransactionOptions, 'receiverAddress'>): Promise<string | never>;
    encode(options: MarkRequired<EncodeTransactionOptions, 'receiverAddress'>): Promise<TronTransactionConfig>;
    encodeApprove(tokenAddress: string, spenderAddress: string, value: BigNumber | 'infinity', options?: TronTransactionOptions): Promise<TronTransactionConfig>;
    protected abstract getContractParams(options: TronGetContractParamsOptions): Promise<TronContractParams>;
    getUsdPrice(): BigNumber;
}
