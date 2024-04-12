import { IzumiProvider } from "../../common/izumi-abstract/izumi-provider";
export declare class IzumiBlastProvider extends IzumiProvider {
    readonly blockchain: "BLAST";
    protected readonly dexAddress = "0xA3F50FeBA40dd3E884688C0AF72C4054D07a1c50";
    protected readonly config: {
        maxTransitTokens: number;
        quoterAddress: string;
        liquidityManagerAddress: string;
        routingTokenAddresses: string[];
        multicallAddress: string;
        supportedFees: number[];
    };
}
