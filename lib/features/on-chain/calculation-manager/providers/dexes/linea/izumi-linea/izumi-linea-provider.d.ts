import { IzumiProvider } from "../../common/izumi-abstract/izumi-provider";
export declare class IzumiLineaProvider extends IzumiProvider {
    readonly blockchain: "LINEA";
    protected readonly dexAddress = "0x032b241De86a8660f1Ae0691a4760B426EA246d7";
    protected readonly config: {
        maxTransitTokens: number;
        quoterAddress: string;
        liquidityManagerAddress: string;
        routingTokenAddresses: string[];
        multicallAddress: string;
        supportedFees: number[];
    };
}
