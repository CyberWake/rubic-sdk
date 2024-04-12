import { EvmEncodeConfig } from "../../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/models/evm-encode-config";
import { EncodeTransactionOptions } from "../../../../../../common/models/encode-transaction-options";
import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { EvmOnChainTrade } from "../../../common/on-chain-trade/evm-on-chain-trade/evm-on-chain-trade";
import { CurveOnChainTradeStruct } from "./models/curve-on-chain-trade-struct";
export declare abstract class CurveAbstractTrade extends EvmOnChainTrade {
    get type(): OnChainTradeType;
    private get nativeValueToSend();
    readonly dexContractAddress: string;
    private readonly poolAddress;
    constructor(tradeStruct: CurveOnChainTradeStruct, providerAddress: string);
    encodeDirect(options: EncodeTransactionOptions): Promise<EvmEncodeConfig>;
}
