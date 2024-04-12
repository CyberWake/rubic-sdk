import { Token } from "../../../../common/tokens";
import { BlockchainName } from "../../../../core/blockchain/models/blockchain-name";
export declare class DlnUtils {
    static getSupportedAddress(token: Token): string;
    static getFakeReceiver(blockchain: BlockchainName): string;
}
