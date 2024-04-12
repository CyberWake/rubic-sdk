"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DlnOnChainFactory = void 0;
const blockchains_info_1 = require("../../../../../../core/blockchain/utils/blockchains-info/blockchains-info");
const dln_evm_on_chain_trade_1 = require("./chains/dln-evm-on-chain-trade");
const dln_solana_on_chain_trade_1 = require("./chains/dln-solana-on-chain-trade");
class DlnOnChainFactory {
    static createTrade(fromBlockchain, tradeStruct, providerAddress) {
        if (blockchains_info_1.BlockchainsInfo.isSolanaBlockchainName(fromBlockchain)) {
            return new dln_solana_on_chain_trade_1.DlnSolanaOnChainTrade(tradeStruct, providerAddress);
        }
        if (blockchains_info_1.BlockchainsInfo.isEvmBlockchainName(fromBlockchain)) {
            return new dln_evm_on_chain_trade_1.DlnEvmOnChainTrade(tradeStruct, providerAddress);
        }
        throw new Error('Can not create trade instance');
    }
}
exports.DlnOnChainFactory = DlnOnChainFactory;
//# sourceMappingURL=dln-on-chain-factory.js.map