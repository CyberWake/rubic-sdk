import { PriceToken, PriceTokenAmount } from "../../../../../common/tokens";
import { EvmBlockchainName } from "../../../../../core/blockchain/models/blockchain-name";
import { RangoQuotePath } from "../../../../common/providers/rango/models/rango-api-best-route-types";
import { RangoSupportedBlockchain } from "../../../../common/providers/rango/models/rango-supported-blockchains";
import { CrossChainTradeType } from '../../models/cross-chain-trade-type';
import { CrossChainProvider } from '../common/cross-chain-provider';
import { CalculationResult } from '../common/models/calculation-result';
import { FeeInfo } from '../common/models/fee-info';
import { RubicStep } from '../common/models/rubicStep';
import { RangoCrossChainOptions } from './model/rango-cross-chain-api-types';
export declare class RangoCrossChainProvider extends CrossChainProvider {
    type: CrossChainTradeType;
    static readonly apiKey = "a24ca428-a18e-4e84-b57f-edb3e2a5bf13";
    static readonly apiEndpoint = "https://api.rango.exchange/basic";
    private rangoSupportedBlockchains;
    isSupportedBlockchain(blockchain: EvmBlockchainName): boolean;
    calculate(from: PriceTokenAmount<EvmBlockchainName>, toToken: PriceToken<EvmBlockchainName>, options: RangoCrossChainOptions): Promise<CalculationResult>;
    protected getRoutePath(fromToken: PriceTokenAmount<EvmBlockchainName>, toToken: PriceTokenAmount<EvmBlockchainName>, path: RangoQuotePath[] | null): Promise<RubicStep[]>;
    private getStep;
    protected getFeeInfo(fromBlockchain: RangoSupportedBlockchain, providerAddress: string, percentFeeToken: PriceTokenAmount, useProxy: boolean): Promise<FeeInfo>;
    private getCryptoFee;
}
