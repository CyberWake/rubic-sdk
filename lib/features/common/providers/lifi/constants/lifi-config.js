"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLifiConfig = void 0;
const object_1 = require("../../../../../common/utils/object");
const blockchain_id_1 = require("../../../../../core/blockchain/utils/blockchains-info/constants/blockchain-id");
const injector_1 = require("../../../../../core/injector/injector");
const lifi_cross_chain_supported_blockchain_1 = require("../../../../cross-chain/calculation-manager/providers/lifi-provider/constants/lifi-cross-chain-supported-blockchain");
function getLifiConfig() {
    const rpcs = Object.fromEntries(lifi_cross_chain_supported_blockchain_1.lifiCrossChainSupportedBlockchains
        .map(blockchain => {
        const rpcListProvider = injector_1.Injector.web3PublicService.rpcProvider[blockchain];
        if (!rpcListProvider) {
            return null;
        }
        return [blockchain_id_1.blockchainId[blockchain], rpcListProvider.rpcList];
    })
        .filter(object_1.notNull));
    return {
        rpcs,
        integrator: 'rubic'
    };
}
exports.getLifiConfig = getLifiConfig;
//# sourceMappingURL=lifi-config.js.map