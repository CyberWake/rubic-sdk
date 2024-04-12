"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrbiterApiService = void 0;
const tx_status_1 = require("../../../../../../core/blockchain/web3-public-service/web3-public/models/tx-status");
const injector_1 = require("../../../../../../core/injector/injector");
const orbiter_api_1 = require("../constants/orbiter-api");
const orbiter_api_common_types_1 = require("../models/orbiter-api-common-types");
const orbiter_utils_1 = require("./orbiter-utils");
class OrbiterApiService {
    static async getQuoteConfigs() {
        const { result } = await injector_1.Injector.httpClient.get(`${orbiter_api_1.ORBITER_API_ENDPOINT}/routers`, { params: { ...(this.dealerId && { dealerId: this.dealerId }) } });
        return result;
    }
    static calculateAmount(from, config) {
        const tradingFee = orbiter_utils_1.OrbiterUtils.getTradingFee(from, config);
        return from.tokenAmount.minus(tradingFee).minus(config.withholdingFee);
    }
    static async getTxStatus(txHash) {
        const { result: { targetId: hash, status: txStatus, opStatus } } = await injector_1.Injector.httpClient.get(`${orbiter_api_1.ORBITER_API_ENDPOINT}/transaction/status/${txHash}`);
        if (txStatus === orbiter_api_common_types_1.ORBITER_STATUS.ERROR) {
            return {
                hash,
                status: tx_status_1.TX_STATUS.FAIL
            };
        }
        if (txStatus === orbiter_api_common_types_1.ORBITER_STATUS.SUCCESS && opStatus === orbiter_api_common_types_1.ORBITER_OP_STATUS.SUCCESS_PAYMENT) {
            return {
                hash,
                status: tx_status_1.TX_STATUS.SUCCESS
            };
        }
        return { hash, status: tx_status_1.TX_STATUS.PENDING };
    }
}
exports.OrbiterApiService = OrbiterApiService;
OrbiterApiService.dealerId = null;
//# sourceMappingURL=orbiter-api-service.js.map