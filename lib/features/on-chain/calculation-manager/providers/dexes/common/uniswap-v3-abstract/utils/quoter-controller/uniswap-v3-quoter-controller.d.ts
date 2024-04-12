import { Token } from "../../../../../../../../../common/tokens";
import { EvmBlockchainName } from "../../../../../../../../../core/blockchain/models/blockchain-name";
import { EvmWeb3Public } from "../../../../../../../../../core/blockchain/web3-public-service/web3-public/evm-web3-public/evm-web3-public";
import { MethodData } from "../../../../../../../../../core/blockchain/web3-public-service/web3-public/models/method-data";
import { Exact } from "../../../../../common/on-chain-trade/evm-on-chain-trade/models/exact";
import { UniswapV3Route } from "../../models/uniswap-v3-route";
import { UniswapV3RouterConfiguration } from "../../models/uniswap-v3-router-configuration";
import { FeeAmount, LiquidityPool } from "./models/liquidity-pool";
import { UniswapV3AlgebraQuoterController } from "../../../uniswap-v3-algebra-abstract/models/uniswap-v3-algebra-quoter-controller";
import { AbiItem } from 'web3-utils';
interface GetQuoterMethodsDataOptions {
    routesLiquidityPools: LiquidityPool[];
    from: Token;
    to: Token;
    exact: Exact;
    weiAmount: string;
    maxTransitTokens: number;
}
/**
 * Works with requests, related to Uniswap v3 liquidity pools.
 */
export declare class UniswapV3QuoterController extends UniswapV3AlgebraQuoterController {
    protected readonly blockchain: EvmBlockchainName;
    protected readonly routerConfiguration: UniswapV3RouterConfiguration<string>;
    protected readonly quoterContractAddress: string;
    protected readonly quoterContractABI: AbiItem[];
    protected readonly factoryAddress: string;
    /**
     * Converts uni v3 route to encoded bytes string to pass it to contract.
     * Structure of encoded string: '0x${tokenAddress_0}${toHex(fee_0)}${tokenAddress_1}${toHex(fee_1)}...${tokenAddress_n}.
     * toHex(fee_i) must be of length 6, so leading zeroes are added.
     * @param pools Liquidity pools, included in route.
     * @param initialTokenAddress From token address.
     * @returns string Encoded string.
     */
    static getEncodedPoolsPath(pools: LiquidityPool[], initialTokenAddress: string): string;
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
    private routerTokens;
    private routerLiquidityPools;
    protected readonly feeAmounts: FeeAmount[];
    protected get web3Public(): EvmWeb3Public;
    constructor(blockchain: EvmBlockchainName, routerConfiguration: UniswapV3RouterConfiguration<string>, quoterContractAddress?: string, quoterContractABI?: AbiItem[], factoryAddress?: string);
    private getOrCreateRouterTokensAndLiquidityPools;
    /**
     * Returns all liquidity pools, containing passed tokens addresses, and concatenates with most popular pools.
     */
    protected getAllLiquidityPools(firstToken: Token, secondToken: Token): Promise<LiquidityPool[]>;
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
