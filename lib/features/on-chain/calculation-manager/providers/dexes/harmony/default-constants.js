"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultHarmonyProviderConfiguration = void 0;
const wrapped_native_tokens_1 = require("../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const defaultHarmonyRoutingProvidersAddresses = [
    wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.HARMONY].address,
    '0xef977d2f931c1978db5f6747666fa1eacb0d0339',
    '0x985458e523db3d53125813ed68c274899e9dfab4',
    '0x3c2b8be99c50593081eaa2a724f0b8285f5aba8f',
    '0x3095c7557bcb296ccc6e363de01b760ba031f2d9',
    '0x0dc78c79b4eb080ead5c1d16559225a46b580694',
    '0xea589e93ff18b1a1f1e9bac7ef3e86ab62addc79' // VIPER
];
const defaultHarmonyWethAddress = wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.HARMONY].address;
exports.defaultHarmonyProviderConfiguration = {
    maxTransitTokens: 2,
    routingProvidersAddresses: defaultHarmonyRoutingProvidersAddresses,
    wethAddress: defaultHarmonyWethAddress
};
//# sourceMappingURL=default-constants.js.map