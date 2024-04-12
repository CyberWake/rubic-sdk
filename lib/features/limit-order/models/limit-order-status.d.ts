export declare const LIMIT_ORDER_STATUS: {
    readonly VALID: "valid";
    readonly FILLED: "filled";
    readonly EXPIRED: "expired";
};
export type LimitOrderStatus = (typeof LIMIT_ORDER_STATUS)[keyof typeof LIMIT_ORDER_STATUS];
