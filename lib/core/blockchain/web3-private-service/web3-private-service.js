"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web3PrivateService = void 0;
const errors_1 = require("../../../common/errors");
const chain_type_1 = require("../models/chain-type");
const blockchains_info_1 = require("../utils/blockchains-info/blockchains-info");
const web_private_supported_chain_type_1 = require("./models/web-private-supported-chain-type");
const empty_web3_private_1 = require("./web3-private/empty-web3-private");
const evm_web3_private_1 = require("./web3-private/evm-web3-private/evm-web3-private");
const solana_web3_private_1 = require("./web3-private/solana-web3-private/solana-web3-private");
const tron_web3_private_1 = require("./web3-private/tron-web3-private/tron-web3-private");
const web3_1 = __importDefault(require("web3"));
class Web3PrivateService {
    static isSupportedChainType(chainType) {
        return web_private_supported_chain_type_1.web3PrivateSupportedChainTypes.some(supportedChainType => supportedChainType === chainType);
    }
    constructor(walletProvider) {
        this.createWeb3Private = {
            [chain_type_1.CHAIN_TYPE.EVM]: this.createEvmWeb3Private.bind(this),
            [chain_type_1.CHAIN_TYPE.TRON]: this.createTronWeb3Private.bind(this),
            [chain_type_1.CHAIN_TYPE.SOLANA]: this.createSolanaWeb3Private.bind(this)
        };
        this.web3PrivateStorage = this.createWeb3PrivateStorage(walletProvider);
    }
    getWeb3Private(chainType) {
        if (!Web3PrivateService.isSupportedChainType(chainType)) {
            throw new errors_1.RubicSdkError(`Chain type ${chainType} is not supported in web3 private`);
        }
        const web3Private = this.web3PrivateStorage[chainType];
        if (!web3Private) {
            return new empty_web3_private_1.EmptyWeb3Private();
        }
        return web3Private;
    }
    getWeb3PrivateByBlockchain(blockchain) {
        return this.getWeb3Private(blockchains_info_1.BlockchainsInfo.getChainType(blockchain));
    }
    createWeb3PrivateStorage(walletProvider) {
        return web_private_supported_chain_type_1.web3PrivateSupportedChainTypes.reduce((acc, chainType) => {
            const walletProviderCore = walletProvider?.[chainType];
            if (!walletProviderCore) {
                return acc;
            }
            const createWeb3 = this.createWeb3Private[chainType];
            return {
                ...acc,
                [chainType]: createWeb3(walletProviderCore)
            };
        }, {});
    }
    createEvmWeb3Private(evmWalletProviderCore) {
        let { core } = evmWalletProviderCore;
        if (!(core instanceof web3_1.default)) {
            core = new web3_1.default(core);
        }
        const web3 = core;
        if (!web3) {
            throw new errors_1.RubicSdkError('Web3 is not initialized');
        }
        const address = web3.utils.toChecksumAddress(evmWalletProviderCore.address);
        return new evm_web3_private_1.EvmWeb3Private({
            core: web3,
            address
        });
    }
    createTronWeb3Private(tronWalletProviderCore) {
        return new tron_web3_private_1.TronWeb3Private(tronWalletProviderCore);
    }
    updateWeb3PrivateAddress(chainType, address) {
        this.web3PrivateStorage[chainType]?.setAddress(address);
    }
    createSolanaWeb3Private(solanaWallet) {
        let { core } = solanaWallet;
        return new solana_web3_private_1.SolanaWeb3Private(core);
    }
    updateWeb3PrivateStorage(walletProvider) {
        this.web3PrivateStorage = this.createWeb3PrivateStorage(walletProvider);
    }
    updateWeb3Private(chainType, walletProviderCore) {
        this.web3PrivateStorage = {
            ...this.web3PrivateStorage,
            [chainType]: this.createWeb3Private[chainType](walletProviderCore)
        };
    }
}
exports.Web3PrivateService = Web3PrivateService;
//# sourceMappingURL=web3-private-service.js.map