import BigNumber from 'bignumber.js';
import { PriceToken, PriceTokenAmount } from "../../../../../../../common/tokens";
import { EvmBlockchainName } from "../../../../../../../core/blockchain/models/blockchain-name";
import { OnChainCalculationOptions } from "../../../common/models/on-chain-calculation-options";
import { Exact } from "../../../common/on-chain-trade/evm-on-chain-trade/models/exact";
import { EvmOnChainProvider } from "../on-chain-provider/evm-on-chain-provider/evm-on-chain-provider";
import { UniswapV3TradeClass } from "../uniswap-v3-abstract/models/uniswap-v3-trade-class";
import { UniswapV3AlgebraCalculatedInfo } from "./models/uniswap-v3-algebra-calculated-info";
import { UniswapV3AlgebraCalculationOptions } from "./models/uniswap-v3-algebra-calculation-options";
import { UniswapV3AlgebraProviderConfiguration } from "./models/uniswap-v3-algebra-provider-configuration";
import { UniswapV3AlgebraQuoterController } from "./models/uniswap-v3-algebra-quoter-controller";
import { UniswapV3AlgebraRoute } from "./models/uniswap-v3-algebra-route";
import { UniswapV3AlgebraTradeStructOmitPath } from "./models/uniswap-v3-algebra-trade-struct";
import { UniswapV3AlgebraAbstractTrade } from "./uniswap-v3-algebra-abstract-trade";
import { AlgebraTrade } from "../../polygon/algebra/algebra-trade";
import { QuickSwapV3Trade } from "../../polygon/quick-swap-v3/quick-swap-v3-trade";
import { QuickSwapV3PolygonZKEVMTrade } from "../../polygon-zkevm/quick-swap-v3/quick-swap-v3-trade";
import { UniSwapV3ScrollSepoliaTrade } from "../../scroll-sepolia/uni-swap-v3-scroll-sepolia/uni-swap-v3-scroll-sepolia-trade";
import { AbiItem } from 'web3-utils';
import { AlgebraIntegralTrade } from '../../arthera-testnet/algebra-integral/algebra-integral-trade';
export declare abstract class UniswapV3AlgebraAbstractProvider<T extends UniswapV3AlgebraAbstractTrade = UniswapV3AlgebraAbstractTrade> extends EvmOnChainProvider {
    protected abstract readonly contractAbi: AbiItem[];
    protected abstract readonly contractAddress: string;
    protected abstract readonly OnChainTradeClass: UniswapV3TradeClass<T> | typeof AlgebraTrade | typeof AlgebraIntegralTrade | typeof QuickSwapV3Trade | typeof QuickSwapV3PolygonZKEVMTrade | typeof UniSwapV3ScrollSepoliaTrade;
    protected abstract readonly quoterController: UniswapV3AlgebraQuoterController;
    protected abstract readonly providerConfiguration: UniswapV3AlgebraProviderConfiguration;
    protected readonly isRubicOptimisationEnabled: boolean;
    protected readonly defaultOptions: UniswapV3AlgebraCalculationOptions;
    protected abstract createTradeInstance(tradeStruct: UniswapV3AlgebraTradeStructOmitPath, route: UniswapV3AlgebraRoute, providerAddress: string): T;
    calculate(from: PriceTokenAmount<EvmBlockchainName>, toToken: PriceToken<EvmBlockchainName>, options?: OnChainCalculationOptions): Promise<T>;
    /**
     * Calculates trade, based on amount, user wants to get.
     * @param fromToken Token to sell.
     * @param to Token to get with output amount.
     * @param options Additional options.
     */
    calculateExactOutput(fromToken: PriceToken<EvmBlockchainName>, to: PriceTokenAmount<EvmBlockchainName>, options?: OnChainCalculationOptions): Promise<T>;
    /**
     * Calculates input amount, based on amount, user wants to get.
     * @param fromToken Token to sell.
     * @param to Token to get with output amount.
     * @param options Additional options.
     */
    calculateExactOutputAmount(fromToken: PriceToken<EvmBlockchainName>, to: PriceTokenAmount<EvmBlockchainName>, options?: OnChainCalculationOptions): Promise<BigNumber>;
    protected calculateDifficultTrade(fromToken: PriceToken<EvmBlockchainName>, toToken: PriceToken<EvmBlockchainName>, exact: Exact, weiAmount: BigNumber, options?: OnChainCalculationOptions): Promise<T>;
    protected getRoute(from: PriceToken<EvmBlockchainName>, to: PriceToken<EvmBlockchainName>, exact: Exact, weiAmount: BigNumber, options: UniswapV3AlgebraCalculationOptions, gasPriceInUsd?: BigNumber): Promise<UniswapV3AlgebraCalculatedInfo>;
}
