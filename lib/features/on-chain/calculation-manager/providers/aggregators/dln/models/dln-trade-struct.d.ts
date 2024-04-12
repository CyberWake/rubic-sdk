import BigNumber from 'bignumber.js';
import { DlnOnChainSupportedBlockchain } from "../constants/dln-on-chain-supported-blockchains";
import { DlnOnChainSwapRequest } from "./dln-on-chain-swap-request";
import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { OnChainTradeStruct } from "../../../common/on-chain-trade/evm-on-chain-trade/models/evm-on-chain-trade-struct";
export interface DlnTradeStruct<T extends DlnOnChainSupportedBlockchain> extends OnChainTradeStruct<T> {
    type: OnChainTradeType;
    toTokenWeiAmountMin: BigNumber;
    providerGateway: string;
    transactionRequest: DlnOnChainSwapRequest;
}
