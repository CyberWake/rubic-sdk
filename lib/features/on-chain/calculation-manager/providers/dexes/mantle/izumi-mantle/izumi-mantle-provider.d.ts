import { IzumiProvider } from "../../common/izumi-abstract/izumi-provider";
export declare class IzumiMantleProvider extends IzumiProvider {
    readonly blockchain: "MANTLE";
    protected readonly dexAddress = "0x25C030116Feb2E7BbA054b9de0915E5F51b03e31";
    protected readonly config: {
        maxTransitTokens: number;
        quoterAddress: string;
        liquidityManagerAddress: string;
        routingTokenAddresses: string[];
        multicallAddress: string;
        supportedFees: number[];
    };
}
