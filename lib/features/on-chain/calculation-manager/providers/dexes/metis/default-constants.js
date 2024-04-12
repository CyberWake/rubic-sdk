"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultMetisProviderConfiguration = void 0;
const wrapped_native_tokens_1 = require("../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const defaultMetisRoutingProvidersAddresses = [
    wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.METIS].address,
    '0xea32a96608495e54156ae48931a7c20f0dcc1a21',
    '0xbb06dca3ae6887fabf931640f67cab3e3a16f4dc',
    '0x721532bc0da5ffaeb0a6a45fb24271e8098629a7',
    '0x420000000000000000000000000000000000000a',
    '0x90fe084f877c65e1b577c7b2ea64b8d8dd1ab278',
    '0x2bf9b864cdc97b08b6d79ad4663e71b8ab65c45c' // BUSD
];
const defaultMetisWethAddress = wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.METIS].address;
exports.defaultMetisProviderConfiguration = {
    maxTransitTokens: 2,
    routingProvidersAddresses: defaultMetisRoutingProvidersAddresses,
    wethAddress: defaultMetisWethAddress
};
//# sourceMappingURL=default-constants.js.map