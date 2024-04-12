"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultVelasProviderConfiguration = void 0;
const wrapped_native_tokens_1 = require("../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const defaultVelasRoutingProvidersAddresses = [
    wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.VELAS].address,
    '0x40c8002c2887ade2297ad48d9dc101de08bd104c',
    '0xdf44aed1684b9cfd0fbe07c43a3bbcd20cde0145',
    '0x3611fbfb06ffbcef9afb210f6ace86742e6c14a4',
    '0x72eb7ca07399ec402c5b7aa6a65752b6a1dc0c27' // ASTRO (AstroSwap)
];
const defaultVelasWethAddress = wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.VELAS].address;
exports.defaultVelasProviderConfiguration = {
    maxTransitTokens: 2,
    routingProvidersAddresses: defaultVelasRoutingProvidersAddresses,
    wethAddress: defaultVelasWethAddress
};
//# sourceMappingURL=default-constants.js.map