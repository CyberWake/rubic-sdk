"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tronProviderDefaultOptions = void 0;
const tron_web3_pure_1 = require("../../../../../../../../../core/blockchain/web3-pure/typed-web3-pure/tron-web3-pure/tron-web3-pure");
const provider_default_options_1 = require("../../constants/provider-default-options");
exports.tronProviderDefaultOptions = {
    ...provider_default_options_1.providerDefaultOptions,
    gasCalculation: 'disabled',
    providerAddress: tron_web3_pure_1.TronWeb3Pure.EMPTY_ADDRESS
};
//# sourceMappingURL=tron-provider-default-options.js.map