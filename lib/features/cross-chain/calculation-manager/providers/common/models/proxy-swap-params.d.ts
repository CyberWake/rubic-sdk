import { PriceTokenAmount } from "../../../../../../common/tokens";
import { EvmBlockchainName } from "../../../../../../core/blockchain/models/blockchain-name";
import { EvmEncodeConfig } from "../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/models/evm-encode-config";
import { EncodeTransactionOptions } from "../../../../../common/models/encode-transaction-options";
export interface ProxySwapParams {
    walletAddress: string;
    contractAddress: string;
    fromTokenAmount: PriceTokenAmount<EvmBlockchainName>;
    toTokenAmount: PriceTokenAmount;
    onChainEncodeFn: (options: EncodeTransactionOptions) => Promise<EvmEncodeConfig>;
}
