"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultGoerliProviderConfiguration = void 0;
const wrapped_native_tokens_1 = require("../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const wethAddress = wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.GOERLI].address;
const defaultGoerliRoutingProvidersAddresses = [
    wethAddress,
    '0xCbE56b00d173A26a5978cE90Db2E33622fD95A28',
    '0xf4B2cbc3bA04c478F0dC824f4806aC39982Dce73',
    '0xb93cba7013f4557cdfb590fd152d24ef4063485f',
    '0xcc7bb2d219a0fc08033e130629c2b854b7ba9195' // ZETA
];
exports.defaultGoerliProviderConfiguration = {
    maxTransitTokens: 1,
    routingProvidersAddresses: defaultGoerliRoutingProvidersAddresses,
    wethAddress
};
//# sourceMappingURL=default-constants.js.map