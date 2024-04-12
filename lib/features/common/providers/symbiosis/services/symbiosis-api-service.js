"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymbiosisApiService = void 0;
const errors_1 = require("../../../../../common/errors");
const decorators_1 = require("../../../../../common/utils/decorators");
const blockchain_name_1 = require("../../../../../core/blockchain/models/blockchain-name");
const blockchain_id_1 = require("../../../../../core/blockchain/utils/blockchains-info/constants/blockchain-id");
const injector_1 = require("../../../../../core/injector/injector");
const symbiosis_api_common_1 = require("../constants/symbiosis-api-common");
class SymbiosisApiService {
    /**
     * New method for all kind of swaps
     */
    static async getOnChainSwapTx(body) {
        const res = await injector_1.Injector.httpClient.post(`${symbiosis_api_common_1.SYMBIOSIS_API_ENDPOINT}/v1/swap`, body);
        if ('code' in res && 'message' in res) {
            throw new errors_1.RubicSdkError(res.message);
        }
        return res;
    }
    /**
     * @description Old method only for cross-chain swaps
     * @param params Swap request body
     */
    static async getCrossChainSwapTx(params) {
        const url = params.tokenOut.chainId === blockchain_id_1.blockchainId[blockchain_name_1.BLOCKCHAIN_NAME.BITCOIN]
            ? `${symbiosis_api_common_1.SYMBIOSIS_API_ENDPOINT}/v1/swap`
            : `${symbiosis_api_common_1.SYMBIOSIS_API_ENDPOINT}/v1/swapping/exact_in?partnerId=rubic`;
        const res = await injector_1.Injector.httpClient.post(url, params);
        if ('code' in res && 'message' in res) {
            throw new errors_1.RubicSdkError(res.message);
        }
        return res;
    }
}
exports.SymbiosisApiService = SymbiosisApiService;
__decorate([
    (0, decorators_1.Cache)({
        maxAge: 15000
    })
], SymbiosisApiService, "getOnChainSwapTx", null);
__decorate([
    (0, decorators_1.Cache)({
        maxAge: 15000
    })
], SymbiosisApiService, "getCrossChainSwapTx", null);
//# sourceMappingURL=symbiosis-api-service.js.map