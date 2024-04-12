import { OnChainManagerCalculationOptions } from "./on-chain-manager-calculation-options";
import { MarkRequired } from 'ts-essentials';
export type RequiredOnChainManagerCalculationOptions = MarkRequired<OnChainManagerCalculationOptions, 'timeout' | 'disabledProviders' | 'providerAddress' | 'useProxy' | 'withDeflation'>;
