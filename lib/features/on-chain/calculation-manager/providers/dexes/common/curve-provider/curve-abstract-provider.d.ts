import { PriceToken, PriceTokenAmount } from "../../../../../../../common/tokens";
import { EvmBlockchainName } from "../../../../../../../core/blockchain/models/blockchain-name";
import { OnChainCalculationOptions } from "../../../common/models/on-chain-calculation-options";
import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { EvmOnChainTrade } from "../../../common/on-chain-trade/evm-on-chain-trade/evm-on-chain-trade";
import { CurveAbstractTrade } from "./curve-abstract-trade";
import { CurveTradeClass } from "./models/curve-trade-class";
import { EvmOnChainProvider } from "../on-chain-provider/evm-on-chain-provider/evm-on-chain-provider";
export declare abstract class CurveAbstractProvider<T extends CurveAbstractTrade = CurveAbstractTrade> extends EvmOnChainProvider {
    /** @internal */
    abstract readonly Trade: CurveTradeClass<T>;
    protected readonly addressProvider = "0x0000000022D53366457F9d5E68Ec105046FC4383";
    static readonly nativeAddress = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
    private readonly defaultOptions;
    get type(): OnChainTradeType;
    calculate(fromToken: PriceTokenAmount<EvmBlockchainName>, toToken: PriceToken<EvmBlockchainName>, options?: OnChainCalculationOptions): Promise<EvmOnChainTrade>;
    private fetchRegistryExchangeAddress;
    private fetchRegistryAddress;
    private fetchPoolAddress;
    private fetchBestRate;
    private fetchExchangeAmount;
}
