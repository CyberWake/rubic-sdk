import { PriceToken, PriceTokenAmount } from "../../../../../../common/tokens";
import { BlockchainName, EvmBlockchainName } from "../../../../../../core/blockchain/models/blockchain-name";
import { LifiCalculationOptions } from "./models/lifi-calculation-options";
import { LifiTradeStruct } from "./models/lifi-trade-struct";
import { GasFeeInfo } from "../../common/on-chain-trade/evm-on-chain-trade/models/gas-fee-info";
import { OnChainTrade } from "../../common/on-chain-trade/on-chain-trade";
import { OnChainTradeError } from '../../../models/on-chain-trade-error';
import { AggregatorOnChainProvider } from '../../common/on-chain-aggregator/aggregator-on-chain-provider-abstract';
export declare class LifiProvider extends AggregatorOnChainProvider {
    readonly tradeType: "LIFI";
    private readonly lifi;
    private readonly defaultOptions;
    protected isSupportedBlockchain(blockchain: BlockchainName): boolean;
    calculate(from: PriceTokenAmount<EvmBlockchainName>, toToken: PriceToken<EvmBlockchainName>, options: LifiCalculationOptions): Promise<OnChainTrade | OnChainTradeError>;
    /**
     * @description Lifi-aggregator provides several providers at the same time, this method chooses the most profitable trade
     * @param trades all available lifiTrades
     * @returns best trade
     */
    private getBestTrade;
    protected getGasFeeInfo(lifiTradeStruct: LifiTradeStruct): Promise<GasFeeInfo | null>;
}
