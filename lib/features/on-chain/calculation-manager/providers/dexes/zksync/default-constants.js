"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultZkSyncProviderConfiguration = void 0;
const wrapped_native_tokens_1 = require("../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const defaultZkSyncRoutingProvidersAddresses = [
    wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.ZK_SYNC].address,
    '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4',
    '0x0e97c7a0f8b2c9885c8ac9fc6136e829cbc21d42' // MUTE
];
const defaultZkSyncWethAddress = wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.ZK_SYNC].address;
exports.defaultZkSyncProviderConfiguration = {
    maxTransitTokens: 1,
    routingProvidersAddresses: defaultZkSyncRoutingProvidersAddresses,
    wethAddress: defaultZkSyncWethAddress
};
//# sourceMappingURL=default-constants.js.map