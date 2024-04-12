import { LimitOrder as OneinchLimitOrder } from '@1inch/limit-order-protocol-utils';
import { BlockchainName } from "../../core/blockchain/models/blockchain-name";
import { LimitOrder } from "./models/limit-order";
import { LimitOrderApi } from "./models/limit-order-api";
export declare class LimitOrderApiService {
    private getApiOrders;
    getUserOrders(userAddress: string): Promise<LimitOrder[]>;
    private parseLimitOrder;
    private sortOrders;
    getOrderByHash(userAddress: string, blockchain: BlockchainName, hash: string): Promise<LimitOrderApi | null>;
    createLimitOrder(chainId: number, body: {
        orderHash: string;
        signature: string;
        data: OneinchLimitOrder;
    }): Promise<void>;
}
