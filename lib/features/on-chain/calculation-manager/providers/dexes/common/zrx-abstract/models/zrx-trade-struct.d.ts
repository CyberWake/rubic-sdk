import { EvmOnChainTradeStruct } from "../../../../common/on-chain-trade/evm-on-chain-trade/models/evm-on-chain-trade-struct";
import { ZrxQuoteResponse } from "./zrx-types";
export interface ZrxTradeStruct extends EvmOnChainTradeStruct {
    apiTradeData: ZrxQuoteResponse;
}
