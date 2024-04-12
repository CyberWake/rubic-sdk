import { PriceToken, PriceTokenAmount } from "../../../../../../../common/tokens";
import { EvmBlockchainName } from "../../../../../../../core/blockchain/models/blockchain-name";
import { OnChainCalculationOptions } from "../../../common/models/on-chain-calculation-options";
import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { EvmOnChainProvider } from "../on-chain-provider/evm-on-chain-provider/evm-on-chain-provider";
import { SyncSwapAbstractTrade } from "./sync-swap-abstract-trade";
export declare abstract class SyncSwapAbstractProvider extends EvmOnChainProvider {
    abstract blockchain: EvmBlockchainName;
    protected abstract dexContractAddress: string;
    protected abstract routerHelperContract: string;
    protected abstract vault: string;
    protected abstract factories: string[];
    protected abstract routeTokens: string[];
    protected abstract masterAddress: string;
    protected abstract maxTransitTokens: number;
    private readonly defaultOptions;
    get type(): OnChainTradeType;
    calculate(from: PriceTokenAmount<EvmBlockchainName>, toToken: PriceToken<EvmBlockchainName>, options?: OnChainCalculationOptions): Promise<SyncSwapAbstractTrade>;
    private getAvailablePools;
}
