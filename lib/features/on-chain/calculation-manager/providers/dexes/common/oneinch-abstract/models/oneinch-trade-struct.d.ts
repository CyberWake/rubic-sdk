import { EvmOnChainTradeStruct } from "../../../../common/on-chain-trade/evm-on-chain-trade/models/evm-on-chain-trade-struct";
export interface OneinchTradeStruct extends EvmOnChainTradeStruct {
    dexContractAddress: string;
    disableMultihops: boolean;
    data: string | null;
    availableProtocols: string | undefined;
}
