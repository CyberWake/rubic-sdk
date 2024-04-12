import { CurveAbstractProvider } from "../../common/curve-provider/curve-abstract-provider";
import { CurveFantomTrade } from "./curve-fantom-trade";
export declare class CurveFantomProvider extends CurveAbstractProvider<CurveFantomTrade> {
    readonly blockchain: "FANTOM";
    readonly Trade: typeof CurveFantomTrade;
}
