"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultArbitrumProviderConfiguration = void 0;
const wrapped_native_tokens_1 = require("../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const defaultArbitrumRoutingProvidersAddresses = [
    wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM].address,
    '0xfea7a6a0b346362bf88a9e4a88416b77a57d6c2a',
    '0x6c2c06790b3e3e3c38e12ee22f8183b37a13ee55',
    '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
    '0x32eb7902d4134bf98a28b963d26de779af92a212',
    '0x539bde0d7dbd336b79148aa742883198bbf60342' // MAGIC
];
const defaultArbitrumWethAddress = wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.ARBITRUM].address;
exports.defaultArbitrumProviderConfiguration = {
    maxTransitTokens: 1,
    routingProvidersAddresses: defaultArbitrumRoutingProvidersAddresses,
    wethAddress: defaultArbitrumWethAddress
};
//# sourceMappingURL=default-constants.js.map