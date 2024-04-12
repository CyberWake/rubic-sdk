import { IzumiProvider } from "../../common/izumi-abstract/izumi-provider";
export declare class IzumiZetachainProvider extends IzumiProvider {
    readonly blockchain: "ZETACHAIN";
    protected readonly dexAddress = "0x34bc1b87f60e0a30c0e24FD7Abada70436c71406";
    protected readonly config: {
        maxTransitTokens: number;
        quoterAddress: string;
        liquidityManagerAddress: string;
        routingTokenAddresses: string[];
        multicallAddress: string;
        supportedFees: number[];
    };
}
