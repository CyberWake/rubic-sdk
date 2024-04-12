import { OnChainCalculationOptions } from "../providers/common/models/on-chain-calculation-options";
import { OnChainTradeType } from "../providers/common/models/on-chain-trade-type";
export interface OnChainManagerCalculationOptions extends OnChainCalculationOptions {
    readonly timeout?: number;
    readonly disabledProviders?: OnChainTradeType[];
}
