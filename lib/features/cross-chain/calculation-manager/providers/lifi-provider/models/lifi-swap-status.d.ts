export declare const LIFI_SWAP_STATUS: {
    readonly NOT_FOUND: "NOT_FOUND";
    readonly INVALID: "INVALID";
    readonly PENDING: "PENDING";
    readonly DONE: "DONE";
    readonly FAILED: "FAILED";
};
export type LifiSwapStatus = (typeof LIFI_SWAP_STATUS)[keyof typeof LIFI_SWAP_STATUS];
