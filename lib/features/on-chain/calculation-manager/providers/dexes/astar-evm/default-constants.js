"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultAstarEvmProviderConfiguration = void 0;
const wrapped_native_tokens_1 = require("../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const defaultAstarEvmRoutingProvidersAddresses = [
    wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.ASTAR_EVM].address,
    '0xefaeee334f0fd1712f9a8cc375f427d9cdd40d73',
    '0x3795c36e7d12a8c252a20c5a7b455f7c57b60283',
    '0xffffffff000000000000000000000001000007c0',
    '0xfa9343c3897324496a05fc75abed6bac29f8a40f',
    '0x6a2d262d56735dba19dd70682b39f6be9a931d98',
    '0x6de33698e9e9b787e09d3bd7771ef63557e148bb',
    '0x4bf769b05e832fcdc9053fffbc78ca889acb5e1e' // BUSD
];
const defaultAstarEvmWethAddress = wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.ASTAR_EVM].address;
exports.defaultAstarEvmProviderConfiguration = {
    maxTransitTokens: 2,
    routingProvidersAddresses: defaultAstarEvmRoutingProvidersAddresses,
    wethAddress: defaultAstarEvmWethAddress
};
//# sourceMappingURL=default-constants.js.map