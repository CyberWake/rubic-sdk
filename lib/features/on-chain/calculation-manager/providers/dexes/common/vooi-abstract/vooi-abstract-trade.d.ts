import { EvmEncodeConfig } from "../../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/models/evm-encode-config";
import { EncodeTransactionOptions } from "../../../../../../common/models/encode-transaction-options";
import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { EvmOnChainTrade } from "../../../common/on-chain-trade/evm-on-chain-trade/evm-on-chain-trade";
import { VooiTradeStruct } from './models/vooi-trade-struct';
export declare abstract class VooiAbstractTrade extends EvmOnChainTrade {
    private fromPoolId;
    private toPoolId;
    private deadlineInMinutes;
    static get type(): OnChainTradeType;
    readonly type: "VOOI";
    abstract readonly dexContractAddress: string;
    constructor(tradeStruct: VooiTradeStruct, providerAddress: string);
    encodeDirect(options: EncodeTransactionOptions): Promise<EvmEncodeConfig>;
}
