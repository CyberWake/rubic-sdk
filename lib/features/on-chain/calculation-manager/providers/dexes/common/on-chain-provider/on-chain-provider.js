"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnChainProvider = void 0;
const errors_1 = require("../../../../../../../common/utils/errors");
const injector_1 = require("../../../../../../../core/injector/injector");
/**
 * Abstract class for all on-chain trade providers.
 */
class OnChainProvider {
    constructor() {
        this.supportReceiverAddress = true;
    }
    static parseError(err) {
        return (0, errors_1.parseError)(err, 'Cannot calculate on-chain trade');
    }
    get web3Public() {
        return injector_1.Injector.web3PublicService.getWeb3Public(this.blockchain);
    }
    get httpClient() {
        return injector_1.Injector.httpClient;
    }
}
exports.OnChainProvider = OnChainProvider;
//# sourceMappingURL=on-chain-provider.js.map