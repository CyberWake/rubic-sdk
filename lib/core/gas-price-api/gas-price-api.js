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
exports.GasPriceApi = void 0;
const decorators_1 = require("../../common/utils/decorators");
const p_timeout_1 = __importDefault(require("../../common/utils/p-timeout"));
const blockchain_name_1 = require("../blockchain/models/blockchain-name");
const injector_1 = require("../injector/injector");
const eip1559_compatible_blockchains_1 = require("./constants/eip1559-compatible-blockchains");
/**
 * Uses different api or web3 to retrieve current gas price.
 */
class GasPriceApi {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    /**
     * Gets gas price in Wei for selected blockchain.
     * @param blockchain Blockchain to get gas price from.
     */
    getGasPrice(blockchain) {
        if (blockchain === blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM) {
            return this.fetchEthGas();
        }
        return this.fetchGas(blockchain);
    }
    /**
     * Gets gas price in Eth units for selected blockchain.
     * @param blockchain Blockchain to get gas price from.
     */
    async getGasPriceInEthUnits(blockchain) {
        return await this.getGasPrice(blockchain);
    }
    /**
     * Gets Ethereum gas price from different APIs, sorted by priority.
     * @returns Average gas price in Wei.
     */
    async fetchEthGas() {
        const requestTimeout = 3000;
        try {
            const response = await (0, p_timeout_1.default)(this.httpClient.get('https://gas-price-api.1inch.io/v1.2/1'), requestTimeout);
            return {
                baseFee: response.baseFee,
                maxFeePerGas: response.high.maxFeePerGas,
                maxPriorityFeePerGas: response.high.maxPriorityFee
            };
        }
        catch (_err) { }
        const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM);
        return web3Public.getPriorityFeeGas();
    }
    /**
     * Gets gas price from web3.
     * @returns Average gas price in Wei.
     */
    async fetchGas(blockchain) {
        const web3Public = injector_1.Injector.web3PublicService.getWeb3Public(blockchain);
        if (eip1559_compatible_blockchains_1.EIP1559CompatibleBlockchains[blockchain]) {
            return await web3Public.getPriorityFeeGas();
        }
        return {
            gasPrice: await web3Public.getGasPrice()
        };
    }
}
exports.GasPriceApi = GasPriceApi;
/**
 * Gas price request interval in seconds.
 */
GasPriceApi.requestInterval = 15000;
__decorate([
    (0, decorators_1.Cache)({
        maxAge: GasPriceApi.requestInterval
    })
], GasPriceApi.prototype, "fetchEthGas", null);
__decorate([
    (0, decorators_1.Cache)({
        maxAge: GasPriceApi.requestInterval
    })
], GasPriceApi.prototype, "fetchGas", null);
//# sourceMappingURL=gas-price-api.js.map