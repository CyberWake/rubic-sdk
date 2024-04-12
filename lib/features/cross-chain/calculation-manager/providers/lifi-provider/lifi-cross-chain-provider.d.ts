import { Route } from '@lifi/sdk';
import { PriceToken, PriceTokenAmount } from "../../../../../common/tokens";
import { BlockchainName, EvmBlockchainName } from "../../../../../core/blockchain/models/blockchain-name";
import { RequiredCrossChainOptions } from "../../models/cross-chain-options";
import { CrossChainProvider } from "../common/cross-chain-provider";
import { CalculationResult } from "../common/models/calculation-result";
import { FeeInfo } from "../common/models/fee-info";
import { RubicStep } from "../common/models/rubicStep";
import { LifiCrossChainSupportedBlockchain } from "./constants/lifi-cross-chain-supported-blockchain";
export declare class LifiCrossChainProvider extends CrossChainProvider {
    readonly type: "lifi";
    private readonly lifi;
    private readonly MIN_AMOUNT_USD;
    isSupportedBlockchain(blockchain: BlockchainName): blockchain is LifiCrossChainSupportedBlockchain;
    calculate(from: PriceTokenAmount<EvmBlockchainName>, toToken: PriceToken<EvmBlockchainName>, options: RequiredCrossChainOptions): Promise<CalculationResult>;
    private checkMinError;
    protected getFeeInfo(fromBlockchain: LifiCrossChainSupportedBlockchain, providerAddress: string, percentFeeToken: PriceTokenAmount, useProxy: boolean): Promise<FeeInfo>;
    private parseTradeTypes;
    private checkBridgeTypes;
    protected getRoutePath(from: PriceTokenAmount, to: PriceTokenAmount, route: Route): Promise<RubicStep[]>;
}
