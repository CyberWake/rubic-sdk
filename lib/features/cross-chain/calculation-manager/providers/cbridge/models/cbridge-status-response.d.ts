export declare const TRANSFER_HISTORY_STATUS: {
    readonly TRANSFER_UNKNOWN: "TRANSFER_UNKNOWN";
    readonly TRANSFER_SUBMITTING: "TRANSFER_SUBMITTING";
    readonly TRANSFER_FAILED: "TRANSFER_FAILED";
    readonly TRANSFER_WAITING_FOR_SGN_CONFIRMATION: "TRANSFER_WAITING_FOR_SGN_CONFIRMATION";
    readonly TRANSFER_WAITING_FOR_FUND_RELEASE: "TRANSFER_WAITING_FOR_FUND_RELEASE";
    readonly TRANSFER_COMPLETED: "TRANSFER_COMPLETED";
    readonly TRANSFER_TO_BE_REFUNDED: "TRANSFER_TO_BE_REFUNDED";
    readonly TRANSFER_REQUESTING_REFUND: "TRANSFER_REQUESTING_REFUND";
    readonly TRANSFER_REFUND_TO_BE_CONFIRMED: "TRANSFER_REFUND_TO_BE_CONFIRMED";
    readonly TRANSFER_CONFIRMING_YOUR_REFUND: "TRANSFER_CONFIRMING_YOUR_REFUND";
    readonly TRANSFER_REFUNDED: "TRANSFER_REFUNDED";
    readonly TRANSFER_DELAYED: "TRANSFER_DELAYED";
};
export declare const TRANSFER_HISTORY_STATUS_CODE: Record<number, TransferHistoryStatus>;
export type TransferHistoryStatus = (typeof TRANSFER_HISTORY_STATUS)[keyof typeof TRANSFER_HISTORY_STATUS];
export declare const XFER_STATUS: {
    readonly UNKNOWN: "UNKNOWN";
    readonly OK_TO_RELAY: "OK_TO_RELAY";
    readonly SUCCESS: "SUCCESS";
    readonly BAD_LIQUIDITY: "BAD_LIQUIDITY";
    readonly BAD_SLIPPAGE: "BAD_SLIPPAGE";
    readonly BAD_TOKEN: "BAD_TOKEN";
    readonly REFUND_REQUESTED: "REFUND_REQUESTED";
    readonly REFUND_DONE: "REFUND_DONE";
    readonly BAD_XFER_DISABLED: "BAD_XFER_DISABLED";
    readonly BAD_DEST_CHAIN: "BAD_DEST_CHAIN";
};
export declare const XFER_STATUS_CODE: Record<number, XferStatus>;
export type XferStatus = (typeof XFER_STATUS)[keyof typeof XFER_STATUS];
export interface CbridgeStatusResponse {
    readonly err: null | string;
    readonly status: number;
    readonly wd_onchain: string | null;
    readonly sorted_sigs: string[];
    readonly signers: string[];
    readonly powers: string[];
    readonly refund_reason: number;
    readonly block_delay: number;
    readonly src_block_tx_link: string;
    readonly dst_block_tx_link: string;
}
