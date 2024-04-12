"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregatorOnChainProvider = void 0;
const blockchains_info_1 = require("../../../../../../core/blockchain/utils/blockchains-info/blockchains-info");
const injector_1 = require("../../../../../../core/injector/injector");
const get_from_without_fee_1 = require("../../../../../common/utils/get-from-without-fee");
const on_chain_proxy_service_1 = require("../on-chain-proxy-service/on-chain-proxy-service");
class AggregatorOnChainProvider {
    constructor() {
        this.onChainProxyService = new on_chain_proxy_service_1.OnChainProxyService();
    }
    getWalletAddress(blockchain) {
        return injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(blockchain).address;
    }
    async handleProxyContract(from, fullOptions) {
        let fromWithoutFee;
        let proxyFeeInfo;
        if (fullOptions.useProxy && blockchains_info_1.BlockchainsInfo.isEvmBlockchainName(from.blockchain)) {
            proxyFeeInfo = await this.onChainProxyService.getFeeInfo(from, fullOptions.providerAddress);
            fromWithoutFee = (0, get_from_without_fee_1.getFromWithoutFee)(from, proxyFeeInfo.platformFee.percent);
        }
        else {
            fromWithoutFee = from;
        }
        return {
            fromWithoutFee,
            proxyFeeInfo
        };
    }
    getRoutePath(from, to) {
        return [from, to];
    }
}
exports.AggregatorOnChainProvider = AggregatorOnChainProvider;
//# sourceMappingURL=aggregator-on-chain-provider-abstract.js.map