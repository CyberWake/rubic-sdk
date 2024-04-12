import { PriceToken, PriceTokenAmount } from "../../../../../common/tokens";
import { BlockchainName, EvmBlockchainName } from "../../../../../core/blockchain/models/blockchain-name";
import { XyQuote } from "../../../../common/providers/xy/models/xy-quote-success-response";
import { RequiredCrossChainOptions } from "../../models/cross-chain-options";
import { CrossChainProvider } from "../common/cross-chain-provider";
import { CalculationResult } from "../common/models/calculation-result";
import { FeeInfo } from "../common/models/fee-info";
import { RubicStep } from "../common/models/rubicStep";
import { XyCrossChainSupportedBlockchain } from "./constants/xy-supported-blockchains";
export declare class XyCrossChainProvider extends CrossChainProvider {
    readonly type: "xy";
    isSupportedBlockchain(blockchain: BlockchainName): blockchain is XyCrossChainSupportedBlockchain;
    calculate(fromToken: PriceTokenAmount<EvmBlockchainName>, toToken: PriceToken<EvmBlockchainName>, options: RequiredCrossChainOptions): Promise<CalculationResult>;
    protected getFeeInfo(fromBlockchain: XyCrossChainSupportedBlockchain, providerAddress: string, percentFeeToken: PriceTokenAmount, useProxy: boolean): Promise<FeeInfo>;
    protected getRoutePath(fromToken: PriceTokenAmount, toToken: PriceTokenAmount, quote: XyQuote): Promise<RubicStep[]>;
}
