import { CurveAvalancheTrade } from "./curve-avalanche-trade";
import { CurveAbstractProvider } from "../../common/curve-provider/curve-abstract-provider";
export declare class CurveAvalancheProvider extends CurveAbstractProvider<CurveAvalancheTrade> {
    readonly blockchain: "AVALANCHE";
    readonly Trade: typeof CurveAvalancheTrade;
}
