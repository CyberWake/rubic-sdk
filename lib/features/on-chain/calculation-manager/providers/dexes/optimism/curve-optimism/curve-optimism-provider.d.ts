import { CurveAbstractProvider } from "../../common/curve-provider/curve-abstract-provider";
import { CurveOptimismTrade } from "./curve-optimism-trade";
export declare class CurveOptimismProvider extends CurveAbstractProvider<CurveOptimismTrade> {
    readonly blockchain: "OPTIMISM";
    readonly Trade: typeof CurveOptimismTrade;
}
