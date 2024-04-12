import { SyncSwapAbstractProvider } from "../../common/sync-swap-abstract/sync-swap-abstract-provider";
export declare class ZkSyncSyncSwapProvider extends SyncSwapAbstractProvider {
    readonly blockchain: "ZK_SYNC";
    readonly dexContractAddress = "0x2da10A1e27bF85cEdD8FFb1AbBe97e53391C0295";
    readonly routerHelperContract = "0x5c07e74cb541c3d1875aeee441d691ded6eba204";
    readonly vault = "0x621425a1Ef6abE91058E9712575dcc4258F8d091";
    readonly factories: string[];
    readonly routeTokens: string[];
    readonly masterAddress = "0xbb05918e9b4ba9fe2c8384d223f0844867909ffb";
    readonly maxTransitTokens = 1;
}
