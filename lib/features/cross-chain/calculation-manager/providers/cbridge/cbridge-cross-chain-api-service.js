"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CbridgeCrossChainApiService = void 0;
// @ts-ignore
const cbridge_revert_manager_1 = __importDefault(require("cbridge-revert-manager"));
const injector_1 = require("../../../../../core/injector/injector");
class CbridgeCrossChainApiService {
    static async getTransferConfigs(options) {
        const apiUrl = options.useTestnet
            ? CbridgeCrossChainApiService.testnetApiEndpoint
            : CbridgeCrossChainApiService.apiEndpoint;
        return injector_1.Injector.httpClient.get(`${apiUrl}getTransferConfigs`);
    }
    static async fetchEstimateAmount(requestParams, options) {
        const apiUrl = options.useTestnet
            ? CbridgeCrossChainApiService.testnetApiEndpoint
            : CbridgeCrossChainApiService.apiEndpoint;
        return injector_1.Injector.httpClient.get(`${apiUrl}estimateAmt`, {
            params: { ...requestParams }
        });
    }
    static async fetchTradeStatus(transferId, options) {
        const apiUrl = options.useTestnet
            ? CbridgeCrossChainApiService.testnetApiEndpoint
            : CbridgeCrossChainApiService.apiEndpoint;
        return injector_1.Injector.httpClient.post(`${apiUrl}getTransferStatus`, {
            transfer_id: transferId
        });
    }
    static async withdrawLiquidity(transferId, estimatedReceivedAmt, options) {
        const apiUrl = options.useTestnet
            ? CbridgeCrossChainApiService.testnetApiEndpoint
            : CbridgeCrossChainApiService.apiEndpoint;
        const body = await (0, cbridge_revert_manager_1.default)(transferId, estimatedReceivedAmt);
        return injector_1.Injector.httpClient.post(`${apiUrl}withdrawLiquidity`, body);
    }
}
exports.CbridgeCrossChainApiService = CbridgeCrossChainApiService;
CbridgeCrossChainApiService.apiEndpoint = 'https://cbridge-prod2.celer.app/v2/';
CbridgeCrossChainApiService.testnetApiEndpoint = 'https://cbridge-v2-test.celer.network/v2/';
//# sourceMappingURL=cbridge-cross-chain-api-service.js.map