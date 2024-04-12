import BigNumber from 'bignumber.js';
import { PriceTokenAmount } from "../../../../../../common/tokens";
import { BlockchainName, EvmBlockchainName, SolanaBlockchainName } from "../../../../../../core/blockchain/models/blockchain-name";
import { GasData } from "../../common/emv-cross-chain-trade/models/gas-data";
import { FeeInfo } from "../../common/models/fee-info";
import { TransactionRequest } from "./transaction-request";
import { EvmOnChainTrade } from "../../../../../on-chain/calculation-manager/providers/common/on-chain-trade/evm-on-chain-trade/evm-on-chain-trade";
export interface DebridgeCrossChainTradeConstructor<T extends BlockchainName> {
    from: PriceTokenAmount<T>;
    to: PriceTokenAmount<BlockchainName>;
    priceImpact: number | null;
    slippage: number;
    feeInfo: FeeInfo;
    transitAmount: BigNumber;
    toTokenAmountMin: BigNumber;
    cryptoFeeToken: PriceTokenAmount;
    transactionRequest?: TransactionRequest;
    gasData?: GasData | null;
    allowanceTarget?: string;
    onChainTrade?: EvmOnChainTrade | null;
}
export type DebridgeEvmCrossChainTradeConstructor = Required<DebridgeCrossChainTradeConstructor<EvmBlockchainName>>;
export interface DebridgeSolanaCrossChainTradeConstructor extends DebridgeCrossChainTradeConstructor<SolanaBlockchainName> {
    transactionRequest: TransactionRequest;
}
