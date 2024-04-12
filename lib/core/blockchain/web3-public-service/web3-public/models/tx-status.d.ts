export declare const TX_STATUS: {
    readonly PENDING: "PENDING";
    readonly SUCCESS: "SUCCESS";
    readonly FAIL: "FAIL";
    readonly FALLBACK: "FALLBACK";
    readonly REVERT: "REVERT";
    readonly UNKNOWN: "UNKNOWN";
    readonly READY_TO_CLAIM: "READY_TO_CLAIM";
};
export type TxStatus = (typeof TX_STATUS)[keyof typeof TX_STATUS];
