"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultDFKProviderConfiguration = void 0;
const wrapped_native_tokens_1 = require("../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const defaultDFKRoutingProvidersAddresses = [
    wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.DFK].address // WJEWEL
];
const defaultDFKWethAddress = wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.DFK].address;
exports.defaultDFKProviderConfiguration = {
    maxTransitTokens: 2,
    routingProvidersAddresses: defaultDFKRoutingProvidersAddresses,
    wethAddress: defaultDFKWethAddress
};
//# sourceMappingURL=default-constants.js.map