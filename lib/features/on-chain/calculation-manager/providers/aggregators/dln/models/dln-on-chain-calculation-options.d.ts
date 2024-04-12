import { RequiredOnChainCalculationOptions } from "../../../common/models/on-chain-calculation-options";
import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { MarkRequired } from 'ts-essentials';
export interface DlnOnChainCalculationOptions extends RequiredOnChainCalculationOptions {
    readonly disabledProviders: OnChainTradeType[];
}
export type RequiredDlnOnChainCalculationOptions = MarkRequired<RequiredOnChainCalculationOptions & DlnOnChainCalculationOptions, 'gasCalculation'>;
