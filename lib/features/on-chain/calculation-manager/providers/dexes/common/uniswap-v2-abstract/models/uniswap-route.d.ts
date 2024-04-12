import BigNumber from 'bignumber.js';
import { Token } from "../../../../../../../../common/tokens";
import { AerodromeRoutePoolArgument } from "./aerodrome-route-method-arguments";
export interface UniswapRoute {
    readonly path: ReadonlyArray<Token>;
    readonly outputAbsoluteAmount: BigNumber;
    readonly routPoolInfo?: AerodromeRoutePoolArgument[];
}
