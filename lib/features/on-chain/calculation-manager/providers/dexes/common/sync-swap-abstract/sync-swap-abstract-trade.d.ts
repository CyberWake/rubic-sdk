import BigNumber from 'bignumber.js';
import { EvmEncodeConfig } from "../../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/models/evm-encode-config";
import { EncodeTransactionOptions } from "../../../../../../common/models/encode-transaction-options";
import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { EvmOnChainTrade } from "../../../common/on-chain-trade/evm-on-chain-trade/evm-on-chain-trade";
import { EvmOnChainTradeStruct } from "../../../common/on-chain-trade/evm-on-chain-trade/models/evm-on-chain-trade-struct";
import { BestPathsWithAmounts } from "./utils/typings";
export declare class SyncSwapAbstractTrade extends EvmOnChainTrade {
    readonly dexContractAddress: string;
    private readonly bestPathWithAmounts;
    /** @internal */
    static getGasLimit(tradeStruct: EvmOnChainTradeStruct & {
        bestPathWithAmounts: BestPathsWithAmounts;
    }, dexContractAddress: string, providerAddress: string): Promise<BigNumber | null>;
    private readonly nativeSupportedFromWithoutFee;
    private readonly nativeSupportedTo;
    get type(): OnChainTradeType;
    constructor(tradeStruct: EvmOnChainTradeStruct & {
        bestPathWithAmounts: BestPathsWithAmounts;
    }, providerAddress: string, dexContractAddress: string);
    encodeDirect(options: EncodeTransactionOptions): Promise<EvmEncodeConfig>;
    getCallParameters(receiverAddress?: string): unknown[];
}
