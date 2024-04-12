import { PriceToken, PriceTokenAmount } from "../../../../../common/tokens";
import { BlockchainName, EvmBlockchainName } from "../../../../../core/blockchain/models/blockchain-name";
import { RequiredCrossChainOptions } from "../../models/cross-chain-options";
import { CrossChainProvider } from "../common/cross-chain-provider";
import { CalculationResult } from "../common/models/calculation-result";
import { FeeInfo } from "../common/models/fee-info";
import { RubicStep } from "../common/models/rubicStep";
import { SquidrouterCrossChainSupportedBlockchain } from "./constants/squidrouter-cross-chain-supported-blockchain";
import { SquidrouterEstimation } from "./models/estimation-response";
export declare class SquidrouterCrossChainProvider extends CrossChainProvider {
    static readonly apiEndpoint = "https://api.0xsquid.com/v1/";
    private readonly nativeAddress;
    readonly type: "squidrouter";
    isSupportedBlockchain(blockchain: BlockchainName): blockchain is SquidrouterCrossChainSupportedBlockchain;
    calculate(from: PriceTokenAmount<EvmBlockchainName>, toToken: PriceToken<EvmBlockchainName>, options: RequiredCrossChainOptions): Promise<CalculationResult>;
    protected getFeeInfo(fromBlockchain: SquidrouterCrossChainSupportedBlockchain, providerAddress: string, percentFeeToken: PriceTokenAmount, useProxy: boolean): Promise<FeeInfo>;
    protected getRoutePath(estimation: SquidrouterEstimation, from: PriceTokenAmount, to: PriceTokenAmount): Promise<RubicStep[]>;
}
