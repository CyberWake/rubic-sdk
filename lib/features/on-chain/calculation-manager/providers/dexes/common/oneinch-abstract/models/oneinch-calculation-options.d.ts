import { RequiredOnChainCalculationOptions } from "../../../../common/models/on-chain-calculation-options";
import { MarkRequired } from 'ts-essentials';
export type OneinchCalculationOptions = MarkRequired<RequiredOnChainCalculationOptions, 'disableMultihops' | 'fromAddress' | 'wrappedAddress'>;
