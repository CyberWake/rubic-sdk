import { IzumiProvider } from "../../common/izumi-abstract/izumi-provider";
export declare class IzumiBscProvider extends IzumiProvider {
    readonly blockchain: "BSC";
    protected readonly dexAddress = "0xedf2021f41AbCfE2dEA4427E1B61f4d0AA5aA4b8";
    protected readonly config: {
        maxTransitTokens: number;
        quoterAddress: string;
        liquidityManagerAddress: string;
        routingTokenAddresses: string[];
        multicallAddress: string;
        supportedFees: number[];
    };
}
