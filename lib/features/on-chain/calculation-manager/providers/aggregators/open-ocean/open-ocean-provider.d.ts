import { PriceToken, PriceTokenAmount } from "../../../../../../common/tokens";
import { BlockchainName, EvmBlockchainName } from "../../../../../../core/blockchain/models/blockchain-name";
import { OnChainTradeError } from "../../../models/on-chain-trade-error";
import { OpenOceanTradeStruct } from "./models/open-ocean-trade-struct";
import { RequiredOnChainCalculationOptions } from "../../common/models/on-chain-calculation-options";
import { GasFeeInfo } from "../../common/on-chain-trade/evm-on-chain-trade/models/gas-fee-info";
import { OnChainTrade } from "../../common/on-chain-trade/on-chain-trade";
import { AggregatorOnChainProvider } from '../../common/on-chain-aggregator/aggregator-on-chain-provider-abstract';
export declare class OpenOceanProvider extends AggregatorOnChainProvider {
    readonly tradeType: "OPEN_OCEAN";
    static readonly nativeAddress = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
    protected isSupportedBlockchain(blockchain: BlockchainName): boolean;
    calculate(from: PriceTokenAmount<EvmBlockchainName>, toToken: PriceToken<EvmBlockchainName>, options: RequiredOnChainCalculationOptions): Promise<OnChainTrade | OnChainTradeError>;
    private getTokenAddress;
    protected getGasFeeInfo(tradeStruct: OpenOceanTradeStruct): Promise<GasFeeInfo | null>;
    private checkIsSupportedTokens;
}
