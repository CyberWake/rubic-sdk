import BigNumber from 'bignumber.js';
import { PriceTokenAmount, Token } from "../../../../../../../common/tokens";
import { SolanaBlockchainName } from "../../../../../../../core/blockchain/models/blockchain-name";
import { EvmBasicTransactionOptions } from "../../../../../../../core/blockchain/web3-private-service/web3-private/evm-web3-private/models/evm-basic-transaction-options";
import { EvmTransactionOptions } from "../../../../../../../core/blockchain/web3-private-service/web3-private/evm-web3-private/models/evm-transaction-options";
import { SolanaWeb3Private } from "../../../../../../../core/blockchain/web3-private-service/web3-private/solana-web3-private/solana-web3-private";
import { SolanaWeb3Public } from "../../../../../../../core/blockchain/web3-public-service/web3-public/solana-web3-public/solana-web3-public";
import { EvmEncodeConfig } from "../../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/models/evm-encode-config";
import { EncodeTransactionOptions } from "../../../../../../common/models/encode-transaction-options";
import { SwapTransactionOptions } from "../../../../../../common/models/swap-transaction-options";
import { FeeInfo } from "../../../../../../cross-chain/calculation-manager/providers/common/models/fee-info";
import { GetContractParamsOptions } from "../../../../../../cross-chain/calculation-manager/providers/common/models/get-contract-params-options";
import { IsDeflationToken } from "../../../../../../deflation-token-manager/models/is-deflation-token";
import { OnChainTradeStruct } from "../evm-on-chain-trade/models/evm-on-chain-trade-struct";
import { GasFeeInfo } from "../evm-on-chain-trade/models/gas-fee-info";
import { OptionsGasParams, TransactionGasParams } from "../evm-on-chain-trade/models/gas-params";
import { OnChainTrade } from "../on-chain-trade";
import { TransactionConfig } from 'web3-core';
import { TransactionReceipt } from 'web3-eth';
export declare abstract class SolanaOnChainTrade extends OnChainTrade {
    readonly from: PriceTokenAmount<SolanaBlockchainName>;
    readonly to: PriceTokenAmount<SolanaBlockchainName>;
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
    protected readonly fromWithoutFee: PriceTokenAmount<SolanaBlockchainName>;
    protected readonly withDeflation: {
        from: IsDeflationToken;
        to: IsDeflationToken;
    };
    abstract readonly dexContractAddress: string;
    protected get spenderAddress(): string;
    protected get web3Public(): SolanaWeb3Public;
    protected get web3Private(): SolanaWeb3Private;
    protected constructor(tradeStruct: OnChainTradeStruct<SolanaBlockchainName>, providerAddress: string);
    approve(_options: EvmBasicTransactionOptions, _checkNeedApprove?: boolean, _amount?: BigNumber | 'infinity'): Promise<TransactionReceipt>;
    encodeApprove(_tokenAddress: string, _spenderAddress: string, _value: BigNumber | 'infinity', _options?: EvmTransactionOptions): Promise<TransactionConfig>;
    protected checkAllowanceAndApprove(): Promise<void>;
    /**
     * Calculates value for swap transaction.
     * @param providerValue Value, returned from cross-chain provider.
     */
    protected getSwapValue(providerValue?: BigNumber | string | number | null): string;
    swap(options?: SwapTransactionOptions): Promise<string | never>;
    encode(options: EncodeTransactionOptions): Promise<EvmEncodeConfig>;
    /**
     * Encodes trade to swap it directly through dex contract.
     */
    abstract encodeDirect(options: EncodeTransactionOptions): Promise<EvmEncodeConfig>;
    protected getGasParams(options: OptionsGasParams, calculatedGasFee?: OptionsGasParams): TransactionGasParams;
    protected getSwapData(_options: GetContractParamsOptions): Promise<unknown[]>;
}
