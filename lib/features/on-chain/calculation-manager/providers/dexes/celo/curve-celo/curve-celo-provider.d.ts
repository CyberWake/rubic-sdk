import { CurveCeloTrade } from "./curve-celo-trade";
import { CurveAbstractProvider } from "../../common/curve-provider/curve-abstract-provider";
export declare class CurveCeloProvider extends CurveAbstractProvider<CurveCeloTrade> {
    readonly blockchain: "CELO";
    readonly Trade: typeof CurveCeloTrade;
}
