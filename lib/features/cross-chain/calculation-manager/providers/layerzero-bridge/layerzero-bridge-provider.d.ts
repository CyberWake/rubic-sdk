import { PriceToken, PriceTokenAmount } from "../../../../../common/tokens";
import { BlockchainName, EvmBlockchainName } from "../../../../../core/blockchain/models/blockchain-name";
import { RequiredCrossChainOptions } from "../../models/cross-chain-options";
import { CbridgeCrossChainSupportedBlockchain } from "../cbridge/constants/cbridge-supported-blockchains";
import { CrossChainProvider } from "../common/cross-chain-provider";
import { CalculationResult } from "../common/models/calculation-result";
import { FeeInfo } from "../common/models/fee-info";
import { RubicStep } from "../common/models/rubicStep";
import { LayerZeroBridgeSupportedBlockchain } from './models/layerzero-bridge-supported-blockchains';
export declare class LayerZeroBridgeProvider extends CrossChainProvider {
    readonly type: "layerzero";
    isSupportedBlockchain(blockchain: BlockchainName): blockchain is LayerZeroBridgeSupportedBlockchain;
    calculate(fromToken: PriceTokenAmount<EvmBlockchainName>, toToken: PriceToken<EvmBlockchainName>, options: RequiredCrossChainOptions): Promise<CalculationResult>;
    protected getFeeInfo(_fromBlockchain: CbridgeCrossChainSupportedBlockchain, _providerAddress: string, _percentFeeToken: PriceTokenAmount, _useProxy: boolean): Promise<FeeInfo>;
    protected getRoutePath(fromToken: PriceTokenAmount<EvmBlockchainName>, toToken: PriceTokenAmount<EvmBlockchainName>): Promise<RubicStep[]>;
}
