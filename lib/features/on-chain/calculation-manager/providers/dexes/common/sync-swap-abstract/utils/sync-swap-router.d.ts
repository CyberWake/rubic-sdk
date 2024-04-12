import { BigNumber } from 'ethers';
import { EvmBlockchainName } from "../../../../../../../../core/blockchain/models/blockchain-name";
import { BestPathsWithAmounts, Path, PathWithAmounts } from "./typings";
export declare class SyncSwapRouter {
    static findBestAmountsForPathsExactIn(paths: Path[], amountInString: string, blockchainName: EvmBlockchainName, _ts?: number): Promise<BestPathsWithAmounts>;
    private static copyStep;
    private static getAmountOutClassic;
    static computeDFromAdjustedBalances(A: BigNumber, xp0: BigNumber, xp1: BigNumber, checkOverflow: boolean): BigNumber;
    static getY(A: BigNumber, x: BigNumber, d: BigNumber): BigNumber;
    private static getAmountOutStable;
    private static calculateAmountOut;
    private static splitAmounts2;
    private static splitAmounts3;
    private static splitAmounts4;
    private static splitAmounts5;
    private static fixSplitAmounts;
    private static splitAmount;
    private static calculateAmountOutForStep;
    static calculatePathAmountsByInput(path: Path, amountIn: BigNumber, _updateReserves: boolean, blockchainName: EvmBlockchainName): Promise<PathWithAmounts | null>;
    private static calculateGroupAmounts;
    private static getPoolPrecision;
}
