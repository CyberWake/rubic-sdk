import { VooiTradeStruct } from '../../common/vooi-abstract/models/vooi-trade-struct';
import { VooiAbstractProvider } from '../../common/vooi-abstract/vooi-abstract-provider';
import { VooiLineaTrade } from './vooi-trade';
export declare class VooiLineaProvider extends VooiAbstractProvider {
    protected readonly omniPoolAddress = "0x87E4c4517B28844f575Cfbbc4CABBD867863EA6E";
    protected readonly vooiPoolIdMapping: Record<string, number>;
    readonly blockchain: "LINEA";
    protected createTradeInstance(tradeStruct: VooiTradeStruct, providerAddress: string): VooiLineaTrade;
}
