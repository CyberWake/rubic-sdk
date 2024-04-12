"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oneInchHttpGetApproveRequest = exports.oneInchHttpGetRequest = void 0;
const blockchain_id_1 = require("../../../../../../../core/blockchain/utils/blockchains-info/constants/blockchain-id");
const injector_1 = require("../../../../../../../core/injector/injector");
function oneInchHttpGetRequest(path, blockchain, options) {
    return injector_1.Injector.httpClient.get(`https://x-api.rubic.exchange/api/swap/v5.2/${blockchain_id_1.blockchainId[blockchain]}/${path}`, {
        ...options,
        headers: { apikey: 'sndfje3u4b3fnNSDNFUSDNVSunw345842hrnfd3b4nt4' }
    });
}
exports.oneInchHttpGetRequest = oneInchHttpGetRequest;
function oneInchHttpGetApproveRequest(path, blockchain, options) {
    return injector_1.Injector.httpClient.get(`https://x-api.rubic.exchange/api/${path}/${blockchain_id_1.blockchainId[blockchain]}`, {
        ...options,
        headers: { apikey: 'sndfje3u4b3fnNSDNFUSDNVSunw345842hrnfd3b4nt4' }
    });
}
exports.oneInchHttpGetApproveRequest = oneInchHttpGetApproveRequest;
//# sourceMappingURL=utils.js.map