import { CurveAbstractProvider } from "../../common/curve-provider/curve-abstract-provider";
import { CurveKavaTrade } from "./curve-kava-trade";
export declare class CurveKavaProvider extends CurveAbstractProvider<CurveKavaTrade> {
    readonly blockchain: "KAVA";
    readonly Trade: typeof CurveKavaTrade;
}
