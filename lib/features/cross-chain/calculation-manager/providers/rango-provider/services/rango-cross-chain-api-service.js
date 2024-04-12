"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangoCrossChainApiService = void 0;
const errors_1 = require("../../../../../../common/errors");
const decorators_1 = require("../../../../../../common/utils/decorators");
const injector_1 = require("../../../../../../core/injector/injector");
const rango_api_common_1 = require("../../../../../common/providers/rango/constants/rango-api-common");
class RangoCrossChainApiService {
    static async getBestRoute(params) {
        const res = await injector_1.Injector.httpClient.get(`${rango_api_common_1.RANGO_API_ENDPOINT}/quote`, {
            params: params
        });
        if (!res.route || res.error) {
            throw new errors_1.RubicSdkError(res.error ?? 'No available routes in rango.');
        }
        return res;
    }
    static async getSwapTransaction(params) {
        const res = await injector_1.Injector.httpClient.get(`${rango_api_common_1.RANGO_API_ENDPOINT}/swap`, { params: params });
        if (!res.route || res.error) {
            throw new errors_1.RubicSdkError(res.error ?? 'No available routes in rango.');
        }
        return res;
    }
    /**
     * @description Get transaction status data
     */
    static async getTxStatus(params) {
        const res = await injector_1.Injector.httpClient.get(`${rango_api_common_1.RANGO_API_ENDPOINT}/status`, { params: params });
        if (res.error || !res.bridgeData || !res.status) {
            throw new errors_1.RubicSdkError("Can't get status, res has error or null data in getTxStatus method");
        }
        return res;
    }
}
exports.RangoCrossChainApiService = RangoCrossChainApiService;
__decorate([
    (0, decorators_1.Cache)({
        maxAge: 15000
    })
], RangoCrossChainApiService, "getSwapTransaction", null);
//# sourceMappingURL=rango-cross-chain-api-service.js.map