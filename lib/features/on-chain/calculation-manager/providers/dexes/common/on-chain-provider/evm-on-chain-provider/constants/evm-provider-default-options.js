"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evmProviderDefaultOptions = void 0;
const evm_web3_pure_1 = require("../../../../../../../../../core/blockchain/web3-pure/typed-web3-pure/evm-web3-pure/evm-web3-pure");
const provider_default_options_1 = require("../../constants/provider-default-options");
exports.evmProviderDefaultOptions = {
    ...provider_default_options_1.providerDefaultOptions,
    gasCalculation: 'calculate',
    providerAddress: evm_web3_pure_1.EvmWeb3Pure.EMPTY_ADDRESS
};
//# sourceMappingURL=evm-provider-default-options.js.map