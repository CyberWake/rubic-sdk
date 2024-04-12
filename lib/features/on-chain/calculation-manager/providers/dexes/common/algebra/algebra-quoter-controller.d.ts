import { PriceToken, Token } from "../../../../../../../common/tokens";
import { EvmBlockchainName } from "../../../../../../../core/blockchain/models/blockchain-name";
import { EvmWeb3Public } from "../../../../../../../core/blockchain/web3-public-service/web3-public/evm-web3-public/evm-web3-public";
import { MethodData } from "../../../../../../../core/blockchain/web3-public-service/web3-public/models/method-data";
import { Exact } from "../../../common/on-chain-trade/evm-on-chain-trade/models/exact";
import { UniswapV3AlgebraQuoterController } from "../uniswap-v3-algebra-abstract/models/uniswap-v3-algebra-quoter-controller";
import { AlgebraRoute } from "../../polygon/algebra/models/algebra-route";
import { AbiItem } from 'web3-utils';
interface GetQuoterMethodsDataOptions {
    routesTokens: Token[];
    to: Token;
    exact: Exact;
    weiAmount: string;
    maxTransitTokens: number;
}
/**
 * Works with requests, related to Uniswap v3 liquidity pools.
 */
export declare class AlgebraQuoterController extends UniswapV3AlgebraQuoterController {
    protected readonly blockchain: EvmBlockchainName;
    protected readonly routingTokensAddresses: string[];
    protected readonly quoterContractAddress: string;
    protected readonly quoterContractABI: AbiItem[];
    protected routerTokens: Token[] | undefined;
    /**
     * Converts algebra route to encoded bytes string to pass it to contract.
     * Structure of encoded string: '0x${tokenAddress_0}${tokenAddress_1}...${tokenAddress_n}.
     * @param path Symbol tokens, included in route.
     * @returns string Encoded string.
     */
    static getEncodedPath(path: Token[]): string;
    /**
     * Returns swap method's name and arguments to pass it to Quoter contract.
     * @param path Pools, included in route.
     * @param exact Is exact input or output trade.
     * @param weiAmount Amount of tokens to trade.
     */
    private static getQuoterMethodData;
    protected get web3Public(): EvmWeb3Public;
    constructor(blockchain: EvmBlockchainName, routingTokensAddresses: string[], quoterContractAddress?: string, quoterContractABI?: AbiItem[]);
    protected getOrCreateRouterTokens(): Promise<Token[]>;
    getAllRoutes(from: PriceToken, to: PriceToken, exact: Exact, weiAmount: string, routeMaxTransitTokens: number): Promise<AlgebraRoute[]>;
    /**
     * Returns swap methods' names and arguments, built with passed pools' addresses, to use it in Quoter contract.
     */
    protected getQuoterMethodsData(options: GetQuoterMethodsDataOptions, path: Token[]): {
        path: Token[];
        methodData: MethodData;
    }[];
}
export {};
