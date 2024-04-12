import { Token } from "../../common/tokens";
import { BlockchainName } from "../../core/blockchain/models/blockchain-name";
import { DeflationManagerSupportedBlockchain } from "./models/deflation-manager-supported-blockchain";
import { IsDeflationToken } from "./models/is-deflation-token";
/**
 * Contains method to check token for deflation.
 */
export declare class DeflationTokenManager {
    static isSupportedBlockchain(blockchain: BlockchainName): blockchain is DeflationManagerSupportedBlockchain;
    checkToken(token: Token): Promise<void | never>;
    isDeflationToken(token: Token): Promise<IsDeflationToken>;
    private findUniswapV2Trade;
    private simulateTransferWithSwap;
    private parseError;
}
