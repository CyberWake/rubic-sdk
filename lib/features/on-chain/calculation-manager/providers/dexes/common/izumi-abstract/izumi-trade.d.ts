import BigNumber from 'bignumber.js';
import { EvmEncodeConfig } from "../../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/models/evm-encode-config";
import { EncodeTransactionOptions } from "../../../../../../common/models/encode-transaction-options";
import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { EvmOnChainTrade } from "../../../common/on-chain-trade/evm-on-chain-trade/evm-on-chain-trade";
import { IzumiTradeStruct } from "./models/izumi-trade-struct";
export declare class IzumiTrade extends EvmOnChainTrade {
    static getGasLimit(tradeStruct: IzumiTradeStruct, providerAddress: string): Promise<BigNumber | null>;
    get type(): OnChainTradeType;
    readonly dexContractAddress: string;
    private readonly swapConfig;
    private readonly strictERC20Token;
    encodeDirect(options: EncodeTransactionOptions): Promise<EvmEncodeConfig>;
    constructor(tradeStruct: IzumiTradeStruct, providerAddress: string);
}
