"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DlnApiService = void 0;
const injector_1 = require("../../../../core/injector/injector");
class DlnApiService {
    static fetchCrossChainQuote(requestParams) {
        return injector_1.Injector.httpClient.get(`${DlnApiService.apiEndpoint}/dln/order/quote`, {
            params: requestParams
        });
    }
    static fetchCrossChainSwapData(requestParams) {
        return injector_1.Injector.httpClient.get(`${DlnApiService.apiEndpoint}/dln/order/create-tx`, {
            params: requestParams
        });
    }
    static fetchOnChainQuote(requestParams) {
        return injector_1.Injector.httpClient.get(`${DlnApiService.apiEndpoint}/chain/estimation`, {
            params: requestParams
        });
    }
    static fetchOnChainSwapData(requestParams) {
        return injector_1.Injector.httpClient.get(`${DlnApiService.apiEndpoint}/chain/transaction`, {
            params: requestParams
        });
    }
    static fetchCrossChainEventMetaData(orderId) {
        return injector_1.Injector.httpClient.get(`https://stats-api.dln.trade/api/Orders/${orderId}`);
    }
    static fetchCrossChainStatus(orderId) {
        return injector_1.Injector.httpClient.get(`${DlnApiService.apiEndpoint}/dln/order/${orderId}/status`);
    }
    static fetchCrossChainOrdersByHash(sourceTransactionHash) {
        return injector_1.Injector.httpClient.get(`${DlnApiService.apiEndpoint}/dln/tx/${sourceTransactionHash}/order-ids`);
    }
}
exports.DlnApiService = DlnApiService;
DlnApiService.apiEndpoint = 'https://api.dln.trade/v1.0';
//# sourceMappingURL=dln-api-service.js.map