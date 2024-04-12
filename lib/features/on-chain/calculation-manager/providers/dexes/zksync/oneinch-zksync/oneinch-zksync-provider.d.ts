import { OneinchAbstractProvider } from "../../common/oneinch-abstract/oneinch-abstract-provider";
export declare class OneinchZksyncProvider extends OneinchAbstractProvider {
    readonly blockchain: "ZK_SYNC";
    protected getAvailableProtocols(): string | undefined;
}
