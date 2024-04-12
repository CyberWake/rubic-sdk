import { IzumiProvider } from "../../common/izumi-abstract/izumi-provider";
export declare class IzumiZksyncProvider extends IzumiProvider {
    readonly blockchain: "ZK_SYNC";
    protected readonly dexAddress = "0x943ac2310D9BC703d6AB5e5e76876e212100f894";
    protected readonly config: {
        maxTransitTokens: number;
        quoterAddress: string;
        liquidityManagerAddress: string;
        routingTokenAddresses: string[];
        multicallAddress: string;
        supportedFees: number[];
    };
}
