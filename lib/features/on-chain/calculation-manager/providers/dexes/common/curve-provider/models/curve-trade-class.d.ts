import { AbstractConstructorParameters, Constructor } from "../../../../../../../../common/utils/types";
import { CurveAbstractTrade } from "../curve-abstract-trade";
export type CurveTradeClass<T> = Constructor<AbstractConstructorParameters<typeof CurveAbstractTrade>, T> & Omit<typeof CurveAbstractTrade, 'constructor'>;
