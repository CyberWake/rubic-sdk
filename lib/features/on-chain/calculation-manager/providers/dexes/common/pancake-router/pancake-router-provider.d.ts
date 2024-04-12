import { PriceToken, PriceTokenAmount } from "../../../../../../../common/tokens";
import { EvmBlockchainName } from "../../../../../../../core/blockchain/models/blockchain-name";
import { OnChainCalculationOptions } from "../../../common/models/on-chain-calculation-options";
import { OnChainTradeType } from "../../../common/models/on-chain-trade-type";
import { EvmOnChainTrade } from "../../../common/on-chain-trade/evm-on-chain-trade/evm-on-chain-trade";
import { EvmOnChainProvider } from "../on-chain-provider/evm-on-chain-provider/evm-on-chain-provider";
import { UniswapV2CalculationOptions } from "../uniswap-v2-abstract/models/uniswap-v2-calculation-options";
import { Chain } from 'viem';
export declare abstract class PancakeRouterProvider extends EvmOnChainProvider {
    abstract readonly blockchain: EvmBlockchainName;
    protected abstract readonly chain: Chain;
    get type(): OnChainTradeType;
    protected readonly defaultOptions: UniswapV2CalculationOptions;
    protected abstract readonly dexAddress: string;
    protected abstract readonly v3subgraphAddress: string;
    protected abstract readonly v2subgraphAddress: string;
    protected abstract readonly maxHops: number;
    protected abstract readonly maxSplits: number;
    calculate(from: PriceTokenAmount<EvmBlockchainName>, to: PriceToken<EvmBlockchainName>, options?: OnChainCalculationOptions): Promise<EvmOnChainTrade>;
    private getPools;
    private createPublicClient;
    private getPath;
}
