import { PriceToken, PriceTokenAmount } from "../../../../../common/tokens";
import { EvmBlockchainName } from "../../../../../core/blockchain/models/blockchain-name";
import { RequiredCrossChainOptions } from '../../models/cross-chain-options';
import { CrossChainProvider } from '../common/cross-chain-provider';
import { CalculationResult } from '../common/models/calculation-result';
import { FeeInfo } from '../common/models/fee-info';
import { RubicStep } from '../common/models/rubicStep';
import { OrbiterSupportedBlockchain } from './models/orbiter-supported-blockchains';
export declare class OrbiterBridgeProvider extends CrossChainProvider {
    readonly type: "orbiter_bridge";
    private orbiterQuoteConfigs;
    isSupportedBlockchain(blockchain: EvmBlockchainName): boolean;
    calculate(from: PriceTokenAmount<EvmBlockchainName>, toToken: PriceToken<EvmBlockchainName>, options: RequiredCrossChainOptions): Promise<CalculationResult>;
    protected getRoutePath(fromToken: PriceTokenAmount<EvmBlockchainName>, toToken: PriceTokenAmount<EvmBlockchainName>): Promise<RubicStep[]>;
    protected getFeeInfo(fromBlockchain: OrbiterSupportedBlockchain, providerAddress: string, percentFeeToken: PriceTokenAmount, useProxy: boolean): Promise<FeeInfo>;
}
