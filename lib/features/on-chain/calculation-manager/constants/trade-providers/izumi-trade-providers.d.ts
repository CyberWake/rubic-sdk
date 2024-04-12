import { IzumiBaseProvider } from "../../providers/dexes/base/izumi-base/izumi-base-provider";
import { IzumiBscProvider } from "../../providers/dexes/bsc/izumi-bsc/izumi-bsc-provider";
import { IzumiLineaProvider } from "../../providers/dexes/linea/izumi-linea/izumi-linea-provider";
import { IzumiMantaPacificProvider } from "../../providers/dexes/manta-pacific/izumi-manta-pacific/izumi-manta-pacific-provider";
import { IzumiMantleProvider } from "../../providers/dexes/mantle/izumi-mantle/izumi-mantle-provider";
import { IzumiZetachainProvider } from "../../providers/dexes/zetachain/izumi-zetachain/izumi-zetachain-provider";
import { IzumiZksyncProvider } from "../../providers/dexes/zksync/izumi-zksync/izumi-zksync-provider";
export declare const izumiTradeProviders: (typeof IzumiBscProvider | typeof IzumiZksyncProvider | typeof IzumiMantleProvider | typeof IzumiBaseProvider | typeof IzumiLineaProvider | typeof IzumiMantaPacificProvider | typeof IzumiZetachainProvider)[];
