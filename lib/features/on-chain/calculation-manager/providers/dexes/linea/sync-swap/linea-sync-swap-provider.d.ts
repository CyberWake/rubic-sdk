import { SyncSwapAbstractProvider } from "../../common/sync-swap-abstract/sync-swap-abstract-provider";
export declare class LineaSyncSwapProvider extends SyncSwapAbstractProvider {
    readonly blockchain: "LINEA";
    readonly dexContractAddress = "0x80e38291e06339d10AAB483C65695D004dBD5C69";
    readonly routerHelperContract = "0x91e3D3E51dC93B80a2FFBfdCa29EbF33e132D4E6";
    readonly vault = "0x7160570BB153Edd0Ea1775EC2b2Ac9b65F1aB61B";
    readonly factories: string[];
    readonly routeTokens: string[];
    readonly masterAddress = "0x608Cb7C3168427091F5994A45Baf12083964B4A3";
    readonly maxTransitTokens = 1;
}
