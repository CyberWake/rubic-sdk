import { DlnOnChainProvider } from "../providers/aggregators/dln/dln-on-chain-provider";
import { LifiProvider } from '../providers/aggregators/lifi/lifi-provider';
import { OdosOnChainProvider } from '../providers/aggregators/odos/odos-on-chain-provider';
import { OpenOceanProvider } from '../providers/aggregators/open-ocean/open-ocean-provider';
import { RangoOnChainProvider } from '../providers/aggregators/rango/rango-on-chain-provider';
export declare const AGGREGATORS_ON_CHAIN: {
    readonly LIFI: typeof LifiProvider;
    readonly OPEN_OCEAN: typeof OpenOceanProvider;
    readonly RANGO: typeof RangoOnChainProvider;
    readonly ODOS: typeof OdosOnChainProvider;
    readonly DLN: typeof DlnOnChainProvider;
};
