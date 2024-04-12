"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultArtheraProviderConfiguration = void 0;
const wrapped_native_tokens_1 = require("../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const defaultArtheraRoutingProvidersAddresses = [
    wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.ARTHERA].address,
    '0xEC250E6856e14A494cb1f0abC61d72348c79F418',
    '0x83D4a9Ea77a4dbA073cD90b30410Ac9F95F93E7C' // USDC
];
const defaultArtheraWethAddress = wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.ARTHERA].address;
exports.defaultArtheraProviderConfiguration = {
    maxTransitTokens: 3,
    routingProvidersAddresses: defaultArtheraRoutingProvidersAddresses,
    wethAddress: defaultArtheraWethAddress
};
//# sourceMappingURL=default-constants.js.map