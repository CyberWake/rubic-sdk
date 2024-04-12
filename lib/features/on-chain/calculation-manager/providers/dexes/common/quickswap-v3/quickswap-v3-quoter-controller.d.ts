import { PriceToken } from "../../../../../../../common/tokens";
import { Exact } from "../../../common/on-chain-trade/evm-on-chain-trade/models/exact";
import { AlgebraQuoterController } from "../algebra/algebra-quoter-controller";
import { AlgebraRoute } from "../../polygon/algebra/models/algebra-route";
/**
 * Works with requests, related to Uniswap v3 liquidity pools.
 */
export declare class QuickswapV3QuoterController extends AlgebraQuoterController {
    getAllRoutes(from: PriceToken, to: PriceToken, exact: Exact, weiAmount: string, routeMaxTransitTokens: number): Promise<AlgebraRoute[]>;
}
