import BigNumber from 'bignumber.js';
import { PriceTokenAmount } from "../../../../../../../common/tokens";
import { EvmBlockchainName } from "../../../../../../../core/blockchain/models/blockchain-name";
import { EvmEncodeConfig } from "../../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/models/evm-encode-config";
import { EncodeTransactionOptions } from "../../../../../../common/models/encode-transaction-options";
import { DlnEvmOnChainSupportedBlockchain, DlnOnChainSupportedBlockchain } from "../constants/dln-on-chain-supported-blockchains";
import { DlnTradeStruct } from "../models/dln-trade-struct";
import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { AggregatorEvmOnChainTrade } from "../../../common/on-chain-aggregator/aggregator-evm-on-chain-trade-abstract";
import { GetToAmountAndTxDataResponse } from "../../../common/on-chain-aggregator/models/aggregator-on-chain-types";
export declare class DlnEvmOnChainTrade extends AggregatorEvmOnChainTrade {
    private readonly transactionRequest;
    static getGasLimit(tradeStruct: DlnTradeStruct<DlnEvmOnChainSupportedBlockchain>): Promise<BigNumber | null>;
    readonly providerGateway: string;
    readonly type: OnChainTradeType;
    private readonly _toTokenAmountMin;
    protected get spenderAddress(): string;
    get dexContractAddress(): string;
    get toTokenAmountMin(): PriceTokenAmount;
    constructor(tradeStruct: DlnTradeStruct<DlnOnChainSupportedBlockchain & EvmBlockchainName>, providerAddress: string);
    encodeDirect(options: EncodeTransactionOptions): Promise<EvmEncodeConfig>;
    protected getToAmountAndTxData(receiverAddress?: string, _fromAddress?: string): Promise<GetToAmountAndTxDataResponse>;
    encode(options: EncodeTransactionOptions): Promise<EvmEncodeConfig>;
}
