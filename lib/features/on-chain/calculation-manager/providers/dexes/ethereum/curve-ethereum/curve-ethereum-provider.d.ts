import { CurveAbstractProvider } from "../../common/curve-provider/curve-abstract-provider";
import { CurveEthereumTrade } from "./curve-ethereum-trade";
export declare class CurveEthereumProvider extends CurveAbstractProvider<CurveEthereumTrade> {
    readonly blockchain: "ETH";
    readonly Trade: typeof CurveEthereumTrade;
}
