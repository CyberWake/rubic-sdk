export declare const CHANGENOW_API_STATUS: {
    readonly NEW: "new";
    readonly WAITING: "waiting";
    readonly CONFIRMING: "confirming";
    readonly EXCHANGING: "exchanging";
    readonly SENDING: "sending";
    readonly FINISHED: "finished";
    readonly FAILED: "failed";
    readonly REFUNDED: "refunded";
    readonly VERIFYING: "verifying";
};
export type ChangenowApiStatus = (typeof CHANGENOW_API_STATUS)[keyof typeof CHANGENOW_API_STATUS];
export interface ChangenowStatusResponse {
    status: ChangenowApiStatus;
    payoutHash: string | null;
}
