"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web3PublicService = void 0;
const web3_js_1 = require("@solana/web3.js");
const lodash_clonedeep_1 = __importDefault(require("lodash.clonedeep"));
const errors_1 = require("../../../common/errors");
const p_timeout_1 = __importDefault(require("../../../common/utils/p-timeout"));
const tron_web_1 = require("../constants/tron/tron-web");
const blockchain_name_1 = require("../models/blockchain-name");
const web3_public_storage_1 = require("./models/web3-public-storage");
const evm_web3_public_1 = require("./web3-public/evm-web3-public/evm-web3-public");
const solana_web3_public_1 = require("./web3-public/solana-web3-public/solana-web3-public");
const tron_web3_public_1 = require("./web3-public/tron-web3-public/tron-web3-public");
const web3_1 = __importDefault(require("web3"));
class Web3PublicService {
    static isSupportedBlockchain(blockchain) {
        return web3_public_storage_1.web3PublicSupportedBlockchains.some(supportedBlockchain => supportedBlockchain === blockchain);
    }
    constructor(rpcProvider) {
        this.rpcProvider = rpcProvider;
        this.createWeb3Public = this.setCreateWeb3Public();
        this.web3PublicStorage = this.createWeb3PublicStorage();
    }
    getWeb3Public(blockchainName) {
        if (!Web3PublicService.isSupportedBlockchain(blockchainName)) {
            throw new errors_1.RubicSdkError(`Blockchain ${blockchainName} is not supported in web3 public.`);
        }
        const web3Public = this.web3PublicStorage[blockchainName];
        if (!web3Public) {
            throw new errors_1.RubicSdkError(`Provider for ${blockchainName} was not initialized. Pass rpc link for this blockchain to sdk configuration object.`);
        }
        return web3Public;
    }
    setCreateWeb3Public() {
        return {
            ...Object.values(blockchain_name_1.EVM_BLOCKCHAIN_NAME).reduce((acc, evmBlockchainName) => ({
                ...acc,
                [evmBlockchainName]: this.createEvmWeb3PublicProxy.bind(this)
            }), {}),
            [blockchain_name_1.BLOCKCHAIN_NAME.TRON]: this.createTronWeb3PublicProxy.bind(this),
            [blockchain_name_1.BLOCKCHAIN_NAME.SOLANA]: this.createSolanaWeb3PublicProxy.bind(this)
        };
    }
    createWeb3PublicStorage() {
        return Object.keys(this.rpcProvider).reduce((acc, blockchainName) => {
            if (!Web3PublicService.isSupportedBlockchain(blockchainName)) {
                console.debug(`Blockchain ${blockchainName} is not supported in web3 public.`);
                return acc;
            }
            return {
                ...acc,
                [blockchainName]: this.createWeb3Public[blockchainName](blockchainName)
            };
        }, {});
    }
    createEvmWeb3PublicProxy(blockchainName) {
        const rpcProvider = this.rpcProvider[blockchainName];
        const evmWeb3Public = new evm_web3_public_1.EvmWeb3Public(new web3_1.default(rpcProvider.rpcList[0]), blockchainName);
        return this.createWeb3PublicProxy(blockchainName, evmWeb3Public);
    }
    createTronWeb3PublicProxy() {
        const rpcProvider = this.rpcProvider[blockchain_name_1.BLOCKCHAIN_NAME.TRON];
        const tronWeb3Public = new tron_web3_public_1.TronWeb3Public(new tron_web_1.TronWeb(rpcProvider.rpcList[0]));
        return this.createWeb3PublicProxy(blockchain_name_1.BLOCKCHAIN_NAME.TRON, tronWeb3Public);
    }
    createSolanaWeb3PublicProxy() {
        const rpcProvider = this.rpcProvider[blockchain_name_1.BLOCKCHAIN_NAME.SOLANA];
        const solanaWeb3Public = new solana_web3_public_1.SolanaWeb3Public(new web3_js_1.Connection(rpcProvider.rpcList[0], 'confirmed'));
        return this.createWeb3PublicProxy(blockchain_name_1.BLOCKCHAIN_NAME.SOLANA, solanaWeb3Public);
    }
    createWeb3PublicProxy(blockchainName, web3Public) {
        const rpcProvider = this.rpcProvider[blockchainName];
        return new Proxy(web3Public, {
            get(target, prop) {
                if (prop === 'setProvider') {
                    return target[prop].bind(target);
                }
                if (typeof target[prop] === 'function') {
                    return async function method(...params) {
                        const curRpc = rpcProvider.rpcList[0];
                        if (!curRpc) {
                            throw new errors_1.RubicSdkError(`There is no working rpc left for ${blockchainName}.`);
                        }
                        const methodParams = (0, lodash_clonedeep_1.default)(params);
                        const callMethod = () => target[prop].call(target, ...params);
                        try {
                            const result = await (0, p_timeout_1.default)(callMethod(), Web3PublicService.mainRpcDefaultTimeout);
                            if (prop === 'healthCheck' && result === false) {
                                throw new errors_1.HealthcheckError();
                            }
                            return result;
                        }
                        catch (e) {
                            const rpcString = typeof curRpc === 'string' ? curRpc : curRpc.fullHost;
                            if (e instanceof errors_1.TimeoutError ||
                                e instanceof errors_1.HealthcheckError ||
                                e.message?.toLowerCase().includes(rpcString.toLowerCase()) ||
                                e?.message?.toLowerCase()?.includes('not authorized') ||
                                e?.message
                                    ?.toLowerCase()
                                    ?.includes('daily request count exceeded') ||
                                e?.message?.toLowerCase()?.includes('invalid json rpc response') ||
                                e?.message?.toLowerCase()?.includes("we can't execute this request")) {
                                if (curRpc === rpcProvider.rpcList[0]) {
                                    rpcProvider.rpcList.shift();
                                    if (!rpcProvider.rpcList.length) {
                                        throw new errors_1.RubicSdkError(`There is no working rpc left for ${blockchainName}.`);
                                    }
                                    const nextRpc = rpcProvider.rpcList[0];
                                    web3Public.setProvider(nextRpc);
                                    console.debug(`Rpc provider for ${blockchainName} is changed to ${nextRpc}.`);
                                }
                                return method(...methodParams);
                            }
                            throw e;
                        }
                    };
                }
                return target[prop];
            }
        });
    }
}
exports.Web3PublicService = Web3PublicService;
Web3PublicService.mainRpcDefaultTimeout = 10000;
//# sourceMappingURL=web3-public-service.js.map