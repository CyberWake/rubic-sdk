"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LimitOrderApiService = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const ethers_1 = require("ethers");
const tokens_1 = require("../../common/tokens");
const object_1 = require("../../common/utils/object");
const blockchain_id_1 = require("../../core/blockchain/utils/blockchains-info/constants/blockchain-id");
const web3_pure_1 = require("../../core/blockchain/web3-pure/web3-pure");
const injector_1 = require("../../core/injector/injector");
const limit_order_contract_abi_1 = require("./constants/limit-order-contract-abi");
const series_nonce_manager_abi_1 = require("./constants/series-nonce-manager-abi");
const limit_order_status_1 = require("./models/limit-order-status");
const supported_blockchains_1 = require("./models/supported-blockchains");
const baseApi = (chainId) => `https://limit-orders.1inch.io/v3.0/${chainId}/limit-order`;
class LimitOrderApiService {
    getApiOrders(chainId, userAddress, statuses = [1, 2]) {
        return injector_1.Injector.httpClient.get(`${baseApi(chainId)}/address/${userAddress}`, {
            params: {
                statuses: JSON.stringify(statuses),
                sortBy: 'createDateTime'
            }
        });
    }
    async getUserOrders(userAddress) {
        const orders = (await Promise.all(supported_blockchains_1.limitOrderSupportedBlockchains.map(async (blockchain) => {
            const chainId = blockchain_id_1.blockchainId[blockchain];
            const ordersById = (await Promise.all([
                this.getApiOrders(chainId, userAddress, [1, 2]),
                this.getApiOrders(chainId, userAddress, [3])
            ])).flat();
            try {
                return (await Promise.all(ordersById.map(orderById => this.parseLimitOrder(blockchain, orderById)))).filter(object_1.notNull);
            }
            catch {
                return [];
            }
        }))).flat();
        this.sortOrders(orders);
        return orders;
    }
    async parseLimitOrder(blockchain, { orderHash, createDateTime, data: { makerAsset, takerAsset, makingAmount, takingAmount, interactions }, orderInvalidReason, remainingMakerAmount, makerBalance }) {
        if (orderInvalidReason !== null && remainingMakerAmount === makingAmount) {
            return null;
        }
        const [fromToken, toToken] = await Promise.all([
            tokens_1.Token.createToken({ address: makerAsset, blockchain }),
            tokens_1.Token.createToken({ address: takerAsset, blockchain })
        ]);
        let expiration = null;
        try {
            const limitOrderContract = new ethers_1.ethers.utils.Interface(limit_order_contract_abi_1.limitOrderContractAbi);
            const arbitraryStaticCallData = limitOrderContract.decodeFunctionData('arbitraryStaticCall', interactions);
            const seriesNonceManagerData = arbitraryStaticCallData.data;
            const seriesNonceManagerContract = new ethers_1.ethers.utils.Interface(series_nonce_manager_abi_1.seriesNonceManagerAbi);
            const { timeNonceSeriesAccount } = seriesNonceManagerContract.decodeFunctionData('timestampBelowAndNonceEquals', seriesNonceManagerData);
            expiration = new Date(Number(BigInt(timeNonceSeriesAccount) >> 216n) * 1000);
        }
        catch { }
        let status;
        if (orderInvalidReason === null) {
            status = limit_order_status_1.LIMIT_ORDER_STATUS.VALID;
        }
        else if (orderInvalidReason === 'order filled') {
            status = limit_order_status_1.LIMIT_ORDER_STATUS.FILLED;
        }
        else {
            status = limit_order_status_1.LIMIT_ORDER_STATUS.EXPIRED;
        }
        return {
            hash: orderHash,
            creation: new Date(createDateTime),
            fromToken,
            toToken,
            fromAmount: web3_pure_1.Web3Pure.fromWei(makingAmount, fromToken?.decimals),
            toAmount: web3_pure_1.Web3Pure.fromWei(takingAmount, toToken?.decimals),
            fromBalance: web3_pure_1.Web3Pure.fromWei(makerBalance, fromToken?.decimals),
            expiration,
            status,
            filledPercent: new bignumber_js_1.default(makingAmount)
                .minus(remainingMakerAmount)
                .div(makingAmount)
                .multipliedBy(100)
                .dp(2)
                .toNumber()
        };
    }
    sortOrders(orders) {
        orders.sort((orderA, orderB) => {
            if ((orderA.status === limit_order_status_1.LIMIT_ORDER_STATUS.VALID &&
                orderB.status === limit_order_status_1.LIMIT_ORDER_STATUS.VALID) ||
                (orderA.status !== limit_order_status_1.LIMIT_ORDER_STATUS.VALID &&
                    orderB.status !== limit_order_status_1.LIMIT_ORDER_STATUS.VALID)) {
                return orderB.creation.getTime() - orderA.creation.getTime();
            }
            if (orderA.status === limit_order_status_1.LIMIT_ORDER_STATUS.VALID) {
                return -1;
            }
            return 1;
        });
    }
    async getOrderByHash(userAddress, blockchain, hash) {
        const chainId = blockchain_id_1.blockchainId[blockchain];
        try {
            const orders = await this.getApiOrders(chainId, userAddress);
            return (orders.find(({ orderHash }) => orderHash.toLowerCase() === hash.toLowerCase()) ||
                null);
        }
        catch {
            return null;
        }
    }
    async createLimitOrder(chainId, body) {
        await injector_1.Injector.httpClient.post(`https://limit-orders.1inch.io/v3.0/${chainId}/limit-order`, body);
    }
}
exports.LimitOrderApiService = LimitOrderApiService;
//# sourceMappingURL=limit-order-api-service.js.map