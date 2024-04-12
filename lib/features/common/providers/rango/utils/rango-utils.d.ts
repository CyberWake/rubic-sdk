import { PriceToken } from "../../../../../common/tokens";
import { BlockchainName, EvmBlockchainName } from "../../../../../core/blockchain/models/blockchain-name";
import { TxStatus } from "../../../../../core/blockchain/web3-public-service/web3-public/models/tx-status";
import { BridgeType } from "../../../../cross-chain/calculation-manager/providers/common/models/bridge-type";
import { OnChainTradeType } from "../../../../on-chain/calculation-manager/providers/common/models/on-chain-trade-type";
import { RangoBlockchainName } from '../models/rango-api-blockchain-names';
import { RangoSwapStatus } from '../models/rango-api-status-types';
import { RangoTradeType, RubicTradeTypeForRango } from '../models/rango-api-trade-types';
export declare class RangoUtils {
    /**
     * @returns Query-param string in format `chainName.symbol--address`, chainName's compatible with rango-api
     */
    static getFromToQueryParam(token: PriceToken<EvmBlockchainName>): Promise<string>;
    static convertStatusForRubic(rangoStatus: RangoSwapStatus): TxStatus;
    static getRubicBlockchainByRangoBlockchain(rangoBlockchainName: RangoBlockchainName): BlockchainName;
    static getTradeTypeForRubic(swapType: 'cross-chain' | 'on-chain', rangoTradeType: RangoTradeType): BridgeType | OnChainTradeType;
    static getTradeTypeForRango(rubicTradeType: RubicTradeTypeForRango): RangoTradeType;
}
