"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrossChainProvider = void 0;
const errors_1 = require("../../../../../common/utils/errors");
const injector_1 = require("../../../../../core/injector/injector");
class CrossChainProvider {
    static parseError(err) {
        return (0, errors_1.parseError)(err, 'Cannot calculate cross-chain trade');
    }
    get httpClient() {
        return injector_1.Injector.httpClient;
    }
    areSupportedBlockchains(fromBlockchain, toBlockchain) {
        return (this.isSupportedBlockchain(fromBlockchain) && this.isSupportedBlockchain(toBlockchain));
    }
    getFromWeb3Public(fromBlockchain) {
        return injector_1.Injector.web3PublicService.getWeb3Public(fromBlockchain);
    }
    getWalletAddress(blockchain) {
        return injector_1.Injector.web3PrivateService.getWeb3PrivateByBlockchain(blockchain).address;
    }
    /**
     * Gets fee information.
     * @param _fromBlockchain Source network blockchain.
     * @param _providerAddress Integrator address.
     * @param _percentFeeToken Protocol fee token.
     * @param _useProxy Use rubic proxy or not.
     * @param _contractAbi Rubic Proxy contract abi.
     * @protected
     * @internal
     */
    async getFeeInfo(_fromBlockchain, _providerAddress, _percentFeeToken, _useProxy, _contractAbi) {
        return {};
    }
}
exports.CrossChainProvider = CrossChainProvider;
//# sourceMappingURL=cross-chain-provider.js.map