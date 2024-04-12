import { Token } from "../../../../../../../../../common/tokens";
import { EvmBlockchainName } from "../../../../../../../../../core/blockchain/models/blockchain-name";
import { MethodData } from "../../../../../../../../../core/blockchain/web3-public-service/web3-public/models/method-data";
import { Exact } from "../../../../../common/on-chain-trade/evm-on-chain-trade/models/exact";
import { UniswapV3Route } from "../../models/uniswap-v3-route";
import { UniswapV3RouterConfiguration } from "../../models/uniswap-v3-router-configuration";
import { FeeAmount, LiquidityPool } from "./models/liquidity-pool";
import { UniswapV3QuoterController } from "./uniswap-v3-quoter-controller";
interface GetQuoterMethodsDataOptions {
    routesLiquidityPools: LiquidityPool[];
    from: Token;
    to: Token;
    exact: Exact;
    weiAmount: string;
    maxTransitTokens: number;
}
export declare class FusionXUniswapV3QuoterController extends UniswapV3QuoterController {
    protected readonly feeAmounts: FeeAmount[];
    constructor(blockchain: EvmBlockchainName, routerConfiguration: UniswapV3RouterConfiguration<string>);
    /**
     * Returns swap method's name and arguments to pass it to Quoter contract.
     * @param poolsPath Pools, included in the route.
     * @param from From token.
     * @param to To token.
     * @param exact Is exact input or output trade.
     * @param weiAmount Amount of tokens to trade.
     */
    protected static getQuoterMethodData(poolsPath: LiquidityPool[], from: Token, to: Token, exact: Exact, weiAmount: string): {
        poolsPath: LiquidityPool[];
        methodData: MethodData;
    };
    getAllRoutes(from: Token, to: Token, exact: Exact, weiAmount: string, routeMaxTransitTokens: number): Promise<UniswapV3Route[]>;
    /**
     * Returns swap methods' names and arguments, built with passed pools' addresses, to use it in Quoter contract.
     */
    protected getQuoterMethodsData(options: GetQuoterMethodsDataOptions, path: LiquidityPool[], lastTokenAddress: string): {
        poolsPath: LiquidityPool[];
        methodData: MethodData;
    }[];
}
export {};
