import { PriceToken, PriceTokenAmount } from "../../../../../common/tokens";
import { BlockchainName, EvmBlockchainName } from "../../../../../core/blockchain/models/blockchain-name";
import { RequiredCrossChainOptions } from "../../models/cross-chain-options";
import { CbridgeCrossChainSupportedBlockchain } from "../cbridge/constants/cbridge-supported-blockchains";
import { CrossChainProvider } from "../common/cross-chain-provider";
import { CalculationResult } from "../common/models/calculation-result";
import { FeeInfo } from "../common/models/fee-info";
import { RubicStep } from "../common/models/rubicStep";
import { ScrollBridgeSupportedBlockchain } from "./models/scroll-bridge-supported-blockchain";
export declare class ScrollBridgeProvider extends CrossChainProvider {
    readonly type: "scroll_bridge";
    isSupportedBlockchain(blockchain: BlockchainName): blockchain is ScrollBridgeSupportedBlockchain;
    calculate(fromToken: PriceTokenAmount<EvmBlockchainName>, toToken: PriceToken<EvmBlockchainName>, options: RequiredCrossChainOptions): Promise<CalculationResult>;
    protected getFeeInfo(_fromBlockchain: CbridgeCrossChainSupportedBlockchain, _providerAddress: string, _percentFeeToken: PriceTokenAmount, _useProxy: boolean): Promise<FeeInfo>;
    protected getRoutePath(fromToken: PriceTokenAmount, toToken: PriceTokenAmount): Promise<RubicStep[]>;
}
