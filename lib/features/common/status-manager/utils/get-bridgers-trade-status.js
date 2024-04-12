"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBridgersTradeStatus = void 0;
const tx_status_1 = require("../../../../core/blockchain/web3-public-service/web3-public/models/tx-status");
const injector_1 = require("../../../../core/injector/injector");
const to_bridgers_blockchain_1 = require("../../providers/bridgers/constants/to-bridgers-blockchain");
async function getBridgersTradeStatus(srcTxHash, fromBlockchain, sourceFlag) {
    try {
        const updateDataAndStatusRequest = {
            hash: srcTxHash,
            fromTokenChain: to_bridgers_blockchain_1.toBridgersBlockchain[fromBlockchain],
            sourceFlag
        };
        const updateDataAndStatusResponse = await injector_1.Injector.httpClient.post('https://sswap.swft.pro/api/exchangeRecord/updateDataAndStatus', updateDataAndStatusRequest);
        const orderId = updateDataAndStatusResponse.data?.orderId;
        if (!orderId) {
            return {
                status: tx_status_1.TX_STATUS.PENDING,
                hash: null
            };
        }
        const getTransDataByIdRequest = {
            orderId
        };
        const getTransDataByIdResponse = await injector_1.Injector.httpClient.post('https://sswap.swft.pro/api/exchangeRecord/getTransDataById', getTransDataByIdRequest);
        const transactionData = getTransDataByIdResponse.data;
        if (!transactionData?.status) {
            return {
                status: tx_status_1.TX_STATUS.PENDING,
                hash: null
            };
        }
        if (transactionData.status === 'receive_complete') {
            return {
                status: tx_status_1.TX_STATUS.SUCCESS,
                hash: transactionData.toHash
            };
        }
        if (transactionData.status.includes('error') || transactionData.status.includes('fail')) {
            return {
                status: tx_status_1.TX_STATUS.FAIL,
                hash: null
            };
        }
    }
    catch (err) {
        console.debug('[ERROR_getBridgersTradeStatus]', err);
    }
    return {
        status: tx_status_1.TX_STATUS.PENDING,
        hash: null
    };
}
exports.getBridgersTradeStatus = getBridgersTradeStatus;
//# sourceMappingURL=get-bridgers-trade-status.js.map