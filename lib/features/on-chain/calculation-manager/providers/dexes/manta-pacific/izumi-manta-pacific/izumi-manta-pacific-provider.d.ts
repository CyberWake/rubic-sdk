import { IzumiProvider } from "../../common/izumi-abstract/izumi-provider";
export declare class IzumiMantaPacificProvider extends IzumiProvider {
    readonly blockchain: "MANTA_PACIFIC";
    protected readonly dexAddress = "0x3EF68D3f7664b2805D4E88381b64868a56f88bC4";
    protected readonly config: {
        maxTransitTokens: number;
        quoterAddress: string;
        liquidityManagerAddress: string;
        routingTokenAddresses: string[];
        multicallAddress: string;
        supportedFees: number[];
    };
}
