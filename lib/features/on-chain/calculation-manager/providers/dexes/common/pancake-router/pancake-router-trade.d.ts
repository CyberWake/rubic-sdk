import BigNumber from 'bignumber.js';
import { EvmEncodeConfig } from "../../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/models/evm-encode-config";
import { EncodeTransactionOptions } from "../../../../../../common/models/encode-transaction-options";
import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { EvmOnChainTrade } from "../../../common/on-chain-trade/evm-on-chain-trade/evm-on-chain-trade";
import { PancakeRouterTradeStruct } from "./models/pancake-router-trade-struct";
export declare class PancakeRouterTrade extends EvmOnChainTrade {
    static getGasLimit(tradeStruct: PancakeRouterTradeStruct, providerAddress: string): Promise<BigNumber | null>;
    get type(): OnChainTradeType;
    readonly dexContractAddress: string;
    encodeDirect(options: EncodeTransactionOptions): Promise<EvmEncodeConfig>;
    private readonly trade;
    constructor(tradeStruct: PancakeRouterTradeStruct, providerAddress: string);
}
