"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoingeckoApi = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const errors_1 = require("../../common/errors");
const decorators_1 = require("../../common/utils/decorators");
const p_timeout_1 = __importDefault(require("../../common/utils/p-timeout"));
const blockchain_name_1 = require("../blockchain/models/blockchain-name");
const blockchains_info_1 = require("../blockchain/utils/blockchains-info/blockchains-info");
const web3_pure_1 = require("../blockchain/web3-pure/web3-pure");
const supportedBlockchains = [
    blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM,
    blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN,
    blockchain_name_1.BLOCKCHAIN_NAME.POLYGON,
    blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE,
    blockchain_name_1.BLOCKCHAIN_NAME.MOONRIVER,
    blockchain_name_1.BLOCKCHAIN_NAME.FANTOM,
    blockchain_name_1.BLOCKCHAIN_NAME.HARMONY,
    blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM,
    blockchain_name_1.BLOCKCHAIN_NAME.AURORA,
    blockchain_name_1.BLOCKCHAIN_NAME.TELOS,
    blockchain_name_1.BLOCKCHAIN_NAME.BOBA,
    blockchain_name_1.BLOCKCHAIN_NAME.BITCOIN,
    blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM_POW,
    blockchain_name_1.BLOCKCHAIN_NAME.KAVA,
    blockchain_name_1.BLOCKCHAIN_NAME.OASIS,
    blockchain_name_1.BLOCKCHAIN_NAME.METIS,
    blockchain_name_1.BLOCKCHAIN_NAME.DFK,
    blockchain_name_1.BLOCKCHAIN_NAME.KLAYTN,
    blockchain_name_1.BLOCKCHAIN_NAME.VELAS,
    blockchain_name_1.BLOCKCHAIN_NAME.SYSCOIN,
    blockchain_name_1.BLOCKCHAIN_NAME.ICP,
    blockchain_name_1.BLOCKCHAIN_NAME.OPTIMISM,
    blockchain_name_1.BLOCKCHAIN_NAME.CRONOS,
    blockchain_name_1.BLOCKCHAIN_NAME.OKE_X_CHAIN,
    blockchain_name_1.BLOCKCHAIN_NAME.GNOSIS,
    blockchain_name_1.BLOCKCHAIN_NAME.FUSE,
    blockchain_name_1.BLOCKCHAIN_NAME.MOONBEAM,
    blockchain_name_1.BLOCKCHAIN_NAME.CELO,
    blockchain_name_1.BLOCKCHAIN_NAME.BOBA_BSC,
    blockchain_name_1.BLOCKCHAIN_NAME.BITGERT,
    blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM_CLASSIC,
    blockchain_name_1.BLOCKCHAIN_NAME.EOS,
    blockchain_name_1.BLOCKCHAIN_NAME.FLARE,
    blockchain_name_1.BLOCKCHAIN_NAME.IOTEX,
    blockchain_name_1.BLOCKCHAIN_NAME.ONTOLOGY,
    blockchain_name_1.BLOCKCHAIN_NAME.THETA,
    blockchain_name_1.BLOCKCHAIN_NAME.XDC,
    blockchain_name_1.BLOCKCHAIN_NAME.BITCOIN_CASH,
    blockchain_name_1.BLOCKCHAIN_NAME.ZK_SYNC,
    blockchain_name_1.BLOCKCHAIN_NAME.PULSECHAIN,
    blockchain_name_1.BLOCKCHAIN_NAME.LINEA,
    blockchain_name_1.BLOCKCHAIN_NAME.MANTLE,
    blockchain_name_1.BLOCKCHAIN_NAME.BASE,
    blockchain_name_1.BLOCKCHAIN_NAME.BLAST
];
const API_BASE_URL = 'https://api.coingecko.com/api/v3/';
/**
 * Works with coingecko api to get tokens prices in usd.
 */
