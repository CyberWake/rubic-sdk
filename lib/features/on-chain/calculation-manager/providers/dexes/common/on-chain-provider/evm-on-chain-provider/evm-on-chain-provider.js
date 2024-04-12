"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvmOnChainProvider = void 0;
const chain_type_1 = require("../../../../../../../../core/blockchain/models/chain-type");
const injector_1 = require("../../../../../../../../core/injector/injector");
const get_from_without_fee_1 = require("../../../../../../../common/utils/get-from-without-fee");
const on_chain_proxy_service_1 = require("../../../../common/on-chain-proxy-service/on-chain-proxy-service");
const get_gas_price_info_1 = require("../../../../common/utils/get-gas-price-info");
const on_chain_provider_1 = require("../on-chain-provider");
class EvmOnChainProvider extends on_chain_provider_1.OnChainProvider {
    constructor() {
        super(...arguments);
        this.onChainProxyService = new on_chain_proxy_service_1.OnChainProxyService();
    }
    get walletAddress() {
        return injector_1.Injector.web3PrivateService.getWeb3Private(chain_type_1.CHAIN_TYPE.EVM).address;
    }
    get web3Public() {
        return injector_1.Injector.web3PublicService.getWeb3Public(this.blockchain);
    }
    async handleProxyContract(from, fullOptions) {
        let fromWithoutFee;
        let proxyFeeInfo;
        if (fullOptions.useProxy) {
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
    async getGasPriceInfo() {
        return (0, get_gas_price_info_1.getGasPriceInfo)(this.blockchain);
    }
}
exports.EvmOnChainProvider = EvmOnChainProvider;
//# sourceMappingURL=evm-on-chain-provider.js.map