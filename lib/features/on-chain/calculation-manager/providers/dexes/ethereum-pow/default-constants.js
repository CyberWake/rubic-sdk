"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultEthereumPowProviderConfiguration = void 0;
const wrapped_native_tokens_1 = require("../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const defaultEthereumPowRoutingProvidersAddresses = [
    wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM_POW].address,
    '0xdac17f958d2ee523a2206206994597c13d831ec7',
    '0x6b175474e89094c44da98b954eedeac495271d0f',
    '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' // USDC
];
const defaultEthereumPowWethAddress = wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.ETHEREUM_POW].address;
exports.defaultEthereumPowProviderConfiguration = {
    maxTransitTokens: 1,
    routingProvidersAddresses: defaultEthereumPowRoutingProvidersAddresses,
    wethAddress: defaultEthereumPowWethAddress
};
//# sourceMappingURL=default-constants.js.map