import { PriceToken, PriceTokenAmount } from "../../../../../../common/tokens";
import { BlockchainName } from "../../../../../../core/blockchain/models/blockchain-name";
import { DlnOnChainSupportedBlockchain } from "./constants/dln-on-chain-supported-blockchains";
import { DlnOnChainCalculationOptions } from "./models/dln-on-chain-calculation-options";
import { OnChainTradeStruct } from "../../common/on-chain-trade/evm-on-chain-trade/models/evm-on-chain-trade-struct";
import { GasFeeInfo } from "../../common/on-chain-trade/evm-on-chain-trade/models/gas-fee-info";
import { OnChainTrade } from "../../common/on-chain-trade/on-chain-trade";
import { OnChainTradeError } from '../../../models/on-chain-trade-error';
import { AggregatorOnChainProvider } from '../../common/on-chain-aggregator/aggregator-on-chain-provider-abstract';
export declare class DlnOnChainProvider extends AggregatorOnChainProvider {
    readonly tradeType: "DLN";
    private readonly defaultOptions;
    protected isSupportedBlockchain(blockchain: BlockchainName): boolean;
    calculate(from: PriceTokenAmount<DlnOnChainSupportedBlockchain>, toToken: PriceToken<DlnOnChainSupportedBlockchain>, options: DlnOnChainCalculationOptions): Promise<OnChainTrade | OnChainTradeError>;
    protected getGasFeeInfo(_tradeStruct: OnChainTradeStruct<BlockchainName>, _providerGateway?: string): Promise<GasFeeInfo | null>;
    private getAffiliateFee;
}
