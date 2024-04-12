import BigNumber from 'bignumber.js';
import { PriceTokenAmount, Token } from "../../../../../../../common/tokens";
import { EvmBlockchainName } from "../../../../../../../core/blockchain/models/blockchain-name";
import { EvmWeb3Private } from "../../../../../../../core/blockchain/web3-private-service/web3-private/evm-web3-private/evm-web3-private";
import { EvmBasicTransactionOptions } from "../../../../../../../core/blockchain/web3-private-service/web3-private/evm-web3-private/models/evm-basic-transaction-options";
import { EvmTransactionOptions } from "../../../../../../../core/blockchain/web3-private-service/web3-private/evm-web3-private/models/evm-transaction-options";
import { EvmWeb3Public } from "../../../../../../../core/blockchain/web3-public-service/web3-public/evm-web3-public/evm-web3-public";
import { EvmEncodeConfig } from "../../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/models/evm-encode-config";
import { EncodeTransactionOptions } from "../../../../../../common/models/encode-transaction-options";
import { SwapTransactionOptions } from "../../../../../../common/models/swap-transaction-options";
import { FeeInfo } from "../../../../../../cross-chain/calculation-manager/providers/common/models/fee-info";
import { GetContractParamsOptions } from "../../../../../../cross-chain/calculation-manager/providers/common/models/get-contract-params-options";
import { IsDeflationToken } from "../../../../../../deflation-token-manager/models/is-deflation-token";
import { OnChainTradeStruct } from "./models/evm-on-chain-trade-struct";
import { GasFeeInfo } from "./models/gas-fee-info";
import { OptionsGasParams, TransactionGasParams } from "./models/gas-params";
import { OnChainTrade } from "../on-chain-trade";
import { TransactionConfig } from 'web3-core';
import { TransactionReceipt } from 'web3-eth';
export declare abstract class EvmOnChainTrade extends OnChainTrade {
    readonly from: PriceTokenAmount<EvmBlockchainName>;
    readonly to: PriceTokenAmount<EvmBlockchainName>;
    readonly slippageTolerance: number;
    readonly path: ReadonlyArray<Token>;
    /**
     * Gas fee info, including gas limit and gas price.
     */
    readonly gasFeeInfo: GasFeeInfo | null;
    readonly feeInfo: FeeInfo;
    /**
     * True, if trade must be swapped through on-chain proxy contract.
     */
    readonly useProxy: boolean;
    /**
     * Contains from amount, from which proxy fees were subtracted.
     * If proxy is not used, then amount is equal to from amount.
     */
    protected readonly fromWithoutFee: PriceTokenAmount<EvmBlockchainName>;
    protected readonly withDeflation: {
        from: IsDeflationToken;
        to: IsDeflationToken;
    };
    abstract readonly dexContractAddress: string;
    private readonly usedForCrossChain;
    protected get spenderAddress(): string;
    protected get web3Public(): EvmWeb3Public;
    protected get web3Private(): EvmWeb3Private;
    protected constructor(evmOnChainTradeStruct: OnChainTradeStruct<EvmBlockchainName>, providerAddress: string);
    approve(options: EvmBasicTransactionOptions, checkNeedApprove?: boolean, amount?: BigNumber | 'infinity'): Promise<TransactionReceipt>;
    encodeApprove(tokenAddress: string, spenderAddress: string, value: BigNumber | 'infinity', options?: EvmTransactionOptions): Promise<TransactionConfig>;
    protected checkAllowanceAndApprove(options?: Omit<SwapTransactionOptions, 'onConfirm' | 'gasLimit'>): Promise<void>;
    /**
     * Calculates value for swap transaction.
     * @param providerValue Value, returned from cross-chain provider.
     */
    protected getSwapValue(providerValue?: BigNumber | string | number | null): string;
    swap(options?: SwapTransactionOptions): Promise<string | never>;
    encode(options: EncodeTransactionOptions): Promise<EvmEncodeConfig>;
    /**
     * Encodes trade to swap it through on-chain proxy.
     */
    protected encodeProxy(options: EncodeTransactionOptions): Promise<EvmEncodeConfig>;
    private getProxyContractParams;
    private static getReferrerAddress;
    /**
     * Encodes trade to swap it directly through dex contract.
     */
    abstract encodeDirect(options: EncodeTransactionOptions): Promise<EvmEncodeConfig>;
    protected isDeflationError(): boolean;
    protected getGasParams(options: OptionsGasParams, calculatedGasFee?: OptionsGasParams): TransactionGasParams;
    protected getSwapData(options: GetContractParamsOptions): Promise<unknown[]>;
}
