import { SyncSwapAbstractProvider } from "../../common/sync-swap-abstract/sync-swap-abstract-provider";
export declare class ScrollSyncSwapProvider extends SyncSwapAbstractProvider {
    readonly blockchain: "SCROLL";
    readonly dexContractAddress = "0x80e38291e06339d10AAB483C65695D004dBD5C69";
    readonly routerHelperContract = "0x39D2E9dBD697e135E3D111F7176dBc123D6807ca";
    readonly vault = "0x7160570BB153Edd0Ea1775EC2b2Ac9b65F1aB61B";
    readonly factories: string[];
    readonly routeTokens: string[];
    readonly masterAddress = "0x608Cb7C3168427091F5994A45Baf12083964B4A3";
    readonly maxTransitTokens = 1;
}
