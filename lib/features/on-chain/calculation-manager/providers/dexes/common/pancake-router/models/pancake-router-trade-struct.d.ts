import { TradeType } from '@pancakeswap/sdk';
import { SmartRouterTrade } from '@pancakeswap/smart-router/evm/v3-router/types';
import { EvmOnChainTradeStruct } from "../../../../common/on-chain-trade/evm-on-chain-trade/models/evm-on-chain-trade-struct";
export interface PancakeRouterTradeStruct extends EvmOnChainTradeStruct {
    readonly trade: SmartRouterTrade<TradeType>;
    readonly dexContractAddress: string;
}
