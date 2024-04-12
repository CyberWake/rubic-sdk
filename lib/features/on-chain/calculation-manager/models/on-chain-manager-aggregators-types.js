"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AGGREGATORS_ON_CHAIN = void 0;
const dln_on_chain_provider_1 = require("../providers/aggregators/dln/dln-on-chain-provider");
const lifi_provider_1 = require("../providers/aggregators/lifi/lifi-provider");
const odos_on_chain_provider_1 = require("../providers/aggregators/odos/odos-on-chain-provider");
const open_ocean_provider_1 = require("../providers/aggregators/open-ocean/open-ocean-provider");
const rango_on_chain_provider_1 = require("../providers/aggregators/rango/rango-on-chain-provider");
exports.AGGREGATORS_ON_CHAIN = {
    LIFI: lifi_provider_1.LifiProvider,
    OPEN_OCEAN: open_ocean_provider_1.OpenOceanProvider,
    RANGO: rango_on_chain_provider_1.RangoOnChainProvider,
    ODOS: odos_on_chain_provider_1.OdosOnChainProvider,
    DLN: dln_on_chain_provider_1.DlnOnChainProvider
    // SYMBIOSIS: SymbiosisOnChainProvider
};
//# sourceMappingURL=on-chain-manager-aggregators-types.js.map