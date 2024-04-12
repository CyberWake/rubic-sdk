import { RequiredOnChainCalculationOptions } from "../../../common/models/on-chain-calculation-options";
import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { MarkRequired } from 'ts-essentials';
export interface LifiCalculationOptions extends RequiredOnChainCalculationOptions {
    readonly disabledProviders: OnChainTradeType[];
}
export type RequiredLifiCalculationOptions = MarkRequired<RequiredOnChainCalculationOptions & LifiCalculationOptions, 'gasCalculation'>;
