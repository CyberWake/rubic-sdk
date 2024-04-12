"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotonSwapProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const uniswap_v2_abstract_provider_1 = require("../../common/uniswap-v2-abstract/uniswap-v2-abstract-provider");
const constants_1 = require("./constants");
const photon_swap_trade_1 = require("./photon-swap-trade");
class PhotonSwapProvider extends uniswap_v2_abstract_provider_1.UniswapV2AbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.KAVA;
        this.UniswapV2TradeClass = photon_swap_trade_1.PhotonSwapTrade;
        this.providerSettings = constants_1.PHOTON_SWAP_PROVIDER_CONFIGURATION;
    }
}
exports.PhotonSwapProvider = PhotonSwapProvider;
//# sourceMappingURL=photon-swap-provider.js.map