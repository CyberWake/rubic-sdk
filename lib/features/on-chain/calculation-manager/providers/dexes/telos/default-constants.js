"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultTelosProviderConfiguration = void 0;
const wrapped_native_tokens_1 = require("../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const defaultTelosRoutingProvidersAddresses = [
    wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.TELOS].address,
    '0xeFAeeE334F0Fd1712f9a8cc375f427D9Cdd40d73',
    '0x818ec0A7Fe18Ff94269904fCED6AE3DaE6d6dC0b',
    '0xf390830DF829cf22c53c8840554B98eafC5dCBc2',
    '0xfA9343C3897324496A05fC75abeD6bAC29f8A40f' // ETH
];
const defaultTelosWethAddress = wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.TELOS].address;
exports.defaultTelosProviderConfiguration = {
    maxTransitTokens: 1,
    routingProvidersAddresses: defaultTelosRoutingProvidersAddresses,
    wethAddress: defaultTelosWethAddress
};
//# sourceMappingURL=default-constants.js.map