import { PriceToken, PriceTokenAmount } from "../../../../../common/tokens";
import { BlockchainName, EvmBlockchainName } from "../../../../../core/blockchain/models/blockchain-name";
import { RequiredCrossChainOptions } from "../../models/cross-chain-options";
import { ArbitrumRbcBridgeSupportedBlockchain } from "./models/arbitrum-rbc-bridge-supported-blockchain";
import { CbridgeCrossChainSupportedBlockchain } from "../cbridge/constants/cbridge-supported-blockchains";
import { CrossChainProvider } from "../common/cross-chain-provider";
import { CalculationResult } from "../common/models/calculation-result";
import { FeeInfo } from "../common/models/fee-info";
import { RubicStep } from "../common/models/rubicStep";
export declare class ArbitrumRbcBridgeProvider extends CrossChainProvider {
    readonly type: "arbitrum";
    private readonly l1TokenAddress;
    private readonly l2TokenAddress;
    isSupportedBlockchain(blockchain: BlockchainName): blockchain is ArbitrumRbcBridgeSupportedBlockchain;
    calculate(fromToken: PriceTokenAmount<EvmBlockchainName>, toToken: PriceToken<EvmBlockchainName>, options: RequiredCrossChainOptions): Promise<CalculationResult>;
    protected getFeeInfo(_fromBlockchain: CbridgeCrossChainSupportedBlockchain, _providerAddress: string, _percentFeeToken: PriceTokenAmount, _useProxy: boolean): Promise<FeeInfo>;
    protected getRoutePath(fromToken: PriceTokenAmount, toToken: PriceTokenAmount): Promise<RubicStep[]>;
}
