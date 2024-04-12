import { PriceToken, PriceTokenAmount } from "../../../../../../../common/tokens";
import { EvmBlockchainName } from "../../../../../../../core/blockchain/models/blockchain-name";
import { OnChainCalculationOptions } from "../../../common/models/on-chain-calculation-options";
import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { EvmOnChainTrade } from "../../../common/on-chain-trade/evm-on-chain-trade/evm-on-chain-trade";
import { EvmOnChainProvider } from "../on-chain-provider/evm-on-chain-provider/evm-on-chain-provider";
import { UniswapV2CalculationOptions } from "../uniswap-v2-abstract/models/uniswap-v2-calculation-options";
export declare abstract class IzumiProvider extends EvmOnChainProvider {
    abstract readonly blockchain: EvmBlockchainName;
    get type(): OnChainTradeType;
    protected readonly defaultOptions: UniswapV2CalculationOptions;
    protected abstract readonly dexAddress: string;
    protected abstract readonly config: {
        readonly maxTransitTokens: number;
        readonly routingTokenAddresses: string[];
        readonly liquidityManagerAddress: string;
        readonly quoterAddress: string;
        readonly multicallAddress: string;
        readonly supportedFees: number[];
    };
    calculate(from: PriceTokenAmount<EvmBlockchainName>, to: PriceToken<EvmBlockchainName>, options?: OnChainCalculationOptions): Promise<EvmOnChainTrade>;
}
