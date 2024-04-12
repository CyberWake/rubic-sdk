import { PriceToken, PriceTokenAmount } from "../../../../../../common/tokens";
import { BlockchainName } from "../../../../../../core/blockchain/models/blockchain-name";
import { OnChainTradeError } from '../../../models/on-chain-trade-error';
import { RequiredOnChainCalculationOptions } from '../../common/models/on-chain-calculation-options';
import { AggregatorOnChainProvider } from '../../common/on-chain-aggregator/aggregator-on-chain-provider-abstract';
import { GasFeeInfo } from '../../common/on-chain-trade/evm-on-chain-trade/models/gas-fee-info';
import { OnChainTrade } from '../../common/on-chain-trade/on-chain-trade';
import { SymbiosisTradeStruct } from './models/symbiosis-on-chain-trade-types';
export declare class SymbiosisOnChainProvider extends AggregatorOnChainProvider {
    readonly tradeType: "SYMBIOSIS_SWAP";
    protected isSupportedBlockchain(blockchain: BlockchainName): boolean;
    calculate(from: PriceTokenAmount<BlockchainName>, toToken: PriceToken<BlockchainName>, options: RequiredOnChainCalculationOptions): Promise<OnChainTrade | OnChainTradeError>;
    protected getGasFeeInfo(tradeStruct: SymbiosisTradeStruct, providerGateway: string): Promise<GasFeeInfo | null>;
}
