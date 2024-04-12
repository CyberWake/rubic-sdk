import { AerodromeTrade } from "./aerodrome-trade";
import { UniswapRoute } from "../../common/uniswap-v2-abstract/models/uniswap-route";
import { PathFactory } from "../../common/uniswap-v2-abstract/path-factory";
export declare class AerodromePathFactory extends PathFactory<AerodromeTrade> {
    private routes;
    private calculateRoutes;
    protected getAllRoutes(): Promise<UniswapRoute[]>;
}
