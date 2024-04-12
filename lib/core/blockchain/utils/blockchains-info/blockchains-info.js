"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainsInfo = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../../../common/errors");
const blockchain_name_1 = require("../../models/blockchain-name");
const blockchain_id_1 = require("./constants/blockchain-id");
const chain_type_by_blockchain_1 = require("./constants/chain-type-by-blockchain");
/**
 * Works with list of all used in project blockchains.
 * Contains method to find info about certain blockchain.
 */
class BlockchainsInfo {
    /**
     * Finds blockchain name, based on provided chain id.
     */
    static getBlockchainNameById(chainId) {
        const chainIdNumber = new bignumber_js_1.default(chainId).toNumber();
        return Object.entries(blockchain_id_1.blockchainId).find(([_, id]) => id === chainIdNumber)?.[0];
    }
    static getChainType(blockchainName) {
        const chainType = chain_type_by_blockchain_1.chainTypeByBlockchain[blockchainName];
        if (!chainType) {
            throw new errors_1.RubicSdkError(`No supported chain type for ${blockchainName}`);
        }
        return chainType;
    }
    static isBlockchainName(chain) {
        return Object.values(blockchain_name_1.BLOCKCHAIN_NAME).some(blockchainName => blockchainName === chain);
    }
    static isEvmBlockchainName(blockchainName) {
        return Object.values(blockchain_name_1.EVM_BLOCKCHAIN_NAME).some(evmBlockchainName => evmBlockchainName === blockchainName);
    }
    static isTestBlockchainName(blockchainName) {
        return Object.values(blockchain_name_1.TEST_EVM_BLOCKCHAIN_NAME).some(testBlockchainName => testBlockchainName === blockchainName);
    }
    static isBitcoinBlockchainName(blockchainName) {
        return blockchainName === blockchain_name_1.BLOCKCHAIN_NAME.BITCOIN;
    }
    static isTronBlockchainName(blockchainName) {
        return blockchainName === blockchain_name_1.BLOCKCHAIN_NAME.TRON;
    }
    static isSolanaBlockchainName(blockchainName) {
        return blockchainName === blockchain_name_1.BLOCKCHAIN_NAME.SOLANA;
    }
}
exports.BlockchainsInfo = BlockchainsInfo;
//# sourceMappingURL=blockchains-info.js.map