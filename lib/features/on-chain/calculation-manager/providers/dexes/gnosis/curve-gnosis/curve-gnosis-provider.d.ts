import { CurveAbstractProvider } from "../../common/curve-provider/curve-abstract-provider";
import { CurveGnosisTrade } from "./curve-gnosis-trade";
export declare class CurveGnosisProvider extends CurveAbstractProvider<CurveGnosisTrade> {
    readonly blockchain: "GNOSIS";
    readonly Trade: typeof CurveGnosisTrade;
}
