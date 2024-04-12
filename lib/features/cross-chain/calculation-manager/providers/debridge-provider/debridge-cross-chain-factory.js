"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebridgeCrossChainFactory = void 0;
const blockchains_info_1 = require("../../../../../core/blockchain/utils/blockchains-info/blockchains-info");
const debridge_evm_cross_chain_trade_1 = require("./chains/debridge-evm-cross-chain-trade");
const debridge_solana_cross_chain_trade_1 = require("./chains/debridge-solana-cross-chain-trade");
class DebridgeCrossChainFactory {
    static createTrade(fromBlockchain, constructorParams, providerAddress, routePath) {
        if (blockchains_info_1.BlockchainsInfo.isSolanaBlockchainName(fromBlockchain)) {
            return new debridge_solana_cross_chain_trade_1.DebridgeSolanaCrossChainTrade(constructorParams, providerAddress, routePath);
        }
        if (blockchains_info_1.BlockchainsInfo.isEvmBlockchainName(fromBlockchain)) {
            return new debridge_evm_cross_chain_trade_1.DebridgeEvmCrossChainTrade(constructorParams, providerAddress, routePath);
        }
        throw new Error('Can not create trade instance');
    }
}
exports.DebridgeCrossChainFactory = DebridgeCrossChainFactory;
//# sourceMappingURL=debridge-cross-chain-factory.js.map