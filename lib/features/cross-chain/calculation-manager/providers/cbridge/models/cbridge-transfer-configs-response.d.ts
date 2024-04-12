import { CbridgeChain } from "./cbridge-chain";
import { CbridgeChainTokenInfo } from "./cbridge-chain-token-info";
import { PeggedPairConfig } from "./pegged-pair-config";
export interface CbridgeTransferConfigsResponse {
    readonly chains: CbridgeChain[];
    readonly chain_token: {
        [P: number]: CbridgeChainTokenInfo;
    };
    readonly farming_reward_contract_addr: string;
    readonly pegged_pair_configs: PeggedPairConfig[];
}