class CoingeckoApi {
    static isSupportedBlockchain(blockchain) {
        return supportedBlockchains.some(supportedBlockchain => supportedBlockchain === blockchain);
    }
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.nativeCoinsCoingeckoIds = {
            [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]: 'ethereum',
            [blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: 'binancecoin',
            [blockchain_name_1.BLOCKCHAIN_NAME.POLYGON]: 'matic-network',
            [blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE]: 'avalanche-2',
            [blockchain_name_1.BLOCKCHAIN_NAME.MOONRIVER]: 'moonriver',
            [blockchain_name_1.BLOCKCHAIN_NAME.FANTOM]: 'fantom',
            [blockchain_name_1.BLOCKCHAIN_NAME.HARMONY]: 'harmony',
            [blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM]: 'ethereum',
            [blockchain_name_1.BLOCKCHAIN_NAME.AURORA]: 'ethereum',
            [blockchain_name_1.BLOCKCHAIN_NAME.TELOS]: 'tlos',
            [blockchain_name_1.BLOCKCHAIN_NAME.BOBA]: 'ethereum',
            [blockchain_name_1.BLOCKCHAIN_NAME.BITCOIN]: 'bitcoin',
            [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM_POW]: 'ethereum-pow-iou',
            [blockchain_name_1.BLOCKCHAIN_NAME.KAVA]: 'kava',
            [blockchain_name_1.BLOCKCHAIN_NAME.OASIS]: 'rose',
            [blockchain_name_1.BLOCKCHAIN_NAME.METIS]: 'metis-token',
            [blockchain_name_1.BLOCKCHAIN_NAME.DFK]: 'defi-kingdoms',
            [blockchain_name_1.BLOCKCHAIN_NAME.KLAYTN]: 'klaytn',
            [blockchain_name_1.BLOCKCHAIN_NAME.VELAS]: 'velas',
            [blockchain_name_1.BLOCKCHAIN_NAME.SYSCOIN]: 'syscoin',
            [blockchain_name_1.BLOCKCHAIN_NAME.ICP]: 'internet-computer',
            [blockchain_name_1.BLOCKCHAIN_NAME.OPTIMISM]: 'ethereum',
            [blockchain_name_1.BLOCKCHAIN_NAME.CRONOS]: 'cronos',
            [blockchain_name_1.BLOCKCHAIN_NAME.OKE_X_CHAIN]: 'okex-chain',
            [blockchain_name_1.BLOCKCHAIN_NAME.GNOSIS]: 'xdai',
            [blockchain_name_1.BLOCKCHAIN_NAME.FUSE]: 'fuse',
            [blockchain_name_1.BLOCKCHAIN_NAME.MOONBEAM]: 'moonbeam',
            [blockchain_name_1.BLOCKCHAIN_NAME.CELO]: 'celo',
            [blockchain_name_1.BLOCKCHAIN_NAME.BOBA_BSC]: 'boba',
            [blockchain_name_1.BLOCKCHAIN_NAME.BITGERT]: 'bitgert',
            [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM_CLASSIC]: 'ethereum-classic',
            [blockchain_name_1.BLOCKCHAIN_NAME.EOS]: 'eos',
            [blockchain_name_1.BLOCKCHAIN_NAME.FLARE]: 'flare-network',
            [blockchain_name_1.BLOCKCHAIN_NAME.IOTEX]: 'iotex',
            [blockchain_name_1.BLOCKCHAIN_NAME.ONTOLOGY]: 'ontology',
            [blockchain_name_1.BLOCKCHAIN_NAME.THETA]: 'theta',
            [blockchain_name_1.BLOCKCHAIN_NAME.XDC]: 'xdc-network',
            [blockchain_name_1.BLOCKCHAIN_NAME.BITCOIN_CASH]: 'bitcoin-cash',
            [blockchain_name_1.BLOCKCHAIN_NAME.ZK_SYNC]: 'ethereum',
            [blockchain_name_1.BLOCKCHAIN_NAME.PULSECHAIN]: 'pulsechain',
            [blockchain_name_1.BLOCKCHAIN_NAME.LINEA]: 'ethereum',
            [blockchain_name_1.BLOCKCHAIN_NAME.MANTLE]: 'mantle',
            [blockchain_name_1.BLOCKCHAIN_NAME.BASE]: 'ethereum',
            [blockchain_name_1.BLOCKCHAIN_NAME.BLAST]: 'blast'
        };
        this.tokenBlockchainId = {
            [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM]: 'ethereum',
            [blockchain_name_1.BLOCKCHAIN_NAME.BINANCE_SMART_CHAIN]: 'binance-smart-chain',
            [blockchain_name_1.BLOCKCHAIN_NAME.POLYGON]: 'polygon-pos',
            [blockchain_name_1.BLOCKCHAIN_NAME.AVALANCHE]: 'avalanche',
            [blockchain_name_1.BLOCKCHAIN_NAME.MOONRIVER]: 'moonriver',
            [blockchain_name_1.BLOCKCHAIN_NAME.FANTOM]: 'fantom',
            [blockchain_name_1.BLOCKCHAIN_NAME.HARMONY]: 'harmony-shard-0',
            [blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM]: 'arbitrum-one',
            [blockchain_name_1.BLOCKCHAIN_NAME.AURORA]: 'aurora',
            [blockchain_name_1.BLOCKCHAIN_NAME.TELOS]: 'telos',
            [blockchain_name_1.BLOCKCHAIN_NAME.BOBA]: 'boba-network',
            [blockchain_name_1.BLOCKCHAIN_NAME.BITCOIN]: 'bitcoin',
            [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM_POW]: 'ethereum-pow-iou',
            [blockchain_name_1.BLOCKCHAIN_NAME.KAVA]: 'kava',
            [blockchain_name_1.BLOCKCHAIN_NAME.OASIS]: 'oasis',
            [blockchain_name_1.BLOCKCHAIN_NAME.METIS]: 'metis-andromeda',
            [blockchain_name_1.BLOCKCHAIN_NAME.DFK]: 'defi-kingdoms',
            [blockchain_name_1.BLOCKCHAIN_NAME.KLAYTN]: 'klaytn',
            [blockchain_name_1.BLOCKCHAIN_NAME.VELAS]: 'velas',
            [blockchain_name_1.BLOCKCHAIN_NAME.SYSCOIN]: 'syscoin',
            [blockchain_name_1.BLOCKCHAIN_NAME.ICP]: 'internet-computer',
            [blockchain_name_1.BLOCKCHAIN_NAME.OPTIMISM]: 'optimism',
            [blockchain_name_1.BLOCKCHAIN_NAME.CRONOS]: 'cronos',
            [blockchain_name_1.BLOCKCHAIN_NAME.OKE_X_CHAIN]: 'okex-chain',
            [blockchain_name_1.BLOCKCHAIN_NAME.GNOSIS]: 'xdai',
            [blockchain_name_1.BLOCKCHAIN_NAME.FUSE]: 'fuse',
            [blockchain_name_1.BLOCKCHAIN_NAME.MOONBEAM]: 'moonbeam',
            [blockchain_name_1.BLOCKCHAIN_NAME.CELO]: 'celo',
            [blockchain_name_1.BLOCKCHAIN_NAME.BOBA_BSC]: 'boba',
            [blockchain_name_1.BLOCKCHAIN_NAME.BITGERT]: 'bitgert',
            [blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM_CLASSIC]: 'ethereum-classic',
            [blockchain_name_1.BLOCKCHAIN_NAME.EOS]: 'eos',
            [blockchain_name_1.BLOCKCHAIN_NAME.FLARE]: 'flare-network',
            [blockchain_name_1.BLOCKCHAIN_NAME.IOTEX]: 'iotex',
            [blockchain_name_1.BLOCKCHAIN_NAME.ONTOLOGY]: 'ontology',
            [blockchain_name_1.BLOCKCHAIN_NAME.THETA]: 'theta',
            [blockchain_name_1.BLOCKCHAIN_NAME.XDC]: 'xdc-network',
            [blockchain_name_1.BLOCKCHAIN_NAME.BITCOIN_CASH]: 'bitcoin-cash',
            [blockchain_name_1.BLOCKCHAIN_NAME.ZK_SYNC]: 'zksync',
            [blockchain_name_1.BLOCKCHAIN_NAME.PULSECHAIN]: 'pulsechain',
            [blockchain_name_1.BLOCKCHAIN_NAME.LINEA]: 'linea',
            [blockchain_name_1.BLOCKCHAIN_NAME.MANTLE]: 'mantle',
            [blockchain_name_1.BLOCKCHAIN_NAME.BASE]: 'base',
            [blockchain_name_1.BLOCKCHAIN_NAME.BLAST]: 'blast-2'
        };
    }
    /**
     * Gets price of native coin in usd from coingecko.
     * @param blockchain Supported by {@link supportedBlockchains} blockchain.
     */
    async getNativeCoinPrice(blockchain) {
        if (!CoingeckoApi.isSupportedBlockchain(blockchain)) {
            throw new errors_1.RubicSdkError(`Blockchain ${blockchain} is not supported by coingecko-api`);
        }
        const coingeckoId = this.nativeCoinsCoingeckoIds[blockchain];
        try {
            const response = await (0, p_timeout_1.default)(this.httpClient.get(`${API_BASE_URL}simple/price`, {
                params: { ids: coingeckoId, vs_currencies: 'usd' }
            }), 3000);
            const price = response?.[coingeckoId]?.usd;
            if (!price) {
                throw new errors_1.RubicSdkError('Coingecko price is not defined');
            }
            return new bignumber_js_1.default(price);
        }
        catch (err) {
            if (err instanceof errors_1.TimeoutError) {
                console.debug('[RUBIC SDK]: Timeout Error. Coingecko cannot retrieve token price');
            }
            else if (err?.message?.includes('Request failed with status code 429')) {
                console.debug('[RUBIC SDK]: Too many requests. Coingecko cannot retrieve token price');
            }
            else {
                console.debug(err);
            }
            return new bignumber_js_1.default(NaN);
        }
    }
    /**
     * Gets price of token in usd from coingecko.
     * @param token Token to get price for.
     */
    async getErc20TokenPrice(token) {
        const { blockchain } = token;
        if (!CoingeckoApi.isSupportedBlockchain(blockchain)) {
            throw new errors_1.RubicSdkError(`Blockchain ${blockchain} is not supported by coingecko-api`);
        }
        const blockchainId = this.tokenBlockchainId[blockchain];
        try {
            const response = await (0, p_timeout_1.default)(this.httpClient.get(`${API_BASE_URL}coins/${blockchainId}/contract/${token.address.toLowerCase()}`), 3000);
            return new bignumber_js_1.default(response?.market_data?.current_price?.usd || NaN);
        }
        catch (err) {
            if (err instanceof errors_1.TimeoutError) {
                console.debug('[RUBIC SDK]: Timeout Error. Coingecko cannot retrieve token price');
            }
            else if (err?.message?.includes('Request failed with status code 429')) {
                console.debug('[RUBIC SDK]: Too many requests. Coingecko cannot retrieve token price');
            }
            else {
                console.debug(err);
            }
            return new bignumber_js_1.default(NaN);
        }
    }
    /**
     * Gets price of common token or native coin in usd from coingecko.
     * @param token Token to get price for.
     */
    async getTokenPrice(token) {
        if (!CoingeckoApi.isSupportedBlockchain(token.blockchain)) {
            throw new errors_1.RubicSdkError(`Blockchain ${token.blockchain} is not supported by coingecko-api`);
        }
        const chainType = blockchains_info_1.BlockchainsInfo.getChainType(token.blockchain);
        if (web3_pure_1.Web3Pure[chainType].isNativeAddress(token.address)) {
            return this.getNativeCoinPrice(token.blockchain);
        }
        return this.getErc20TokenPrice(token);
    }
}
exports.CoingeckoApi = CoingeckoApi;
__decorate([
    (0, decorators_1.Cache)({
        maxAge: 15000
    })
], CoingeckoApi.prototype, "getNativeCoinPrice", null);
__decorate([
    (0, decorators_1.Cache)({
        maxAge: 15000
    })
], CoingeckoApi.prototype, "getErc20TokenPrice", null);
//# sourceMappingURL=coingecko-api.js.map