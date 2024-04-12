import BigNumber from 'bignumber.js';
import { EvmEncodeConfig } from "../../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/models/evm-encode-config";
import { EncodeTransactionOptions } from "../../../../../../common/models/encode-transaction-options";
import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { EvmOnChainTrade } from "../../../common/on-chain-trade/evm-on-chain-trade/evm-on-chain-trade";
import { ZrxTradeStruct } from "./models/zrx-trade-struct";
export declare class ZrxTrade extends EvmOnChainTrade {
    /** @internal */
    static getGasLimit(zrxTradeStruct: ZrxTradeStruct): Promise<BigNumber | null>;
    private readonly apiTradeData;
    readonly dexContractAddress: string;
    get type(): OnChainTradeType;
    constructor(tradeStruct: ZrxTradeStruct, providerAddress: string);
    encodeDirect(options: EncodeTransactionOptions): Promise<EvmEncodeConfig>;
}
