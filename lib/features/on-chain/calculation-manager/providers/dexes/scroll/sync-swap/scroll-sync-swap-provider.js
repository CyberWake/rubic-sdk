"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollSyncSwapProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const sync_swap_abstract_provider_1 = require("../../common/sync-swap-abstract/sync-swap-abstract-provider");
class ScrollSyncSwapProvider extends sync_swap_abstract_provider_1.SyncSwapAbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.SCROLL;
        this.dexContractAddress = '0x80e38291e06339d10AAB483C65695D004dBD5C69';
        this.routerHelperContract = '0x39D2E9dBD697e135E3D111F7176dBc123D6807ca';
        this.vault = '0x7160570BB153Edd0Ea1775EC2b2Ac9b65F1aB61B';
        this.factories = [
            '0x37BAc764494c8db4e54BDE72f6965beA9fa0AC2d',
            '0xE4CF807E351b56720B17A59094179e7Ed9dD3727'
        ];
        this.routeTokens = [
            '0x5300000000000000000000000000000000000004',
            '0x06efdbff2a14a7c8e15944d1f4a48f9f95f663a4',
            '0xf55bec9cafdbe8730f096aa55dad6d22d44099df',
            '0xca77eb3fefe3725dc33bccb54edefc3d9f764f97',
            '0x3c1bca5a656e69edcd0d4e36bebb3fcdaca60cf1' // WBTC
        ];
        this.masterAddress = '0x608Cb7C3168427091F5994A45Baf12083964B4A3';
        this.maxTransitTokens = 1;
    }
}
exports.ScrollSyncSwapProvider = ScrollSyncSwapProvider;
//# sourceMappingURL=scroll-sync-swap-provider.js.map