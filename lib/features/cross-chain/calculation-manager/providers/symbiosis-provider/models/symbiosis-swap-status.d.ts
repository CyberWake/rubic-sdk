export declare const SYMBIOSIS_SWAP_STATUS: {
    readonly STUCKED: "Stucked";
    readonly REVERTED: "Reverted";
    readonly SUCCESS: "Success";
    readonly PENDING: "Pending";
    readonly NOT_FOUND: "Not found";
};
export type SymbiosisSwapStatus = (typeof SYMBIOSIS_SWAP_STATUS)[keyof typeof SYMBIOSIS_SWAP_STATUS];
