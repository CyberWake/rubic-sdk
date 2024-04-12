import { IzumiProvider } from "../../common/izumi-abstract/izumi-provider";
export declare class IzumiBaseProvider extends IzumiProvider {
    readonly blockchain: "BASE";
    protected readonly dexAddress = "0x02F55D53DcE23B4AA962CC68b0f685f26143Bdb2";
    protected readonly config: {
        maxTransitTokens: number;
        quoterAddress: string;
        liquidityManagerAddress: string;
        routingTokenAddresses: string[];
        multicallAddress: string;
        supportedFees: number[];
    };
}
