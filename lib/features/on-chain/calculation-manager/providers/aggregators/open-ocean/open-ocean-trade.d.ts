import BigNumber from 'bignumber.js';
import { PriceTokenAmount } from "../../../../../../common/tokens/price-token-amount";
import { EvmEncodeConfig } from "../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/models/evm-encode-config";
import { EncodeTransactionOptions } from "../../../../../common/models/encode-transaction-options";
import { GetContractParamsOptions } from "../../../../../cross-chain/calculation-manager/providers/common/models/get-contract-params-options";
import { OpenOceanTradeStruct } from "./models/open-ocean-trade-struct";
import { AggregatorEvmOnChainTrade } from '../../common/on-chain-aggregator/aggregator-evm-on-chain-trade-abstract';
import { GetToAmountAndTxDataResponse } from '../../common/on-chain-aggregator/models/aggregator-on-chain-types';
export declare class OpenOceanTrade extends AggregatorEvmOnChainTrade {
    /** @internal */
    static getGasLimit(openOceanTradeStruct: OpenOceanTradeStruct): Promise<BigNumber | null>;
    readonly type: "OPEN_OCEAN";
    private readonly _toTokenAmountMin;
    static readonly nativeAddress = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
    protected get spenderAddress(): string;
    get dexContractAddress(): string;
    get toTokenAmountMin(): PriceTokenAmount;
    constructor(tradeStruct: OpenOceanTradeStruct, providerAddress: string);
    encodeDirect(options: EncodeTransactionOptions): Promise<EvmEncodeConfig>;
    protected getToAmountAndTxData(receiverAddress?: string): Promise<GetToAmountAndTxDataResponse>;
    private getTokenAddress;
    protected getSwapData(options: GetContractParamsOptions): Promise<unknown[]>;
}
