"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultBaseProviderConfiguration = void 0;
const wrapped_native_tokens_1 = require("../../../../../../common/tokens/constants/wrapped-native-tokens");
const blockchain_name_1 = require("../../../../../../core/blockchain/models/blockchain-name");
const defaultBaseRoutingProvidersAddresses = [
    wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.BASE].address,
    '0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22',
    '0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA',
    '0xB79DD08EA68A908A97220C76d19A6aA9cBDE4376',
    '0xEB466342C4d449BC9f53A865D5Cb90586f405215',
    '0x78a087d713Be963Bf307b18F2Ff8122EF9A63ae9',
    '0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb' // DAI
];
const defaultBaseWethAddress = wrapped_native_tokens_1.wrappedNativeTokensList[blockchain_name_1.BLOCKCHAIN_NAME.BASE].address;
exports.defaultBaseProviderConfiguration = {
    maxTransitTokens: 2,
    routingProvidersAddresses: defaultBaseRoutingProvidersAddresses,
    wethAddress: defaultBaseWethAddress
};
//# sourceMappingURL=default-constants.js.map