import { PriceToken, PriceTokenAmount } from "../../../../../../../common/tokens";
import { EvmBlockchainName } from "../../../../../../../core/blockchain/models/blockchain-name";
import { OnChainCalculationOptions } from "../../../common/models/on-chain-calculation-options";
import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { EvmOnChainProvider } from "../on-chain-provider/evm-on-chain-provider/evm-on-chain-provider";
import { VooiTradeStruct } from './models/vooi-trade-struct';
import { VooiAbstractTrade } from './vooi-abstract-trade';
export declare abstract class VooiAbstractProvider<T extends VooiAbstractTrade = VooiAbstractTrade> extends EvmOnChainProvider {
    get type(): OnChainTradeType;
    private readonly defaultOptions;
    protected abstract readonly omniPoolAddress: string;
    protected abstract readonly vooiPoolIdMapping: Record<string, number>;
    protected abstract createTradeInstance(tradeStruct: VooiTradeStruct, providerAddress: string): T;
    calculate(fromToken: PriceTokenAmount<EvmBlockchainName>, toToken: PriceToken<EvmBlockchainName>, options?: OnChainCalculationOptions): Promise<T>;
    private getRoute;
}
