"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DlnUtils = void 0;
const blockchain_name_1 = require("../../../../core/blockchain/models/blockchain-name");
const chain_type_1 = require("../../../../core/blockchain/models/chain-type");
const blockchains_info_1 = require("../../../../core/blockchain/utils/blockchains-info/blockchains-info");
class DlnUtils {
    static getSupportedAddress(token) {
        if (token.blockchain === blockchain_name_1.BLOCKCHAIN_NAME.SOLANA && token.isNative) {
            return '11111111111111111111111111111111';
        }
        return token.address;
    }
    static getFakeReceiver(blockchain) {
        const type = blockchains_info_1.BlockchainsInfo.getChainType(blockchain);
        if (type === chain_type_1.CHAIN_TYPE.EVM) {
            return '0xe388Ed184958062a2ea29B7fD049ca21244AE02e';
        }
        if (type === chain_type_1.CHAIN_TYPE.SOLANA) {
            return 'HZgssrdZjBdypDux7tHWWDZ7hF7hhwUXN445t85GaoQT';
        }
        throw new Error('Chain type is not supported');
    }
}
exports.DlnUtils = DlnUtils;
//# sourceMappingURL=dln-utils.js.map