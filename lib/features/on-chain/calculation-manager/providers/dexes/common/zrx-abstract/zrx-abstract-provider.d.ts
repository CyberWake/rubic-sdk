import { PriceToken, PriceTokenAmount } from "../../../../../../../common/tokens";
import { EvmBlockchainName } from "../../../../../../../core/blockchain/models/blockchain-name";
import { OnChainCalculationOptions } from "../../../common/models/on-chain-calculation-options";
import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { EvmOnChainProvider } from "../on-chain-provider/evm-on-chain-provider/evm-on-chain-provider";
import { ZrxTrade } from "./zrx-trade";
export declare abstract class ZrxAbstractProvider extends EvmOnChainProvider {
    private readonly defaultOptions;
    readonly supportReceiverAddress = false;
    get type(): OnChainTradeType;
    private get apiBaseUrl();
    calculate(from: PriceTokenAmount<EvmBlockchainName>, toToken: PriceToken<EvmBlockchainName>, options?: OnChainCalculationOptions): Promise<ZrxTrade>;
    /**
     * Fetches zrx data from api.
     */
    private getTradeData;
}
