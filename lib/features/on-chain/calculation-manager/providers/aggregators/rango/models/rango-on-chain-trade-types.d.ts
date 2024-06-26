import BigNumber from 'bignumber.js';
import { EvmOnChainTradeStruct } from '../../../common/on-chain-trade/evm-on-chain-trade/models/evm-on-chain-trade-struct';
export interface RangoOnChainTradeStruct extends EvmOnChainTradeStruct {
    toTokenWeiAmountMin: BigNumber;
}
