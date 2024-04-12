"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultOasisProviderConfiguration = void 0;
const wrapped_native_tokens_1 = require("../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const defaultOasisRoutingProvidersAddresses = [
    wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.OASIS].address,
    '0x94fbfFe5698DB6f54d6Ca524DbE673a7729014Be',
    '0x6Cb9750a92643382e020eA9a170AbB83Df05F30B',
    '0x2bF9b864cdc97b08B6D79ad4663e71B8aB65c45c',
    '0xdC19A122e268128B5eE20366299fc7b5b199C8e3',
    '0xf02b3e437304892105992512539F769423a515Cb' // YUZU
];
const defaultOasisWethAddress = wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.OASIS].address;
exports.defaultOasisProviderConfiguration = {
    maxTransitTokens: 2,
    routingProvidersAddresses: defaultOasisRoutingProvidersAddresses,
    wethAddress: defaultOasisWethAddress
};
//# sourceMappingURL=default-constants.js.map