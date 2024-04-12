"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kavaProviderConfiguration = exports.defaultKavaProviderConfiguration = void 0;
const wrapped_native_tokens_1 = require("../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const defaultKavaRoutingProvidersAddresses = [
    wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.KAVA].address,
    '0x765277eebeca2e31912c9946eae1021199b39c61',
    '0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D',
    '0xab4e4bbb6d207b341cb5edbfa497d17ff5afa4d4',
    '0xfa9343c3897324496a05fc75abed6bac29f8a40f',
    '0xb44a9b6905af7c801311e8f4e76932ee959c663c',
    '0x818ec0a7fe18ff94269904fced6ae3dae6d6dc0b' // WBTC
];
const defaultKavaWethAddress = wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.KAVA].address;
exports.defaultKavaProviderConfiguration = {
    maxTransitTokens: 3,
    routingProvidersAddresses: defaultKavaRoutingProvidersAddresses,
    wethAddress: defaultKavaWethAddress
};
exports.kavaProviderConfiguration = {
    ...exports.defaultKavaProviderConfiguration,
    routingProvidersAddresses: [
        ...defaultKavaRoutingProvidersAddresses,
        '0xeEeEEb57642040bE42185f49C52F7E9B38f8eeeE',
        '0x0f428d528b4f00c82a8ad032580d605cf5f122ee' // TIDE
    ]
};
//# sourceMappingURL=default-constants.js.map