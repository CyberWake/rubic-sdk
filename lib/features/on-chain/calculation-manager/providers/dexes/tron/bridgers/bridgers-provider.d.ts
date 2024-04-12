import { PriceToken, PriceTokenAmount } from "../../../../../../../common/tokens";
import { TronBlockchainName } from "../../../../../../../core/blockchain/models/blockchain-name";
import { OnChainCalculationOptions } from "../../../common/models/on-chain-calculation-options";
import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { TronOnChainProvider } from "../../common/on-chain-provider/tron-on-chain-provider/tron-on-chain-provider";
import { BridgersTrade } from "./bridgers-trade";
export declare class BridgersProvider extends TronOnChainProvider {
    private readonly defaultOptions;
    get type(): OnChainTradeType;
    calculate(from: PriceTokenAmount<TronBlockchainName>, toToken: PriceToken<TronBlockchainName>, options?: OnChainCalculationOptions): Promise<BridgersTrade>;
}
