import { BigNumber } from 'ethers';
import { EvmBlockchainName } from "../../../../../../../../core/blockchain/models/blockchain-name";
import { GetAmountParams, Path, RoutePoolData, RoutePools } from './typings';
export declare class SyncSwapPathFactory {
    private static readonly liquidityMinReserve;
    static hasLiquidity(routePool: RoutePoolData, tokenInAddress?: string, amountOut?: BigNumber): boolean;
    private static createPath;
    private static getPoolKey;
    private static getPathsWith1Hop;
    private static getPathsWith2Hops;
    static findAllPossiblePaths(tokenIn: string, tokenOut: string, routePools: RoutePools, enableHops?: boolean): Path[];
    static getBestPath(paths: Path[], amountIn: string, blockchainName: EvmBlockchainName): Promise<Path[]>;
    private static getQuoteOutStable;
    private static getQuoteOutClassic;
    static calculateQuoteOut(params: GetAmountParams): BigNumber;
}
