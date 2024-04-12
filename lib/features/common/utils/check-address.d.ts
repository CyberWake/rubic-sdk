import { BlockchainName } from "../../../core/blockchain/models/blockchain-name";
import { CrossChainTradeType } from "../../cross-chain/calculation-manager/models/cross-chain-trade-type";
import { OnChainTradeType } from "../../on-chain/calculation-manager/providers/common/models/on-chain-trade-type";
export declare function isAddressCorrect(address: string, toBlockchain: BlockchainName, crossChainType?: CrossChainTradeType | OnChainTradeType): Promise<boolean>;
