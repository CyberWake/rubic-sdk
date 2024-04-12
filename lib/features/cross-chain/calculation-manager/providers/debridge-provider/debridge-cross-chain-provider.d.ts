import { PriceToken, PriceTokenAmount } from "../../../../../common/tokens";
import { BlockchainName } from "../../../../../core/blockchain/models/blockchain-name";
import { RequiredCrossChainOptions } from "../../models/cross-chain-options";
import { CrossChainProvider } from "../common/cross-chain-provider";
import { CalculationResult } from "../common/models/calculation-result";
import { FeeInfo } from "../common/models/fee-info";
import { RubicStep } from "../common/models/rubicStep";
import { DeBridgeCrossChainSupportedBlockchain } from "./constants/debridge-cross-chain-supported-blockchain";
import { Estimation } from "./models/estimation-response";
export declare class DebridgeCrossChainProvider extends CrossChainProvider {
    readonly type: "dln";
    isSupportedBlockchain(blockchain: BlockchainName): blockchain is DeBridgeCrossChainSupportedBlockchain;
    calculate(from: PriceTokenAmount<DeBridgeCrossChainSupportedBlockchain>, toToken: PriceToken<DeBridgeCrossChainSupportedBlockchain>, options: RequiredCrossChainOptions): Promise<CalculationResult>;
    protected getFeeInfo(fromBlockchain: DeBridgeCrossChainSupportedBlockchain, providerAddress: string, percentFeeToken: PriceTokenAmount, useProxy: boolean): Promise<FeeInfo>;
    private parseDebridgeApiError;
    protected getRoutePath(estimation: Estimation, from: PriceTokenAmount, to: PriceTokenAmount): Promise<RubicStep[]>;
    private getGasData;
    private checkDeflationTokens;
    private getAffiliateFee;
}
