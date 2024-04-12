import { SquidrouterEstimation } from "./estimation-response";
export interface SquirouterTransaction {
    readonly routeType: string;
    readonly targetAddress: string;
    readonly data: string;
    readonly value: string;
    readonly gasLimit: string;
    readonly gasPrice: string;
    readonly maxFeePerGas: string;
    readonly maxPriorityFeePerGas: string;
}
/**
 * Swap transaction response.
 */
export interface SquidrouterTransactionResponse {
    readonly route: {
        /**
         * Trade estimation response.
         */
        readonly estimate: SquidrouterEstimation;
        /**
         * Transaction data.
         */
        readonly transactionRequest: SquirouterTransaction;
    };
}
