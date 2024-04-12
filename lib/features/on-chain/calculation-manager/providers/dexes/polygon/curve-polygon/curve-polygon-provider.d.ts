import { CurveAbstractProvider } from "../../common/curve-provider/curve-abstract-provider";
import { CurvePolygonTrade } from "./curve-polygon-trade";
export declare class CurvePolygonProvider extends CurveAbstractProvider<CurvePolygonTrade> {
    readonly blockchain: "POLYGON";
    readonly Trade: typeof CurvePolygonTrade;
}
