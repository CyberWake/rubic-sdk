export declare const SQUIDROUTER_TRANSFER_STATUS: {
    readonly SRC_GATEWAY_CALLED: "source_gateway_called";
    readonly DEST_GATEWAY_APPROVED: "destination_gateway_approved";
    readonly DEST_EXECUTED: "destination_executed";
    readonly EXPRESS_EXECUTED: "express_executed";
    readonly DEST_ERROR: "error";
    readonly ERROR_FETCHING_STATUS: "error_fetching_status";
};
export type SquidrouterTransferStatus = (typeof SQUIDROUTER_TRANSFER_STATUS)[keyof typeof SQUIDROUTER_TRANSFER_STATUS];
