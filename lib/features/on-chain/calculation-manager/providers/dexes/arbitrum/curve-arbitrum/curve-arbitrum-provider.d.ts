import { CurveArbitrumTrade } from "./curve-arbitrum-trade";
import { CurveAbstractProvider } from "../../common/curve-provider/curve-abstract-provider";
export declare class CurveArbitrumProvider extends CurveAbstractProvider<CurveArbitrumTrade> {
    readonly blockchain: "ARBITRUM";
    readonly Trade: typeof CurveArbitrumTrade;
}
