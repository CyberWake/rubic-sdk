export interface OrbiterResponse<T> {
    message: string;
    params: {
        method: string;
        routes: object;
        url: string;
    };
    status: string;
    result: T;
}
export declare const ORBITER_STATUS: {
    readonly ERROR: 3;
    readonly SUCCESS: 2;
};
export type OrbiterTxStatus = (typeof ORBITER_STATUS)[keyof typeof ORBITER_STATUS];
export declare const ORBITER_OP_STATUS: {
    SOURCE_CHAIN_OR_TOKEN_NOT_FOUND: number;
    TARGET_CHAIN_OR_TOKEN_NOT_FOUND: number;
    RULE_NOT_FOUND: number;
    NONCE_EXCEED_MAXIMUM: number;
    AMOUNT_TOO_SMALL: number;
    REFUND: number;
    MONEY_WILL_REFUND: number;
    ABNORMAL_PAYMENT: number;
    MONEY_REFUNDED: number;
    SUCCESS_PAYMENT: number;
};
export type OrbiterOpTxStatus = (typeof ORBITER_OP_STATUS)[keyof typeof ORBITER_OP_STATUS];
