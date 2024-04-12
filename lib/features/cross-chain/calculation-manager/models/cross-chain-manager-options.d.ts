import { CrossChainOptions, RequiredCrossChainOptions } from "./cross-chain-options";
import { CrossChainTradeType } from "./cross-chain-trade-type";
import { LifiBridgeTypes } from "../providers/lifi-provider/models/lifi-bridge-types";
import { MarkRequired } from 'ts-essentials';
export type CrossChainManagerCalculationOptions = CrossChainOptions & {
    /**
     * An array of disabled cross-chain providers.
     */
    readonly disabledProviders?: CrossChainTradeType[];
    readonly lifiDisabledBridgeTypes?: LifiBridgeTypes[];
};
export type RequiredCrossChainManagerCalculationOptions = MarkRequired<CrossChainManagerCalculationOptions, 'disabledProviders'> & RequiredCrossChainOptions;
