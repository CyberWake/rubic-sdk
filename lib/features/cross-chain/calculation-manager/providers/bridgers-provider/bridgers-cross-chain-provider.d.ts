import { PriceToken, PriceTokenAmount } from "../../../../../common/tokens";
import { BlockchainName } from "../../../../../core/blockchain/models/blockchain-name";
import { RequiredCrossChainOptions } from "../../models/cross-chain-options";
import { BridgersCrossChainSupportedBlockchain } from "./constants/bridgers-cross-chain-supported-blockchain";
import { CrossChainProvider } from "../common/cross-chain-provider";
import { CalculationResult } from "../common/models/calculation-result";
import { FeeInfo } from "../common/models/fee-info";
import { RubicStep } from "../common/models/rubicStep";
import { AbiItem } from 'web3-utils';
export declare class BridgersCrossChainProvider extends CrossChainProvider {
    readonly type: "bridgers";
    isSupportedBlockchain(blockchain: BlockchainName): blockchain is BridgersCrossChainSupportedBlockchain;
    areSupportedBlockchains(fromBlockchain: BlockchainName, toBlockchain: BlockchainName): boolean;
    calculate(from: PriceTokenAmount, toToken: PriceToken, options: RequiredCrossChainOptions): Promise<CalculationResult>;
    protected getFeeInfo(fromBlockchain: BridgersCrossChainSupportedBlockchain, _providerAddress: string, _percentFeeToken: PriceTokenAmount, _useProxy: boolean, _contractAbi: AbiItem[]): Promise<FeeInfo>;
    protected getRoutePath(fromToken: PriceTokenAmount, toToken: PriceTokenAmount): Promise<RubicStep[]>;
}
