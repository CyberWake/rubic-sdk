"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OdosOnChainApiService = void 0;
const errors_1 = require("../../../../../../../common/errors");
const injector_1 = require("../../../../../../../core/injector/injector");
const odos_api_consts_1 = require("../constants/odos-api-consts");
class OdosOnChainApiService {
    static async getBestRoute(body) {
        const res = await injector_1.Injector.httpClient.post(`${odos_api_consts_1.ODOS_API_BASE_URL}/sor/quote/v2`, body);
        return res;
    }
    static async getSwapTx(body) {
        const res = await injector_1.Injector.httpClient.post(`${odos_api_consts_1.ODOS_API_BASE_URL}/sor/assemble`, body);
        if (!res.transaction) {
            throw new errors_1.RubicSdkError(`Transaction status is undefined!`);
        }
        return res;
    }
}
exports.OdosOnChainApiService = OdosOnChainApiService;
//# sourceMappingURL=odos-on-chain-api-service.js.map