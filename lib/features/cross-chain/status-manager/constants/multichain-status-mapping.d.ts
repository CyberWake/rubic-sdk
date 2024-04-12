import { TxStatus } from "../../../../core/blockchain/web3-public-service/web3-public/models/tx-status";
type MultichainStatus = 0 | 3 | 8 | 9 | 10 | 12 | 14;
export declare const MULTICHAIN_STATUS_MAPPING: Record<MultichainStatus, TxStatus>;
export {};
