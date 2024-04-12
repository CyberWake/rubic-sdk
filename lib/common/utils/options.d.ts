import { EvmTransactionOptions } from "../../core/blockchain/web3-private-service/web3-private/evm-web3-private/models/evm-transaction-options";
import { EIP1559Gas, SingleGasPrice } from "../../core/blockchain/web3-public-service/web3-public/evm-web3-public/models/gas-price";
import { SwapTransactionOptions } from "../../features/common/models/swap-transaction-options";
export declare function combineOptions<T extends object>(options: Partial<T> | undefined, defaultOptions: T): T;
export declare function deadlineMinutesTimestamp(deadlineMinutes: number): number;
export declare function getGasOptions(options: SwapTransactionOptions | EvmTransactionOptions): EIP1559Gas | SingleGasPrice | Record<never, never>;
