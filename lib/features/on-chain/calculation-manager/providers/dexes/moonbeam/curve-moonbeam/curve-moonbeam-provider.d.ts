import { CurveAbstractProvider } from "../../common/curve-provider/curve-abstract-provider";
import { CurveMoonbeamTrade } from "./curve-moonbeam-trade";
export declare class CurveMoonbeamProvider extends CurveAbstractProvider<CurveMoonbeamTrade> {
    readonly blockchain: "MOONBEAM";
    readonly Trade: typeof CurveMoonbeamTrade;
}
