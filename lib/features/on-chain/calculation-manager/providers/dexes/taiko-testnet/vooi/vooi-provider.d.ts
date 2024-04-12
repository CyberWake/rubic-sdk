import { VooiTradeStruct } from '../../common/vooi-abstract/models/vooi-trade-struct';
import { VooiAbstractProvider } from '../../common/vooi-abstract/vooi-abstract-provider';
import { VooiTaikoTrade } from './vooi-trade';
export declare class VooiTaikoProvider extends VooiAbstractProvider {
    protected readonly omniPoolAddress = "0xf3BDe7E88Ea5d85c2ee514be416fab4b2Bf9d8E5";
    protected readonly vooiPoolIdMapping: Record<string, number>;
    readonly blockchain: "TAIKO";
    protected createTradeInstance(tradeStruct: VooiTradeStruct, providerAddress: string): VooiTaikoTrade;
}
