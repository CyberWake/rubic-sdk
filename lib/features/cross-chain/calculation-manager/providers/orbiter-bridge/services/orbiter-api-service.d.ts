import BigNumber from 'bignumber.js';
import { PriceTokenAmount } from "../../../../../../common/tokens";
import { EvmBlockchainName } from "../../../../../../core/blockchain/models/blockchain-name";
import { TxStatusData } from "../../../../../common/status-manager/models/tx-status-data";
import { OrbiterQuoteConfig } from '../models/orbiter-api-quote-types';
export declare class OrbiterApiService {
    private static dealerId;
    static getQuoteConfigs(): Promise<OrbiterQuoteConfig[]>;
    static calculateAmount(from: PriceTokenAmount<EvmBlockchainName>, config: OrbiterQuoteConfig): BigNumber;
    static getTxStatus(txHash: string): Promise<TxStatusData>;
}
