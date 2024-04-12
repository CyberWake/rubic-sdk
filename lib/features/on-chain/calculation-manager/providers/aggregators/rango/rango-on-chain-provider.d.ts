import { PriceToken, PriceTokenAmount } from "../../../../../../common/tokens";
import { BlockchainName, EvmBlockchainName } from "../../../../../../core/blockchain/models/blockchain-name";
import { OnChainTradeError } from '../../../models/on-chain-trade-error';
import { RequiredOnChainCalculationOptions } from '../../common/models/on-chain-calculation-options';
import { AggregatorOnChainProvider } from '../../common/on-chain-aggregator/aggregator-on-chain-provider-abstract';
import { GasFeeInfo } from '../../common/on-chain-trade/evm-on-chain-trade/models/gas-fee-info';
import { OnChainTrade } from '../../common/on-chain-trade/on-chain-trade';
import { RangoOnChainTradeStruct } from './models/rango-on-chain-trade-types';
export declare class RangoOnChainProvider extends AggregatorOnChainProvider {
    readonly tradeType: "RANGO";
    protected isSupportedBlockchain(blockchainName: BlockchainName): boolean;
    calculate(from: PriceTokenAmount<EvmBlockchainName>, toToken: PriceToken<EvmBlockchainName>, options: RequiredOnChainCalculationOptions): Promise<OnChainTrade | OnChainTradeError>;
    protected getGasFeeInfo(tradeStruct: RangoOnChainTradeStruct, providerGateway: string): Promise<GasFeeInfo | null>;
}
