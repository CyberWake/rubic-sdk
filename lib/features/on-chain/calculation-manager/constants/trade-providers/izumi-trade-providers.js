"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.izumiTradeProviders = void 0;
const izumi_base_provider_1 = require("../../providers/dexes/base/izumi-base/izumi-base-provider");
const izumi_bsc_provider_1 = require("../../providers/dexes/bsc/izumi-bsc/izumi-bsc-provider");
const izumi_linea_provider_1 = require("../../providers/dexes/linea/izumi-linea/izumi-linea-provider");
const izumi_manta_pacific_provider_1 = require("../../providers/dexes/manta-pacific/izumi-manta-pacific/izumi-manta-pacific-provider");
const izumi_mantle_provider_1 = require("../../providers/dexes/mantle/izumi-mantle/izumi-mantle-provider");
const izumi_zetachain_provider_1 = require("../../providers/dexes/zetachain/izumi-zetachain/izumi-zetachain-provider");
const izumi_zksync_provider_1 = require("../../providers/dexes/zksync/izumi-zksync/izumi-zksync-provider");
exports.izumiTradeProviders = [
    izumi_bsc_provider_1.IzumiBscProvider,
    izumi_zksync_provider_1.IzumiZksyncProvider,
    izumi_mantle_provider_1.IzumiMantleProvider,
    izumi_base_provider_1.IzumiBaseProvider,
    izumi_linea_provider_1.IzumiLineaProvider,
    izumi_manta_pacific_provider_1.IzumiMantaPacificProvider,
    izumi_zetachain_provider_1.IzumiZetachainProvider
    // IzumiBlastProvider
];
//# sourceMappingURL=izumi-trade-providers.js.map