"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SPOOKY_SWAP_PROVIDER_CONFIGURATION = exports.SPOOKY_SWAP_CONTRACT_ADDRESS = void 0;
const wrapped_native_tokens_1 = require("../../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../../core/blockchain/models/blockchain-name");
const default_constants_1 = require("../default-constants");
exports.SPOOKY_SWAP_CONTRACT_ADDRESS = '0xF491e7B69E4244ad4002BC14e878a34207E38c29';
const routingProvidersAddresses = [
    wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.FANTOM].address,
    '0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e',
    '0x04068da6c83afcfa0e13ba15a6696662335d5b75',
    '0x049d68029688eAbF473097a2fC38ef61633A3C7A',
    '0x321162Cd933E2Be498Cd2267a90534A804051b11',
    '0x74b23882a30290451a17c44f4f05243b6b58c76d',
    '0x841fad6eae12c286d1fd18d1d525dffa75c7effe' // BOO
];
exports.SPOOKY_SWAP_PROVIDER_CONFIGURATION = {
    ...default_constants_1.defaultFantomProviderConfiguration,
    routingProvidersAddresses
};
//# sourceMappingURL=constants.js.map