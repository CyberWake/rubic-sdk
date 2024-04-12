import { EvmBlockchainName } from "../../../../../../core/blockchain/models/blockchain-name";
import { EvmEncodeConfig } from "../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/models/evm-encode-config";
import { EncodeTransactionOptions } from "../../../../../common/models/encode-transaction-options";
import { EvmOnChainTrade } from "../on-chain-trade/evm-on-chain-trade/evm-on-chain-trade";
import { EvmOnChainTradeStruct } from "../on-chain-trade/evm-on-chain-trade/models/evm-on-chain-trade-struct";
export declare class EvmWrapTrade extends EvmOnChainTrade {
    get dexContractAddress(): string;
    readonly type: "WRAPPED";
    encodeDirect(options: EncodeTransactionOptions): Promise<EvmEncodeConfig>;
    constructor(evmOnChainTradeStruct: EvmOnChainTradeStruct, providerAddress: string);
    static isSupportedBlockchain(blockchain: EvmBlockchainName): boolean;
    static isSupportedTrade(blockchain: EvmBlockchainName, fromAddress: string, toAddress: string): boolean;
    needApprove(_fromAddress?: string): Promise<boolean>;
}
