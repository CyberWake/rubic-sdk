"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeNowCrossChainApiService = void 0;
const decorators_1 = require("../../../../../../common/utils/decorators");
const injector_1 = require("../../../../../../core/injector/injector");
const changenow_api_key_1 = require("../../../../../common/providers/changenow/constants/changenow-api-key");
class ChangeNowCrossChainApiService {
    static getSwapTx(body) {
        return injector_1.Injector.httpClient.post(`${ChangeNowCrossChainApiService.changenowApiEndpoint}/exchange`, body, {
            headers: { 'x-changenow-api-key': changenow_api_key_1.changenowApiKey }
        });
    }
    static getQuoteTx(params) {
        return injector_1.Injector.httpClient.get(`${ChangeNowCrossChainApiService.changenowApiEndpoint}/exchange/estimated-amount?flow=standard`, {
            params: params,
            headers: { 'x-changenow-api-key': changenow_api_key_1.changenowApiKey }
        });
    }
    static getMinMaxRange(params) {
        return injector_1.Injector.httpClient.get(`${ChangeNowCrossChainApiService.changenowApiEndpoint}/exchange/range?flow=standard`, {
            params: params,
            headers: { 'x-changenow-api-key': changenow_api_key_1.changenowApiKey }
        });
    }
    static getCurrencies() {
        return injector_1.Injector.httpClient.get(`${ChangeNowCrossChainApiService.changenowApiEndpoint}/exchange/currencies`, {
            params: { active: true, flow: 'standard' },
            headers: { 'x-changenow-api-key': changenow_api_key_1.changenowApiKey }
        });
    }
    static getTxStatus(changenowId) {
        return injector_1.Injector.httpClient.get(`${ChangeNowCrossChainApiService.changenowApiEndpoint}/exchange/by-id`, {
            params: { id: changenowId },
            headers: { 'x-changenow-api-key': changenow_api_key_1.changenowApiKey }
        });
    }
}
exports.ChangeNowCrossChainApiService = ChangeNowCrossChainApiService;
ChangeNowCrossChainApiService.changenowApiEndpoint = 'https://api.changenow.io/v2';
__decorate([
    (0, decorators_1.Cache)({
        maxAge: 15000
    })
], ChangeNowCrossChainApiService, "getSwapTx", null);
//# sourceMappingURL=changenow-cross-chain-api-service.js.map