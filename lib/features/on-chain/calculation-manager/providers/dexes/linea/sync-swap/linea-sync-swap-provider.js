"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineaSyncSwapProvider = void 0;
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const sync_swap_abstract_provider_1 = require("../../common/sync-swap-abstract/sync-swap-abstract-provider");
class LineaSyncSwapProvider extends sync_swap_abstract_provider_1.SyncSwapAbstractProvider {
    constructor() {
        super(...arguments);
        this.blockchain = blockchain_name_1.BLOCKCHAIN_NAME.LINEA;
        this.dexContractAddress = '0x80e38291e06339d10AAB483C65695D004dBD5C69';
        this.routerHelperContract = '0x91e3D3E51dC93B80a2FFBfdCa29EbF33e132D4E6';
        this.vault = '0x7160570BB153Edd0Ea1775EC2b2Ac9b65F1aB61B';
        this.factories = [
            '0x37BAc764494c8db4e54BDE72f6965beA9fa0AC2d',
            '0xE4CF807E351b56720B17A59094179e7Ed9dD3727'
        ];
        this.routeTokens = [
            '0xe5d7c2a44ffddf6b295a15c148167daaaf5cf34f',
            '0x176211869cA2b568f2A7D4EE941E073a821EE1ff',
            '0x7d43aabc515c356145049227cee54b608342c0ad',
            '0xf5c6825015280cdfd0b56903f9f8b5a2233476f5',
            '0x3aab2285ddcddad8edf438c1bab47e1a9d05a9b4',
            '0x5471ea8f739dd37e9b81be9c5c77754d8aa953e4',
            '0x265b25e22bcd7f10a5bd6e6410f10537cc7567e8' // ceMATIC
        ];
        this.masterAddress = '0x608Cb7C3168427091F5994A45Baf12083964B4A3';
        this.maxTransitTokens = 1;
    }
}
exports.LineaSyncSwapProvider = LineaSyncSwapProvider;
//# sourceMappingURL=linea-sync-swap-provider.js.map