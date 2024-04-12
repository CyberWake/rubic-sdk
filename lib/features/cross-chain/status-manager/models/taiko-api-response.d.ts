export declare const TAIKO_API_EVENT_TYPE: {
    readonly SEND_ETH: 0;
    readonly SEND_ERC20: 1;
};
export type TaikoApiEventType = (typeof TAIKO_API_EVENT_TYPE)[keyof typeof TAIKO_API_EVENT_TYPE];
export declare const TAIKO_API_STATUS: {
    NEW: number;
    RETRIABLE: number;
    DONE: number;
    FAILED: number;
};
export type TaikoApiStatus = (typeof TAIKO_API_STATUS)[keyof typeof TAIKO_API_STATUS];
interface TaikoTransaction {
    readonly id: number;
    readonly name: string;
    readonly status: TaikoApiStatus;
    readonly eventType: TaikoApiEventType;
    readonly msgHash: string;
    readonly data: TaikoData;
}
interface TaikoData {
    readonly Raw: {
        readonly transactionHash: string;
    };
}
export interface TaikoApiResponse {
    readonly items: TaikoTransaction[];
}
export {};
